'use client'
import { useEffect, useState } from 'react'
import PostureSearch from '@app/navigator/asanaPostures/posture-search'
import NavBottom from '@serverComponents/navBottom'
import { Card, CardContent, Box } from '@mui/material'
import Image from 'next/image'
import { PostureData, useAsanaPosture } from '@context/AsanaPostureContext'
import PostureCard from './posture-card'

export default function Page() {
  const { state } = useAsanaPosture()
  const [posturePropData, setPosturePropData] = useState<PostureData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
      <Box
        sx={{
          alignSelf: 'center',
          pt: '16px',
        }}
      >
        <Image
          src="/icons/designImages/beautiful-woman-practices-yoga-asana-raja-bhujanga.png"
          alt="Asana Posture Search"
          height={'355'}
          width={'430'}
        ></Image>
      </Box>
      <Box
        sx={{
          alignSelf: 'center',
          width: '50%',
        }}
      >
        <Card
          sx={{
            width: ['90vw', '90%'],
          }}
        >
          {loading && <p>Loading Yoga Postures...</p>}
          {error && <p>Error: {error}</p>}
          <CardContent
            sx={{
              position: 'absolute',
              top: '300px',
              // width: '430px',
              maxwidth: '430px',
              transform: 'translateX(0%)',
            }}
          >
            {/* 
          Rewrite so there is more seperation of concerns. 
           1) PostureSearch should only be responsible for rendering the search bar and the list of postures.
           2) PostureSearch should return a value that is rendered in an Asana Card.
          */}
            <PostureSearch posturePropData={posturePropData} />
          </CardContent>
        </Card>
      </Box>
      {/* <Box sx={{ height: '100px', mt: '16px' }}>
        {state.postures.id !== 0 && (
          <PostureCard postureCardProp={state.postures} />
        )}
      </Box> */}
      <NavBottom />

      {/* <Box sx={{ height: '100px', mt: '16px' }}>
        <Box textAlign={'center'}>
          <Image
            alt="Asana Posture Search"
            height={355 * 1.5}
            width={430 * 1.5}
            src={
              '/icons/designImages/beautiful-woman-practices-yoga-asana-raja-bhujanga.png'
            }
          ></Image>
          <Box
            sx={{
              position: 'relative',
              // top: '50%',
              // top: '600px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            <PostureSearch posturePropData={posturePropData} />
          </Box>
        </Box>
      </Box> */}
    </Box>
  )
}
