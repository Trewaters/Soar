'use client'
import React, { AppBar, IconButton, Toolbar } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NavBottom(props: { subRoute: string }) {
  const router = useRouter()
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: 'white',
          alignSelf: 'center',
          borderRadius: 2,
          width: 'auto',
          flexDirection: 'row',
          justifyContent: 'center',
          bottom: '20px',
          right: 'auto',
          top: 'auto',
          position: 'fixed',
        }}
      >
        <IconButton
          disableRipple
          onClick={() => {
            router.push('/')
          }}
        >
          <Image
            alt="Home icon"
            src="/icons/bottom-home.svg"
            width={20}
            height={20}
          />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => {
            router.push('/navigator/profile')
          }}
        >
          <Image
            alt="User profile icon"
            src="/icons/bottom-user.svg"
            width={20}
            height={20}
          />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => {
            router.push(props.subRoute)
          }}
        >
          <Image
            alt="Bottom burger menu icon"
            src="/icons/bottom-burger-menu.svg"
            width={20}
            height={20}
          />
        </IconButton>
      </AppBar>
    </>
  )
}
