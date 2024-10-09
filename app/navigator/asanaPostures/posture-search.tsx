'use client'
import React, { useState, useEffect, SyntheticEvent } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import { PostureData, useAsanaPosture } from '@context/AsanaPostureContext'
import { useRouter } from 'next/navigation'

interface PostureSearchProps {
  posturePropData: PostureData[]
}

export default function PostureSearch({ posturePropData }: PostureSearchProps) {
  const { state, dispatch } = useAsanaPosture()
  const [postures, setPostures] = useState<PostureData[]>(posturePropData)
  const [cardPosture, setcardPosture] = useState<string | null>()
  const router = useRouter()

  const defaultPosture = postures?.find((p) => p.english_name === '')

  useEffect(() => {
    setPostures(posturePropData)
  }, [posturePropData])

  function handleChange(
    event: SyntheticEvent<Element, Event>,
    value: PostureData | null
  ) {
    dispatch({ type: 'SET_POSTURES', payload: value ?? state.postures })

    setcardPosture(value?.english_name || '')
    router.push(`../navigator/asanaPostures/${value?.english_name}/`)
  }

  return (
    <Stack
      spacing={2}
      sx={{
        marginX: 3,
        background: 'white',
        mb: '1em',
        width: { xs: '90vw', md: '40vw' },
      }}
    >
      <Autocomplete
        id="search-poses"
        options={postures}
        getOptionLabel={(option: PostureData) => option.english_name}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.english_name}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Yoga Postures" />
        )}
        defaultValue={defaultPosture}
        autoSelect={true}
        onChange={handleChange}
      />
    </Stack>
  )
}
