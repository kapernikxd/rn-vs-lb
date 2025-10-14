import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: "#4F8CBF", // "#6f2da8", // "#9E5FD3",
    primaryHover: "#b085d6",
    primaryLight: "#7BAEFF",
    success: "#0ecb81",
    danger: "#ff4a5c",
    info: "#627EEA",
    warning: "#ffb02c",
    white: "#fff",
    black: "#000",
    red: "#D93025",
    dark: "#2f2f2f",
    light: "#E6E6E6",

    // light
    title: "#000",
    text: "#475A77",
    description: "#666",
    background: "#f5f5f5", //"#edeef0", // "#EFF3FA",
    backgroundSecond: "#F4F4F6",
    backgroundThird: "#f2f2f2",
    background4: "#f0f0f0",
    backgroundLight: "#f9f9f9",
    backgroundSemiTransparent: 'rgba(255, 255, 255, 0.3)',
    backgroundDark: "rgba(0, 0, 0, 0.80)",
    card: "#fff",
    border: "rgba(0, 0, 0, 0.10)",
    input: "#EFF3FA",
    placeholder: 'rgba(71,90,119,.5)',
    backgroundBtn: '#f5f5f5',
    backgroundDate: '#f3f1f7',
    backgroundChatMessageRight: "rgba(226, 245, 255, 0.8)",
    backgroundChatMessageLeft: "rgba(251, 249, 255, 0.8)",

    // dark 
    darkTitle: "#fff",
    darkText: "rgba(255,255,255,.6)",
    darkBackground: "#070C1F",
    darkBackgroundLight: "#1e1e1e", // Очень тёмный серый (инверсия #f9f9f9)
    darkBackgroundSecond: "#252525", // Чуть светлее #1e1e1e (инверсия #F4F4F6)
    darkBackgroundThird: "#2a2a2a", // Средне-тёмный фон (инверсия #f2f2f2)
    darkBackground4: "#303030", // Чуть светлее #2a2a2a (инверсия #f0f0f0)
    darkBackgroundSemiTransparent: "rgba(0, 0, 0, 0.3)",
    backgroundDarkDark: "rgba(255, 255, 255, 0.80)",
    darkCard: "#0D163D",
    darkBorder: "rgba(255,255,255,0.12)", // Светлая граница с низким контрастом
    darkInput: "rgba(255,255,255,.1)",
    darkPlaceholder: "rgba(255,255,255,.5)",
    darkBackgroundBtn: "#3a3a3a", // Темно-серый для кнопок (инверсия #f5f5f5)
    darkBackgroundDate: "#343434", // Чуть светлее кнопок, подходит для выделения дат
    darkBackgroundChatMessageRight: "rgba(50, 65, 80, 0.8)", // Тёмно-синий с прозрачностью
    darkBackgroundChatMessageLeft: "rgba(60, 60, 60, 0.8)", // Тёмно-серый с прозрачностью
   
    //text
    greyText: "#888",
    greyBtnText: "#333",
    dotColor: "rgba(255, 255, 255, 0.5)",

    darkGreyText: "#b0b0b0", // Светло-серый текст, хорошо читается на тёмном фоне (инверсия #888)
    darkGreyBtnText: "#d4d4d4", // Светло-серый, достаточно контрастный для кнопок (инверсия #333)
    darkDotColor: "rgba(200, 200, 200, 0.5)", // Мягкий светло-серый для точек, хорошо заметный на тёмном фоне


}

export const SIZES = {
    //Font Sizes
    font: 14,
    fontSm: 13,
    fontXs: 12,

    h1: 40,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,

    //radius
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

    //App dimensions
    width,
    height,

    container: 800,
    contentArea: {
        paddingTop: 70,
        paddingBottom: 150,
    }
};

export const FONT_SIZE = {
    xs: 12,
    sm: 13,
    md: 14,

    h1: 40,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
  };

