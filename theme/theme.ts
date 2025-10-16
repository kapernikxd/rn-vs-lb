import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const DEFAULT_COLORS = {
    primary: "#6f2da8", // "#9E5FD3",
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
    backgroundSemiTransparent: "rgba(255, 255, 255, 0.3)",
    card: "#fff",
    border: "rgba(0, 0, 0, 0.10)",
    input: "#EFF3FA",
    placeholder: "rgba(71,90,119,.5)",
    backgroundBtn: "#f5f5f5",
    backgroundDate: "#f3f1f7",
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
};

const DEFAULT_SIZES = {
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
    },
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

const DEFAULT_FONTS = {
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
    fontBold: { fontWeight: "600" },
};

const buildLightTheme = (colors: typeof DEFAULT_COLORS) => ({
    primary: colors.primary,
    primaryHover: colors.primaryHover,
    primaryLight: colors.primaryLight,
    success: colors.success,
    danger: colors.danger,
    info: colors.info,
    warning: colors.warning,
    white: colors.white,
    black: colors.black,
    red: colors.red,
    dark: colors.dark,
    light: colors.light,

    title: colors.title,
    text: colors.text,
    greyText: colors.greyText,
    description: colors.description,
    background: colors.background,
    backgroundSecond: colors.backgroundSecond,
    backgroundThird: colors.backgroundThird,
    background4: colors.background4,
    backgroundLight: colors.backgroundLight,
    backgroundSemiTransparent: colors.darkBackgroundSemiTransparent,

    card: colors.card,

    input: colors.input,
    border: colors.border,
    darkBorder: colors.darkBorder,
    placeholder: colors.placeholder,
    greyBtnText: colors.greyBtnText,
    backgroundBtn: colors.backgroundBtn,
    backgroundDate: colors.backgroundDate,
    backgroundChatMessageRight: colors.backgroundChatMessageRight,
    backgroundChatMessageLeft: colors.backgroundChatMessageLeft,

    dotColor: colors.dotColor,
});

const buildDarkTheme = (colors: typeof DEFAULT_COLORS) => ({
    primary: colors.primary,
    primaryHover: colors.primaryHover,
    primaryLight: colors.primaryLight,
    success: colors.success,
    danger: colors.danger,
    info: colors.info,
    warning: colors.warning,
    white: colors.darkBackground,
    black: colors.white,
    red: colors.red,
    dark: colors.light,
    light: colors.dark,

    title: colors.darkTitle,
    text: colors.darkText,
    greyText: colors.darkGreyText,
    description: colors.description, //todo! define
    background: colors.darkBackgroundSecond,
    backgroundSecond: colors.darkBackgroundSecond,
    backgroundThird: colors.darkBackgroundThird,
    background4: colors.darkBackground4,
    backgroundLight: colors.darkBackgroundLight,
    backgroundSemiTransparent: colors.darkBackgroundSemiTransparent,

    card: colors.darkCard,

    input: colors.darkInput,
    border: colors.darkBorder,
    darkBorder: colors.darkBorder,
    placeholder: colors.darkPlaceholder,
    greyBtnText: colors.darkGreyBtnText,
    backgroundBtn: colors.darkBackgroundBtn,
    backgroundDate: colors.darkBackgroundDate,
    backgroundChatMessageRight: colors.darkBackgroundChatMessageRight,
    backgroundChatMessageLeft: colors.darkBackgroundChatMessageLeft,

    dotColor: colors.darkDotColor,
});

export type ThemeColors = typeof DEFAULT_COLORS;
export type ThemeShape = ReturnType<typeof buildLightTheme>;

export type ThemeOverrides = {
    colors?: Partial<ThemeColors>;
    light?: Partial<ThemeShape>;
    dark?: Partial<ThemeShape>;
};

export const createAppTheme = (overrides: ThemeOverrides = {}) => {
    const mergedColors: ThemeColors = { ...DEFAULT_COLORS, ...overrides.colors };
    const lightTheme = { ...buildLightTheme(mergedColors), ...overrides.light };
    const darkTheme = { ...buildDarkTheme(mergedColors), ...overrides.dark };

    return {
        COLORS: mergedColors,
        SIZES: { ...DEFAULT_SIZES },
        FONTS: { ...DEFAULT_FONTS },
        lightTheme,
        darkTheme,
    };
};

export type AppThemeConfig = ReturnType<typeof createAppTheme>;

const defaultTheme = createAppTheme();

export const COLORS = defaultTheme.COLORS;
export const SIZES = defaultTheme.SIZES;
export const FONTS = defaultTheme.FONTS;
export const lightTheme = defaultTheme.lightTheme;
export const darkTheme = defaultTheme.darkTheme;

export type ThemeType = typeof lightTheme;
export type SizesType = typeof SIZES;
export type FontsType = typeof FONTS;

const appTheme = defaultTheme;

export default appTheme;
