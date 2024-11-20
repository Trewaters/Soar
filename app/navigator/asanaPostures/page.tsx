'use client'
import { useEffect, useState } from 'react'
import PostureSearch from '@app/navigator/asanaPostures/posture-search'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { FullAsanaData } from '@context/AsanaPostureContext'
import SplashHeader from '@app/clientComponents/splash-header'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [posturePropData, setPosturePropData] = useState<FullAsanaData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('../api/poses')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      setPosturePropData(await response.json())
    } catch (error: Error | any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <SplashHeader
        src={
          '/icons/designImages/beautiful-woman-practices-yoga-asana-raja-bhujanga.png'
        }
        alt={'Asana Posture Search'}
        title="Asanas"
      />
      <Box
        sx={{
          alignSelf: 'center',
          my: 4,
        }}
      >
        <PostureSearch posturePropData={posturePropData} />
        {loading && (
          <CircularProgress sx={{ backgroundColor: 'transparent' }} />
        )}
        {error && <Typography>Error: {error}</Typography>}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: '30%', mb: 2, alignSelf: 'center' }}
        onClick={() => router.push('/navigator/asanaPostures/createAsana')}
      >
        Add Asana
      </Button>
    </Box>
  )
}
