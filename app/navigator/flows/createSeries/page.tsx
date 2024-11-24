'use client'
import React from 'react'
import { useFlowSeries } from '@context/AsanaSeriesContext'
import { FEATURES } from '@app/FEATURES'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { LooksOne } from '@mui/icons-material'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import Looks5Icon from '@mui/icons-material/Looks5'
import { useRouter } from 'next/navigation'
import { FullAsanaData } from '@context/AsanaPostureContext'
import SubNavHeader from '@app/clientComponents/sub-nav-header'
import SplashHeader from '@app/clientComponents/splash-header'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AutocompleteComponent from '@app/clientComponents/autocomplete-search'
import Image from 'next/image'
import NavBottom from '@serverComponents/navBottom'

export default function Page() {
  const { data: session } = useSession()
  const { state, dispatch } = useFlowSeries()
  const { seriesName, seriesPostures, breath, description, duration, image } =
    state.flowSeries
  const [postures, setPostures] = useState<FullAsanaData[]>([])
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [isDirtyDescription, setIsDirtyDescription] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  useEffect(() => {
    async function fetchData() {
      // const baseUrl =
      //   process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      // const url = new URL('/api/series/', baseUrl)
      // const res = await fetch(url.toString())
      // const data = await res.json()
      // const seriesData = Array.isArray(data) ? data : [data]
      // setSeries(JSON.parse(JSON.stringify(seriesData)))
      try {
        const response = await fetch('/api/poses', { cache: 'no-store' })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        setPostures(await response.json())
      } catch (error: Error | any) {
        error.message
      }
    }
    console.log('create series session', session)

    if (
      session === null
      // ||
      // (session &&
      //   session.status === 'resolved_model' &&
      //   session.value === 'null')
    ) {
      router.push('/navigator/flows')
    }

    fetchData()
  }, [router, session])

  function handleSelect(
    event: React.SyntheticEvent<Element, Event>,
    value: FullAsanaData | null
  ) {
    event.preventDefault()
    if (value) {
      const simplifiedName =
        Array.isArray(value.sanskrit_names) &&
        value.sanskrit_names[0]?.simplified
          ? value.sanskrit_names[0].simplified
          : ''
      dispatch({
        type: 'SET_FLOW_SERIES',
        payload: {
          ...state.flowSeries,
          seriesPostures: [
            ...state.flowSeries.seriesPostures,
            value.sort_english_name + '; ' + simplifiedName,
          ],
        },
      })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const updatedSeries = {
      ...state.flowSeries,
      seriesName,
      seriesPostures,
      breath,
      description,
      duration,
      image,
    }
    dispatch({ type: 'SET_FLOW_SERIES', payload: updatedSeries })

    try {
      const response = await fetch('/api/series/createSeries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cache: 'no-store',
        },
        body: JSON.stringify(updatedSeries),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      // eslint-disable-next-line no-unused-vars
      const data = await response.json()
    } catch (error: Error | any) {
      error.message
    }
    // router.push('/navigator/flows')
    handleCancel()
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    dispatch({
      type: 'SET_FLOW_SERIES',
      payload: {
        ...state.flowSeries,
        [name]: value,
      },
    })
    switch (name) {
      case 'seriesName':
        setIsDirty(value.length > 0)

        break
      case 'description':
        setIsDirtyDescription(event.target.value.length > 0)

        break
      default:
        break
    }
  }

  function handleCancel() {
    dispatch({
      type: 'SET_FLOW_SERIES',
      payload: {
        ...state.flowSeries,
        seriesName: '',
        seriesPostures: [],
        breath: '',
        description: '',
        duration: '',
        image: '',
      },
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        mb: 4,
      }}
    >
      <Stack
        spacing={2}
        sx={{ marginX: 3, marginY: 3, mb: '1em', width: 'fit-content' }}
      >
        <SplashHeader
          src={'/icons/designImages/header-create-series.png'}
          alt={'Create Series'}
          title="Create Series"
        />
        <SubNavHeader
          title="Flows"
          link="/navigator/flows"
          onClick={toggleDrawer(!open)}
        />
        {FEATURES.SHOW_CREATE_SERIES && (
          <Box sx={{ px: 2 }}>
            <FormControl sx={{ width: '100%', mb: 3 }}>
              <AutocompleteComponent
                options={postures.sort((a, b) =>
                  a.sort_english_name.localeCompare(b.sort_english_name)
                )}
                getOptionLabel={(option) =>
                  (option as FullAsanaData).sort_english_name
                }
                renderOption={(props, option) => {
                  const postureOption = option as FullAsanaData
                  return (
                    <li {...props} key={postureOption.id}>
                      {postureOption.sort_english_name}
                    </li>
                  )
                }}
                placeholder="Add a pose to your series"
                onChange={(event, value) =>
                  handleSelect(event, value as FullAsanaData | null)
                }
                renderInput={() => <TextField placeholder="Search..." />}
              />
            </FormControl>
            <Box className="journal">
              <FormGroup>
                <FormControl>
                  <Grid
                    item
                    xs={12}
                    className="journalTitle"
                    display={'flex'}
                    direction={'row'}
                  >
                    <TextField
                      sx={{
                        '& .MuiInputBase-input': { color: 'primary.main' },
                        width: '100%',
                      }}
                      variant="standard"
                      id="series-name"
                      placeholder="Give your Series a name..."
                      name="seriesName"
                      value={seriesName}
                      onChange={handleChange}
                      InputProps={{
                        style: { color: 'primary.main' },
                      }}
                    />
                    <>
                      <Checkbox
                        checked={isDirty}
                        sx={{
                          color: 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    </>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isDirty}
                          sx={{
                            color: 'primary.main',
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                          }}
                        />
                      }
                      label="Text field is dirty"
                    />
                  </Grid> */}
                </FormControl>

                <FormControl>
                  <Stack
                    className="lines"
                    spacing={1}
                    // display={'flex'}
                    // flexDirection={'column'}
                    // flexWrap={'wrap'}
                    // alignItems={'center'}
                    // justifyContent={'space-between'}
                    sx={{
                      mx: 4,
                      mb: 2,
                      pl: 2,
                    }}
                  >
                    {seriesPostures.map((word, index) => (
                      <Stack
                        className="journalLine"
                        key={`${word}+${index}`}
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <Stack>
                          <IconButton
                            disableRipple
                            sx={{ color: 'error.light' }}
                            onClick={() =>
                              dispatch({
                                type: 'SET_FLOW_SERIES',
                                payload: {
                                  ...state.flowSeries,
                                  seriesPostures:
                                    state.flowSeries.seriesPostures.filter(
                                      (item) => item !== word
                                    ),
                                },
                              })
                            }
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Stack>
                        <Stack>
                          {word.split(';').map((splitWord, idx) => (
                            <Typography
                              key={`${word}-${idx}`}
                              variant={idx === 1 ? 'body2' : 'body1'}
                              sx={{
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                ...(idx === 1 && {
                                  fontWeight: 'bold',
                                  fontStyle: 'italic',
                                }), // Add emphasis styles here
                              }}
                            >
                              {splitWord}
                            </Typography>
                          ))}
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 3 }}
                  >
                    {/* 
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          dispatch({
                            type: 'SET_FLOW_SERIES',
                            payload: {
                              ...state.flowSeries,
                              seriesPostures:
                                state.flowSeries.seriesPostures.slice(0, -1),
                            },
                          })
                        }
                      >
                        <Typography>Remove One (-1)</Typography>
                      </Button>
 */}
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        dispatch({
                          type: 'SET_FLOW_SERIES',
                          payload: {
                            ...state.flowSeries,
                            seriesPostures: [],
                          },
                        })
                      }
                    >
                      Clear
                    </Button> */}
                  </Stack>
                </FormControl>
                <Grid item xs={12} sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={session === null}
                      sx={{ borderRadius: '12px' }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{
                        color: 'primary.contrastText',
                        borderRadius: '12px',
                      }}
                      onClick={handleCancel}
                    >
                      Start Over
                    </Button>
                  </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2, mx: 2 }}>
                  <FormControl
                    sx={{
                      width: '100%',
                      border: '1px solid black',
                      borderRadius: '12px',
                      p: 2,
                    }}
                  >
                    <Stack gap={2} flexDirection={'row'} alignItems={'center'}>
                      <Typography color={'primary.main'} variant="h3">
                        Description
                      </Typography>
                      <Image
                        src={'/icons/designImages/leaf-2.svg'}
                        alt={'leaf icon'}
                        height={21}
                        width={21}
                      ></Image>
                    </Stack>
                    <TextField
                      id="outlined-basic"
                      // label="Description"
                      placeholder="Type a description..."
                      multiline
                      minRows={4}
                      variant="standard"
                      name="description"
                      value={description}
                      onChange={handleChange}
                      sx={{
                        '& .MuiInputBase-input': { color: 'primary.main' },
                        width: '100%',
                      }}
                      InputProps={{
                        endAdornment: (
                          <Checkbox
                            checked={isDirtyDescription}
                            onChange={handleChange}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              color: 'primary.main',
                              '&.Mui-checked': {
                                color: 'primary.main',
                              },
                            }}
                          />
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
              </FormGroup>
            </Box>
          </Box>
        )}
      </Stack>
      {/* information drawer */}
      <Drawer
        onClick={toggleDrawer(!open)}
        open={open}
        onClose={toggleDrawer(false)}
        anchor="bottom"
      >
        <Stack flexDirection={'column'}>
          <Typography variant="h2" textAlign="center">
            Create a Series
          </Typography>
          <List
            sx={{
              // width: 'auto',
              // maxWidth: 360,
              bgcolor: 'background.helper',
              alignSelf: 'center',
              borderRadius: 4,
              my: 3,
            }}
          >
            <ListSubheader
              sx={{ bgcolor: 'background.helper', textAlign: 'center' }}
              component="h3"
              id="nested-list-subheader"
            >
              Welcome to the series creation page
            </ListSubheader>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LooksOne />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="If you can't find a series you like, create your own!" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LooksTwoIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='"Series Name": Type a unique name for your series.' />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks3Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='"Flow Series": Add asana postures to
                  your series by selecting them from the "Flow Series"
                  dropdown below. Click the "X" to enter a new posture.'
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks4Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='"Description": Type a description of your series.' />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks5Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Click "Submit" when you are done.' />
            </ListItem>
          </List>
        </Stack>
      </Drawer>
      <Stack sx={{ position: 'fixed', bottom: 0 }}>
        <NavBottom subRoute="/navigator/flows" />
      </Stack>
    </Box>
  )
}
