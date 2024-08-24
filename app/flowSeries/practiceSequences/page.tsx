'use client'
import { SequenceData } from '@app/interfaces/sequence'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'

export default function Page() {
  // const sequence: SequenceData[] = [
  //   {
  //     id: 1,
  //     nameSequence: 'C1 Sequence',
  //     sequencesSeries: [
  //       {
  //         id: '1',
  //         seriesName: 'Integration Series',
  //         seriesPostures: [
  //           "Child's Pose Balasana",
  //           'Downward Facing Dog, Adho Mukha Svanasana',
  //           'Ragdoll, Uttanasana',
  //           'Stand at Attention, Samsthiti',
  //         ],
  //       },
  //       {
  //         id: '2',
  //         seriesName: 'Sun Salutation A Series',
  //         seriesPostures: [
  //           'Mountain Pose, Tadasana',
  //           'Standing Forward Fold, Uttanasana',
  //           'Halfway Lift Ardha, Uttanasana',
  //           'High to Low Plank, Chaturanga Dandasana',
  //           'Upward Facing Dog, Urdhva Mukha Svanasana',
  //           'Downward Facing Dog, Adho Mukha Svanasana',
  //         ],
  //       },
  //       {
  //         id: '3',
  //         seriesName: 'Sun Salutation B Series',
  //         seriesPostures: [
  //           'Chair Pose, Utkatasana',
  //           'Standing Forward Fold, Uttanasana',
  //           'Halfway Lift, Ardha Uttanasana',
  //           'High to Low Plank, Chaturanga Dandasana',
  //           'Upward Facing Dog, Urdhva Mukha Svanasana',
  //           'Downward Facing Dog, Adho Mukha Svanasana',
  //           'Warrior Two, Virabhadrasana II',
  //           'Extended Side Angle, Utthita Parsvakonasana',
  //           'Reverse Warrior, Parivrtta Virabhadrasana II',
  //           'High to Low Plank, Chaturanga Dandasana',
  //         ],
  //       },
  //       {
  //         id: '4',
  //         seriesName: 'Crescent Lunge Series',
  //         seriesPostures: [
  //           'Crescent Lunge, Anjanayesana',
  //           'Revolved Crescent Lunge, Parivrtta Anjanayesana',
  //           "Runner's Lunge, Anjaneyasana",
  //           'Side Plank, Vasisthasana',
  //           'Prayer Twist, Parivrtta Utkatasana',
  //           'Gorilla Pose, Padahastasana',
  //           'Crow Pose, Bakasana',
  //         ],
  //       },
  //       {
  //         id: '5',
  //         seriesName: 'Balancing Series',
  //         seriesPostures: [
  //           'Eagle Pose, Garudasana',
  //           "Dancer's Pose, Natarajasana",
  //           'Tree Pose, Vrksasana',
  //         ],
  //       },
  //       {
  //         id: '6',
  //         seriesName: 'Triangle Series',
  //         seriesPostures: [
  //           'Warrior One, Virabhadrasana I',
  //           'Warrior Two, Virabhadrasana II',
  //           'Triangle Pose, Trikonasana',
  //           'Wide Leg Forward Fold, Paschimottansana',
  //         ],
  //       },
  //       {
  //         id: '7',
  //         seriesName: 'Hip Series',
  //         seriesPostures: ['Half Pigeon Eka Pada Rajakapotasana'],
  //       },
  //       {
  //         id: '8',
  //         seriesName: 'Spine Series',
  //         seriesPostures: [
  //           'Cobra Pose, Bhujangasana',
  //           'Bow Pose, Dhanurasana',
  //           'Camel Pose, Ustrasana',
  //           'Bridge Pose, Setu Bandha Sarvangasana',
  //           'Reclined Bound Angle Pose, Supta Baddha Konasana',
  //         ],
  //       },
  //       {
  //         id: '9',
  //         seriesName: 'Surrender Series',
  //         seriesPostures: [
  //           'Seated Forward Fold, Paschimittonasana',
  //           'Happy Baby, Ananda Balasana',
  //           'Supine Twist, Jathara Parivartanasana',
  //           'Corpse Pose, Savasana',
  //           'Easy Pose, Sukhasana',
  //         ],
  //       },
  //     ],
  //   },
  // ]
  const [sequences, setSequences] = React.useState<SequenceData[]>([])

  useEffect(() => {
    async function fetchData() {
      // const baseUrl =
      //   process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      // const url = new URL('/api/series/', baseUrl)
      // const response = await fetch(url)
      const response = await fetch('/api/sequences')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      setSequences(await response.json())
    }

    fetchData()
  }, [])

  return (
    <Paper
      sx={{
        borderColor: 'primary.main',
        borderWidth: '3px',
        borderStyle: 'solid',
        paddingTop: 4,
      }}
    >
      <Typography variant="h2" align="center">
        Practice Sequences
      </Typography>
      {sequences.map((flow) => (
        <React.Fragment key={flow.id}>
          <Box
            sx={{
              margin: 4,
            }}
          >
            <Typography variant="h3" textAlign="center">
              {flow.nameSequence}
            </Typography>
          </Box>
          <Stack rowGap={3} alignItems="center">
            {flow.sequencesSeries.map((seriesMini, i) => (
              <Card
                key={i}
                sx={{
                  width: '50%',
                  boxShadow: 3,
                  textAlign: 'center',
                  borderColor: 'primary.main',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                <CardHeader title={seriesMini.seriesName} />
                <CardContent>
                  {/* 
                  // ! add types to this
                   */}
                  {seriesMini.seriesPostures.map(
                    (asana: any, asanaIndex: any) => (
                      <Typography
                        key={asanaIndex}
                        textAlign={'left'}
                        variant="body1"
                      >
                        {asana}
                      </Typography>
                    )
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </React.Fragment>
      ))}
      {/* 
                  // breath icons
                  import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
                  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
                  import ContactlessIcon from '@mui/icons-material/Contactless';
                  import DeblurIcon from '@mui/icons-material/Deblur';
                  import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
                  import FastForwardIcon from '@mui/icons-material/FastForward';
                  import FastRewindIcon from '@mui/icons-material/FastRewind';
                  import FileUploadIcon from '@mui/icons-material/FileUpload';
                  import FileDownloadIcon from '@mui/icons-material/FileDownload';
                  import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
                  import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
                  import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
                  import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
                  import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
                  import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

                  // best so far
                  import LoginIcon from '@mui/icons-material/Login';
                  import LogoutIcon from '@mui/icons-material/Logout';
                  <LoginIcon />
                    <LogoutIcon />

                  // meditation icon
                  import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

                  */}
    </Paper>
  )
}