export const FONTS = {
    font: { fontSize: FONT_SIZE.md, lineHeight: 20 },
    fontSm: { fontSize: FONT_SIZE.sm, lineHeight: 18 },
    fontXs: { fontSize: FONT_SIZE.xs, lineHeight: 16 },
    h1: { fontSize: FONT_SIZE.h1, lineHeight: 48 },
    h2: { fontSize: FONT_SIZE.h2, lineHeight: 34 },
    h3: { fontSize: FONT_SIZE.h3, lineHeight: 28 },
    h4: { fontSize: FONT_SIZE.h4, lineHeight: 26 },
    h5: { fontSize: FONT_SIZE.h5, lineHeight: 24 },
    h6: { fontSize: FONT_SIZE.h6, lineHeight: 20 },

    fontRegular: { fontWeight: "300" },
    fontMedium: { fontWeight: "400" },
    fontSemiBold: { fontWeight: "500" },
    fontBold: { fontWeight: '600' },
}


const lightTheme = {
    whiteFix: COLORS.white,

    primary: COLORS.primary,
    primaryHover: COLORS.primaryHover,
    primaryLight: COLORS.primaryLight,
    success: COLORS.success,
    danger: COLORS.danger,
    info: COLORS.info,
    warning: COLORS.warning,
    white: COLORS.white,
    black: COLORS.black,
    red: COLORS.red,
    dark: COLORS.dark,
    light: COLORS.light,

    title: COLORS.title,
    text: COLORS.text,
    greyText: COLORS.greyText,
    description: COLORS.description,
    background: COLORS.background,
    backgroundSecond: COLORS.backgroundSecond,
    backgroundThird: COLORS.backgroundThird,
    background4: COLORS.background4,
    backgroundLight: COLORS.backgroundLight,
    backgroundDark: COLORS.backgroundDark,
    backgroundSemiTransparent: COLORS.darkBackgroundSemiTransparent,

    card: COLORS.card,

    input: COLORS.input,
    border: COLORS.border,
    darkBorder: COLORS.darkBorder,
    placeholder: COLORS.placeholder,
    greyBtnText: COLORS.greyBtnText,
    backgroundBtn: COLORS.backgroundBtn,
    backgroundDate: COLORS.backgroundDate,
    backgroundChatMessageRight: COLORS.backgroundChatMessageRight,
    backgroundChatMessageLeft: COLORS.backgroundChatMessageLeft,

    dotColor: COLORS.dotColor,
}

const darkTheme = {
    whiteFix: COLORS.white,
    
    primary: COLORS.primary,
    primaryHover: COLORS.primaryHover,
    primaryLight: COLORS.primaryLight,
    success: COLORS.success,
    danger: COLORS.danger,
    info: COLORS.info,
    warning: COLORS.warning,
    white: COLORS.darkBackground,
    black: COLORS.white,
    red: COLORS.red,
    dark: COLORS.light,
    light: COLORS.dark,

    title: COLORS.darkTitle,
    text: COLORS.darkText,
    greyText: COLORS.darkGreyText,
    description: COLORS.description, //todo! define
    background: COLORS.darkBackgroundSecond,
    backgroundSecond: COLORS.darkBackgroundSecond,
    backgroundThird: COLORS.darkBackgroundThird,
    background4: COLORS.darkBackground4,
    backgroundLight: COLORS.darkBackgroundLight,
    backgroundDark: COLORS.backgroundDarkDark,
    backgroundSemiTransparent: COLORS.darkBackgroundSemiTransparent,

    card: COLORS.darkCard,

    input: COLORS.darkInput,
    border: COLORS.darkBorder,
    darkBorder: COLORS.darkBorder,
    placeholder: COLORS.darkPlaceholder,
    greyBtnText: COLORS.darkGreyBtnText,
    backgroundBtn: COLORS.darkBackgroundBtn,
    backgroundDate: COLORS.darkBackgroundDate,
    backgroundChatMessageRight: COLORS.darkBackgroundChatMessageRight,
    backgroundChatMessageLeft: COLORS.darkBackgroundChatMessageLeft,

    dotColor: COLORS.darkDotColor,
}

export type ThemeType = typeof lightTheme;
export type SizesType = typeof SIZES;
export type FontsType = typeof FONTS;
const appTheme = { COLORS, SIZES, FONTS, darkTheme, lightTheme }

export default appTheme;


// export const IMAGES = {
//     google: require('../assets/images/icons/google.png'),
// }