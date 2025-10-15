import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { View, Text } from 'react-native';
import { ThreeDotsMenu } from './ThreeDotsMenu';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type MenuItem = React.ComponentProps<typeof ThreeDotsMenu>['items'][number];

type ThreeDotsMenuStoryArgs = WithThemeArgs & {
  items: MenuItem[];
  description: string;
};

const defaultItems: MenuItem[] = [
  { label: 'Edit', icon: 'create-outline', onPress: action('edit') },
  { label: 'Share', icon: 'share-outline', onPress: action('share') },
  { label: 'Delete', icon: 'trash-outline', colorIcon: '#ff4a5c', onPress: action('delete') },
];

const meta: Meta<ThreeDotsMenuStoryArgs> = {
  title: 'Components/UI/ThreeDotsMenu',
  component: ThreeDotsMenu,
  args: {
    items: defaultItems,
    description: 'Tap the menu button to explore the actions.',
    themeMode: 'light',
  },
  argTypes: {
    items: { control: 'object' },
    description: { control: 'text' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<ThreeDotsMenuStoryArgs>((props) => {
    const { items, description, themeMode: _themeMode } = props;
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 12 }}>{description}</Text>
        <ThreeDotsMenu items={items} />
      </View>
    );
  }),
};

export default meta;

type Story = StoryObj<ThreeDotsMenuStoryArgs>;

export const Default: Story = {};

export const Minimal: Story = {
  args: {
    items: [
      { label: 'View profile', icon: 'person-outline', onPress: action('view-profile') },
    ],
  },
};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};
