import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Meta, StoryObj } from '@storybook/react';
import { UpdateRequiredView } from './UpdateRequiredView';
import { ThemeProvider } from '../../theme';

// 👇 Декоратор, чтобы обернуть компонент в тему
const withTheme = (StoryFn: any) => (
  <ThemeProvider>
    <StoryFn />
  </ThemeProvider>
);

const meta: Meta<typeof UpdateRequiredView> = {
  title: 'UI/UpdateRequiredView',
  component: UpdateRequiredView,
  decorators: [withTheme],
  argTypes: {
    onPressUpdate: { action: 'pressed update' },
    onRefresh: { action: 'refreshed' },
  },
};

export default meta;

type Story = StoryObj<typeof UpdateRequiredView>;

export const Default: Story = {
  render: (args) => {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -10,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [anim]);

    return (
      <UpdateRequiredView
        {...args}
        anim={anim}
      />
    );
  },
  args: {
    refreshing: false,
    title: 'Необходимо обновление',
    description:
      'Для корректной работы приложения установите последнюю версию. Нажмите кнопку ниже, чтобы перейти в магазин.',
  },
};

export const Refreshing: Story = {
  render: Default.render,
  args: {
    refreshing: true,
    title: 'Проверка обновлений...',
    description: 'Подождите, идет проверка доступных обновлений.',
  },
};
