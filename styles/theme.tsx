import { CSSProperties } from 'react'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: CSSProperties
  }

  interface TypographyVariantsOptions {
    label?: CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true
  }
}

export const theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 } },
  spacing: [0, 4, 8, 16, 32, 40, 48, 64],
  palette: {
    mode: 'light',
    primary: {
      main: '#F6893D',
      light: '#FFBA6F',
      dark: '#C3581A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F6B93D',
      light: '#FFD970',
      dark: '#C38B1A',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      light: '#E57373',
      dark: '#9A0007',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFA726',
      light: '#FFD95B',
      dark: '#C77800',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#1976D2',
      light: '#63A4FF',
      dark: '#004BA0',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2E7D32',
      light: '#60AD5E',
      dark: '#005005',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      // used by CardHeader.subheader
      secondary: '#C08926',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    action: {
      active: '#ffffff',
      hover: '#ffffff',
      selected: '#ffffff',
      disabled: '#ffffff',
      disabledBackground: '#ffffff',
    },
    divider: '#ffffff',
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
    },
    h1: { fontSize: '6em' },
    h2: { fontSize: '3.75em' },
    h3: { fontSize: '3em' },
    h4: { fontSize: '2.125em' },
    h5: { fontSize: '1.5em' },
    h6: { fontSize: '1.25em' },
    body1: { fontSize: '1em' },
    body2: { fontSize: '0.875em' },
    subtitle1: { fontSize: '1em' },
    subtitle2: { fontSize: '0.875em' },
    overline: { fontSize: '0.75em' },
    caption: { fontSize: '0.75em' },
    label: { fontSize: '1.5em', fontFamily: ['Lato', 'sans-serif'].join(',') },
  },
})

export default theme
