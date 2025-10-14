import { StyleSheet } from 'react-native';
import appTheme from './theme';
import { COLORS, FONTS, ThemeType } from './theme';

export const getGlobalStyleSheet = (theme: ThemeType) => StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        maxWidth: 700,
    },
    containerPage: {
        padding: 16,
        backgroundColor: theme.white,
        flex: 1
    },
    descriptionCard: {
        ...FONTS.fontSm,
        fontWeight: "500",
        color: theme.description,
        textTransform: 'uppercase',
    },
    btnicon: {
        width: 32,
        height: 32,
        backgroundColor: theme.input,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: 'rgba(255,255,255,.1)',
        height: 40,
        width: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formDescription: {
        ...FONTS.fontXs,
        color: COLORS.text,
        width: 285,
        textAlign: 'center',
        marginBottom: 30,
    },
    loginarea: {
        position: 'relative',
        flex: 1,
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 35
    },
    btnlink: {
        color: theme.primary,
        fontWeight: "300",
        marginBottom: 20,
        textDecorationLine: 'underline',
    },
    mediabtn: {
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    /*
    ** flex,aling,justify
    */
    flex1: {
        flex: 1,
    },
    flexRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexRowStart: {
        flexDirection: 'row',
        alignItems: "flex-start",
    },
    flexRowEnd: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    flexColumnCenter: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    flexColumnStart: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    flexColumnEnd: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    flexalingjust: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    // Комбинированные производные для row/column с выравниванием и распределением
    flexRowCenterBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexRowCenterStart: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    flexRowCenterEnd: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
    },
    flexRowCenterCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    flexRowStartAround: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: 'space-around',
    },
    flexColumnCenterBetween: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexColumnStartAround: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
        justifyContent: 'space-around',
    },
});

export const GlobalStyleSheet = getGlobalStyleSheet(appTheme.lightTheme);

export type GlobalStyleSheetType = ReturnType<typeof getGlobalStyleSheet>;

export const getTypography = (theme: ThemeType) => StyleSheet.create({
    /*
     ** FONT
     */
    titleH2: {
        ...FONTS.h2,
        fontWeight: 'bold',
        color: theme.title
    },
    titleH2Regular: {
        ...FONTS.h2,
        fontWeight: '400',
        color: theme.text,
    },
    titleH3: {
        ...FONTS.h3,
        fontWeight: 'bold',
        color: theme.title
    },
    titleH4: {
        ...FONTS.h4,
        fontWeight: 'bold',
        color: theme.title
    },
    titleH4Regular: {
        ...FONTS.h4,
        fontWeight: '400',
        color: theme.title,
    },
    titleH5: {
        ...FONTS.h5,
        fontWeight: '500',
        color: theme.title
    },
    titleH5Regular: {
        ...FONTS.h5,
        fontWeight: '400',
        color: theme.text,
    },
    titleH6: {
        ...FONTS.h6,
        fontWeight: '500',
        color: theme.title
    },
    titleH6Regular: {
        ...FONTS.h6,
        fontWeight: '400',
        color: theme.text,
    },
    body: {
        ...FONTS.font,
        color: theme.text,
    },
    bodyXs: {
        ...FONTS.fontXs,
        color: theme.text,
    },
    bodySm: {
        ...FONTS.fontSm,
        color: theme.text,
    },
    textLink: {
        ...FONTS.font,
        color: theme.primary,
    },
    textLinkBold: {
        ...FONTS.font,
        color: theme.primary,
        fontWeight: 'bold',
    },
})

export type TypographytType = ReturnType<typeof getTypography>;