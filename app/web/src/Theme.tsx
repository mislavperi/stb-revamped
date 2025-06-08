import { FC, PropsWithChildren } from 'react'
import { Button, createTheme, MantineColorsTuple, MantineProvider, rem } from '@mantine/core'

const gold = '#dcb65f'
const goldRange: MantineColorsTuple = [
  '#fff7e3',
  '#f8edd2',
  '#eedaaa',
  '#e3c57f',
  '#dbb45a',
  gold,
  '#d3a333',
  '#bb8e25',
  '#a67e1c',
  '#906b0e',
]

const blue = 'rgb(0,69,145)'
const blueRange: MantineColorsTuple = [
  '#ebf5ff',
  '#d4e6fa',
  '#a4ccf7',
  '#71b0f6',
  '#4d99f5',
  '#3a8af5',
  blue,
  '#3082f6',
  '#2570dc',
  '#1a63c4',
  '#0055ad',
]


const theme = createTheme({
	colors: {
    yellow: goldRange,
    blue: blueRange,
  },
	cursorType: 'pointer',

  fontSizes: {
    xs: rem(14),
    sm: rem(16),
    md: rem(18),
    lg: rem(28),
    xl: rem(36),
    xxl: rem(56),
  },
	// fontFamily: "Main",
  components: {
    Button: Button.extend({
      defaultProps: {
        fz: 'md',
      },
    }),
  },
  /** Put your mantine theme override here */
})

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}