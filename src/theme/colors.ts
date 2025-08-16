import { Platform } from "react-native"

const IOS_SYSTEM_COLORS = {
  white: "rgb(255, 255, 255)", // #FFFFFF
  black: "rgb(0, 0, 0)", // #000000
  light: {
    grey6: "rgb(242, 242, 247)", // #F2F2F7
    grey5: "rgb(230, 230, 235)", // #E6E6EB
    grey4: "rgb(210, 210, 215)", // #D2D2D7
    grey3: "rgb(199, 199, 204)", // #C7C7CC
    grey2: "rgb(175, 176, 180)", // #AFB0B4
    grey: "rgb(142, 142, 147)", // #8E8E93
    background: "rgb(242, 242, 247)", // #F2F2F7
    foreground: "rgb(0, 0, 0)", // #000000
    root: "rgb(255, 255, 255)", // #FFFFFF
    card: "rgb(255, 255, 255)", // #FFFFFF
    destructive: "rgb(255, 56, 43)", // #FF382B
    primary: "rgb(0, 123, 254)" // #007BFE
  },
  dark: {
    grey6: "rgb(21, 21, 24)", // #151518
    grey5: "rgb(40, 40, 42)", // #28282A
    grey4: "rgb(55, 55, 57)", // #373739
    grey3: "rgb(70, 70, 73)", // #464649
    grey2: "rgb(99, 99, 102)", // #636366
    grey: "rgb(142, 142, 147)", // #8E8E93
    background: "rgb(0, 0, 0)", // #000000
    foreground: "rgb(255, 255, 255)", // #FFFFFF
    root: "rgb(0, 0, 0)", // #000000
    card: "rgb(28, 28, 30)", // #1C1C1E
    destructive: "rgb(254, 67, 54)", // #FE4336
    primary: "rgb(3, 133, 255)" // #0385FF
  }
} as const

const ANDROID_COLORS = {
  white: "rgb(255, 255, 255)", // #FFFFFF
  black: "rgb(0, 0, 0)", // #000000
  light: {
    grey6: "rgb(249, 249, 255)", // #F9F9FF
    grey5: "rgb(215, 217, 228)", // #D7D9E4
    grey4: "rgb(193, 198, 215)", // #C1C6D7
    grey3: "rgb(113, 119, 134)", // #717786
    grey2: "rgb(65, 71, 84)", // #414754
    grey: "rgb(24, 28, 35)", // #181C23
    background: "rgb(249, 249, 255)", // #F9F9FF
    foreground: "rgb(0, 0, 0)", // #000000
    root: "rgb(255, 255, 255)", // #FFFFFF
    card: "rgb(255, 255, 255)", // #FFFFFF
    destructive: "rgb(186, 26, 26)", // #BA1A1A
    primary: "rgb(0, 112, 233)" // #0070E9
  },
  dark: {
    grey6: "rgb(16, 19, 27)", // #10131B
    grey5: "rgb(39, 42, 50)", // #272A32
    grey4: "rgb(49, 53, 61)", // #31353D
    grey3: "rgb(54, 57, 66)", // #363942
    grey2: "rgb(139, 144, 160)", // #8B90A0
    grey: "rgb(193, 198, 215)", // #C1C6D7
    background: "rgb(0, 0, 0)", // #000000
    foreground: "rgb(255, 255, 255)", // #FFFFFF
    root: "rgb(0, 0, 0)", // #000000
    card: "rgb(16, 19, 27)", // #10131B
    destructive: "rgb(147, 0, 10)", // #93000A
    primary: "rgb(3, 133, 255)" // #0385FF
  }
} as const

const COLORS = Platform.OS === "ios" ? IOS_SYSTEM_COLORS : ANDROID_COLORS

export { COLORS }
