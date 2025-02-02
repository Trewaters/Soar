'use client'
import React, { useEffect, useState } from 'react'
import { FullAsanaData } from '@app/context/AsanaPostureContext'
import PostureActivityDetail from './postureActivityDetail'
import { Box } from '@mui/material'
import NavBottom from '@serverComponents/navBottom'

export default function Page({ params }: { params: { pose: string } }) {
  const [viewPose, setViewPose] = useState<FullAsanaData>({} as FullAsanaData)

  useEffect(() => {
    const getViewPose = async () => {
      const response = await fetch(
        `/api/poses/?sort_english_name=${params.pose}`,
        { cache: 'no-store' }
      )
      const responseData = await response.json()
      setViewPose(responseData)
      // return await response.json()
    }
    getViewPose()
  }, [params.pose])
  return (
    <>
      <Box
        sx={{
          pb: '60px',
        }}
      >
        <PostureActivityDetail postureCardProp={viewPose} />
      </Box>
      <NavBottom subRoute="/navigator/asanaPostures" />
    </>
  )
}
