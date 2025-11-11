import React, { useMemo, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemeProvider, createAppTheme, darkTheme as baseDarkTheme, useTheme } from '../../theme';
import HeaderDefault from '../Header/HeaderDefault';
import TabBar from '../UI/TabBar/TabBarAi';

const darkAppTheme = createAppTheme({
  light: baseDarkTheme,
  dark: baseDarkTheme,
});

const previewStyles = StyleSheet.create({
  previewBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    backgroundColor: '#050A1B',
  },
});

const meta: Meta = {
  title: 'Screens/Horoscope/DailyOverview',
  component: () => null,
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkAppTheme}>
        <View style={previewStyles.previewBackground}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryFn;

type HoroscopeCardData = {
  key: string;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  accent: string;
};

const cards: HoroscopeCardData[] = [
  {
    key: 'career',
    title: 'Карьера',
    description: 'Луна во Льве помогает сфокусироваться на долгосрочных целях и заметить новые возможности роста.',
    icon: 'briefcase-variant-outline',
    accent: '#63B3FF',
  },
  {
    key: 'love',
    title: 'Любовь',
    description: 'В отношениях сегодня больше тепла. Откровенный разговор сделает связь сильнее.',
    icon: 'heart-outline',
    accent: '#FF7AB8',
  },
  {
    key: 'health',
    title: 'Здоровье',
    description: 'Добавьте к привычному распорядку короткую разминку — организм отблагодарит энергией.',
    icon: 'heart-pulse',
    accent: '#7DE2AC',
  },
  {
    key: 'family',
    title: 'Семья',
    description: 'Совместный вечер укрепит доверие. Запланируйте семейный ритуал, чтобы повторить его позже.',
    icon: 'account-group-outline',
    accent: '#F7C977',
  },
];

const tabs = [
  { key: 'yesterday', label: 'Вчера' },
  { key: 'today', label: 'Сегодня' },
  { key: 'tomorrow', label: 'Завтра' },
  { key: 'week', label: 'На неделю' },
  { key: 'month', label: 'На месяц' },
];

const ScreenSurface: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme, sizes } = useTheme();
  const surfaceStyles = useMemo(
    () =>
      StyleSheet.create({
        surface: {
          backgroundColor: theme.background,
          borderRadius: sizes.radius_lg as number,
          paddingHorizontal: sizes.lg as number,
          paddingVertical: sizes.lg as number,
          width: 360,
          minHeight: 640,
          gap: sizes.lg as number,
        },
      }),
    [theme, sizes],
  );

  return <View style={surfaceStyles.surface}>{children}</View>;
};

const HoroscopeDescription: React.FC = () => {
  const { theme, sizes, typography } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.card,
          borderRadius: sizes.radius_lg as number,
          paddingHorizontal: sizes.lg as number,
          paddingVertical: sizes.lg as number,
          gap: sizes.sm as number,
        },
        title: {
          color: theme.title,
          ...typography.titleH5,
        },
        text: {
          color: theme.text,
          ...typography.body,
          lineHeight: 20,
        },
      }),
    [theme, sizes, typography],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Понедельник, 10 ноября</Text>
      <Text style={styles.text}>
        Сегодня, Козерог, энергия Луны во Льве помогает смело заявить о себе. Используйте этот заряд, чтобы показать
        свои идеи и таланты, а также поддержать тех, кто рядом с вами.
      </Text>
      <Text style={styles.text}>
        День отлично подходит для проектов, что зажигают вас изнутри. Делитесь вдохновением и не бойтесь инициативы —
        это поможет получить заслуженное внимание.
      </Text>
    </View>
  );
};

const HoroscopeCard: React.FC<{ item: HoroscopeCardData }> = ({ item }) => {
  const { theme, sizes, typography } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: theme.card,
          borderRadius: sizes.radius_lg as number,
          padding: sizes.lg as number,
          width: '48%',
          minHeight: 156,
          justifyContent: 'space-between',
          marginBottom: sizes.lg as number,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        },
        iconWrapper: {
          backgroundColor: item.accent,
          borderRadius: sizes.radius as number,
          padding: sizes.sm as number,
        },
        title: {
          color: theme.title,
          marginTop: sizes.sm as number,
          ...typography.titleH6,
        },
        description: {
          color: theme.text,
          marginTop: sizes.xs as number,
          ...typography.body,
        },
      }),
    [theme, sizes, typography, item.accent],
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name={item.icon} size={24} color={theme.background} />
        </View>
        <Feather name="lock" size={18} color={theme.greyText} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={3} style={styles.description}>
        {item.description}
      </Text>
    </View>
  );
};

const HoroscopeCardsGrid: React.FC = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        },
      }),
    [],
  );

  return (
    <View style={styles.container}>
      {cards.map((card) => (
        <HoroscopeCard key={card.key} item={card} />
      ))}
    </View>
  );
};

const HoroscopeTabBar: React.FC<{
  activeIndex: number;
  onChange: (index: number) => void;
}> = ({ activeIndex, onChange }) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: 'transparent',
          paddingVertical: 4,
        },
        divider: {
          height: 1,
          backgroundColor: theme.border,
          marginTop: 8,
        },
      }),
    [theme],
  );

  return (
    <View>
      <View style={styles.wrapper}>
        <TabBar
          tabs={tabs}
          activeIndex={activeIndex}
          onChange={onChange}
          activeColor={theme.title}
          inactiveColor="rgba(255,255,255,0.45)"
          indicatorColor="#F7C977"
          indicatorHeight={3}
          fontSize={16}
          fontWeightActive="700"
          fontWeightInactive="500"
          tabHorizontalPadding={8}
          gap={20}
        />
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export const HoroscopeDailyOverview: Story = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <ScreenSurface>
      <HeaderDefault title="Гороскоп" onBackPress={() => {}} />
      <HoroscopeTabBar activeIndex={activeTab} onChange={setActiveTab} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 24, paddingBottom: 32 }}
      >
        <HoroscopeDescription />
        <HoroscopeCardsGrid />
      </ScrollView>
    </ScreenSurface>
  );
};

