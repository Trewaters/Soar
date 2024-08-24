'use client'
import { FlowSeriesData } from '@app/context/AsanaSeriesContext'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'

// export const getServerSideProps: GetServerSideProps = async () => {
//   const baseUrl =
//     process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
//   const url = new URL('/api/series/', baseUrl)
//   const res = await fetch(url.toString())
//   const data = await res.json()
//   const seriesData = Array.isArray(data) ? data : [data]

//   return {
//     props: {
//       initialSeries: JSON.parse(JSON.stringify(seriesData)),
//     },
//   }
// }

export default function Page() {
  const [series, setSeries] = useState<FlowSeriesData[]>([])
  const [flow, setFlow] = useState<FlowSeriesData>()

  useEffect(() => {
    async function fetchData() {
      // const baseUrl =
      //   process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      // const url = new URL('/api/series/', baseUrl)
      // const response = await fetch(url)
      const response = await fetch('/api/series')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      // const data = await response.json()
      // const seriesData = Array.isArray(data) ? data : [data]
      // setSeries(JSON.parse(JSON.stringify(seriesData)))
      // console.log(seriesData)
      setSeries(await response.json())
    }

    fetchData()
  }, [])

  function handleSelect(event: ChangeEvent<{}>, value: FlowSeriesData | null) {
    // Logs the type of event (e.g., 'click')
    // console.log('Event type:', event.type)
    // Logs the element that triggered the event
    // console.log('Event target:', event.target)
    // console.log('Selected value:', value)
    event.preventDefault()
    if (value) {
      setFlow(value)
    }
  }

  return (
    <Stack
      spacing={2}
      sx={{ marginX: 3, marginY: 3, background: 'white', mb: '1em' }}
    >
      <Typography variant="h2" textAlign="center">
        Practice Yoga Series
      </Typography>
      <Stack direction={'column'} justifyContent={'space-between'}>
        <Button
          variant="outlined"
          href="/flowSeries"
          // component="a"
          LinkComponent="a"
          sx={{ my: 3 }}
        >
          Back to flow
        </Button>
        <Autocomplete
          disablePortal
          id="combo-box-series-search"
          options={series}
          getOptionLabel={(option: FlowSeriesData) => option.seriesName}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.seriesName}
            </li>
          )}
          sx={{ width: '50%' }}
          renderInput={(params) => (
            <TextField {...params} label="Flow Series" />
          )}
          onChange={handleSelect}
        />
      </Stack>
      {flow && (
        <Box width="100%" textAlign="center" marginTop={4} key={flow.id}>
          <Typography variant="h3" sx={{ marginTop: 3 }}>
            {flow.seriesName}
          </Typography>
          <Stack rowGap={3} alignItems="center" marginTop={4}>
            {flow.seriesPostures.map((pose) => (
              <Card
                key={pose}
                sx={{
                  width: '100%',
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'row',
                  borderColor: 'primary.light',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src="/stick-tree-pose-400x400.png"
                    alt="Yoga Posture Image"
                    width={100}
                    height={100}
                    priority={true}
                  />
                </CardMedia>
                <CardContent sx={{ flex: '1 1 auto' }}>
                  <Typography textAlign={'left'} variant="body1">
                    {pose}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <Typography variant="h3" sx={{ marginTop: 3 }}>
              Description
            </Typography>
            <Typography variant="body1">{flow.description}</Typography>
          </Stack>
        </Box>
      )}
    </Stack>
  )
}
