import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: "#6f2da8",
    primaryLight: "#7BAEFF",
    // primaryLight: "#9E5FD3",
    secondary: "#002C72",
    success: "#0ecb81",
    danger: "#ff4a5c",
    info: "#627EEA",
    warning: "#ffb02c",
    yellow: "#fff346",
    white: "#fff",
    black: "#000",
    red:"#ff0000",
    dark: "#2f2f2f",
    light: "#E6E6E6",

    // light
    title: "#000",
    text: "#475A77",
    background: "#EFF3FA",
    card: "#fff",
    border: "rgba(0, 0, 0, 0.10)",
    input: "#EFF3FA",
    placeholder: 'rgba(71,90,119,.5)',

    // dark 
    darkTitle: "#fff",
    darkText: "rgba(255,255,255,.6)",
    darkBackground: "#070C1F",
    darkCard: "#0D163D",
    darkBorder: "rgba(255,255,255,.15)",
    darkInput: "rgba(255,255,255,.1)",
    darkPlaceholder: "rgba(255,255,255,.5)",

    //text
    greyText: "#888",
    // #666',

    //background
    // #f5f5f5

}

export const SIZES = {
    font: 14,
    fontSm: 13,
    fontXs: 12,
    radius: 10,
    radius_lg: 20,
    radius_sm: 8,

    //space
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,

    //Font Sizes
    h1: 40,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,

    //App dimensions
    width,
    height,

    container : 800,
    contentArea: {
        paddingTop: 70,
        paddingBottom: 150,
    }
};
export const FONTS = {
    font: { fontSize: SIZES.font, lineHeight: 20 },
    fontSm: { fontSize: SIZES.fontSm, lineHeight: 18 },
    fontXs: { fontSize: SIZES.fontXs, lineHeight: 16 },
    h1: { fontSize: SIZES.h1, lineHeight: 48, color: COLORS.title },
    h2: { fontSize: SIZES.h2, lineHeight: 34, color: COLORS.title },
    h3: { fontSize: SIZES.h3, lineHeight: 28, color: COLORS.title },
    h4: { fontSize: SIZES.h4, lineHeight: 26, color: COLORS.title },
    h5: { fontSize: SIZES.h5, lineHeight: 24, color: COLORS.title },
    h6: { fontSize: SIZES.h6, lineHeight: 20, color: COLORS.title }, 

    fontRegular: { fontWeight: "300" },
    fontMedium: { fontWeight: "400" },
    fontSemiBold: { fontWeight: "500" },
    fontBold: { fontWeight: '600' },
}


const appTheme = { COLORS, SIZES, FONTS }

export default appTheme;