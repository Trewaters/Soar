'use client'
import React from 'react'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { useSession } from 'next-auth/react'

// profile card
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export interface UserProfile {
  id: string
  provider_id: string
  name: string
  email: string
  emailVerified: Date
  image: string
  pronouns: string
  accounts: Record<string, any> | null
  sessions: Record<string, any> | null
  profile: Record<string, any>
  authenticator: Record<string, any> | null
  createdAt: Date
  updatedAt: Date
  practitionerProfile?: PractitionerProfile
}

export interface PractitionerProfile {
  id: string
  firstName: string
  bio: string
  headline: string
  location: string
  websiteURL: string
  lastName: string
  userId: string
  user: UserProfile
  // facebook: string
  // instagram: string
  // linkedin: string
  // twitter: string
  // youtube: string
  // pinterest: string
  // tiktok: string
  // createdAt: Date
  // updatedAt: Date
}

export default function UserDetails() {
  const { data: session } = useSession()
  const [expanded, setExpanded] = React.useState(false)
  const [userData, setUserData] = React.useState<UserProfile>({
    id: session?.user?.id ?? '',
    provider_id: '',
    name: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
    emailVerified: new Date(),
    image: session?.user?.image ?? '',
    pronouns: '',
    accounts: {} as JSON,
    sessions: {} as JSON,
    profile: {} as JSON,
    authenticator: {} as JSON,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const [practitionerProfile, setPractitionerProfile] =
    React.useState<PractitionerProfile>({
      headline: 'New Headline',
      bio: 'Updated bio',
      location: 'New Location',
      websiteURL: 'https://happyYoga.app',
      firstName: 'New First Name',
      lastName: 'New Last Name',
      id: session?.user?.id ?? '',
      userId: session?.user?.id ?? '',
      user: userData,
    })

  // profile card expand
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  // fetch user data based on session.user.email
  const fetchUserData = async () => {
    try {
      const userEmail = session?.user?.email
      if (!userEmail) return
      // console.log('Fetching user data for email:', userEmail)
      const response = await fetch(
        `/api/user/?email=${encodeURIComponent(userEmail)}`
      )
      // console.log('useEffect response', response)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch user data: ${errorText}`)
      }
      const user = await response.json()
      // console.log('fetchUserData', user.data)
      // console.log('fetchUserData user.data.profile', user.data.profile)

      // Parse the profile field
      const profile = JSON.parse(user.data.profile)
      const picture = profile.picture

      // Update userData with the extracted picture
      setUserData((prevUserData) => ({
        ...prevUserData,
        ...user.data,
        image: picture,
      }))
      return user
    } catch (error) {
      console.error('Error fetching user data', error)
    }
  }
  const fetchPractitionerData = async () => {
    try {
      const id = session?.user?.id
      if (!id) return
      // console.log('Fetching practitioner data for email:', id)
      const response = await fetch(`/api/user/fetchPractitioner/?id=${id}`)
      // console.log('useEffect response', response)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch practitioner data: ${errorText}`)
      }
      const practitioner = await response.json()
      // console.log('fetchUserData', practitioner.data)

      setPractitionerProfile((prevPractitionerProfile) => ({
        ...prevPractitionerProfile,
        ...practitioner.data.practitionerProfile,
      }))
      return practitioner
    } catch (error) {
      console.error('Error fetching practitioner data', error)
    }
  }

  // TODO create a fetch for practitioner data
  const updatePractitionerData = async (
    practitionerData: PractitionerProfile
  ) => {
    try {
      const response = await fetch('/api/user/updatePractitioner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          practitionerData,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to update practitioner data: ${errorText}`)
      }

      // const result = await response.json()
      // console.log('Practitioner data updated:', result)
    } catch (error) {
      console.error('Error updating practitioner data:', error)
    }
  }

  const updateUserData = async (userData: UserProfile) => {
    try {
      const postUserData = await fetch(`/api/user/updateUserData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pronouns: userData?.pronouns,
          email: session?.user?.email,
        }),
      })
      if (postUserData.ok) {
        // console.log('Data saved')
        // const savedUser = await fetchUserData()
        // setUserData(savedUser)
      } else {
        console.error('Error saving data')
        throw new Error('Error saving data')
      }
    } catch (error) {
      console.error('Error saving data', error)
      throw new Error('Error saving data')
    }
  }

  // fetch user data based on session.user.email
  React.useEffect(() => {
    if (!session) return
    // console.log('useEffect triggered with email', session)

    fetchUserData()
    fetchPractitionerData()
  }, [session])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setPractitionerProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateUserData(userData)
    await updatePractitionerData(practitionerProfile)
  }

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent={'center'}
      sx={{ p: 2 }}
      component={'form'}
      onSubmit={handleSubmit}
    >
      {!session && <div>Sign In</div>}
      {session && (
        <>
          <Button type="submit">Save</Button>
          <Grid xs={12} item>
            <Typography variant="h2">Practitioner Details</Typography>
          </Grid>
          <Grid xs={12} item>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="user initial">
                    {userData?.name?.charAt(0) ?? 'U'}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={userData?.name}
                subheader={`Member since ${userData?.createdAt ?? '6/9/2024'}`}
              />
              <CardMedia
                component="img"
                // image={userData?.image ?? '/stick-tree-pose-400x400.png'}
                image={userData?.image ?? '/stick-tree-pose-400x400.png'}
                alt="Profile Image"
                sx={{
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                  margin: 'auto',
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  [HEADLINE] Happy Yoga instructor and Happy Reiki Master.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" disabled>
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" disabled>
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Share Quickly:</Typography>
                  <Typography paragraph>Information about the user.</Typography>
                  <Typography paragraph>
                    [YOGA_STYLE], [YOGA_EXPERIENCE], [COMPANY]
                  </Typography>
                  <Typography paragraph>[LINKS_WEBSITE_URL]</Typography>
                  <Typography>[LOCATION]</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormControl>
              <TextField
                name="name"
                id="outlined-basic"
                placeholder='Enter "First Name"'
                label="Name"
                value={userData?.name}
                variant="outlined"
                disabled
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormControl>
              <TextField
                name="pronouns"
                id="pronouns"
                label="Pronouns:"
                variant="outlined"
                value={userData?.pronouns}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <FormControl fullWidth>
              <TextField
                id="outlined-email-input"
                name="email"
                placeholder="xyz@ABC.com"
                label="Email (primary/internal):"
                value={userData?.email}
                variant="outlined"
                type="email"
              />
            </FormControl>
          </Grid>
          {/* <Grid xs={12} sm={12} md={12} item>
            <FormControl fullWidth>
              <TextField
                id="outlined-textarea"
                name="headline"
                placeholder="Enter...2 sentences"
                label="Headline:"
                value={
                  practitionerProfile?.headline ?? 'I am a Yoga instructor.'
                }
                onChange={handleChange}
                multiline
                maxRows={2}
              />
            </FormControl>
          </Grid> */}
          {/* I am a happy Yoga instructor, happy Reiki Master, and creator of the Happy Yoga app. */}
        </>
      )}
    </Grid>
  )
}
