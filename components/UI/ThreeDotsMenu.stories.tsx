import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ThreeDotsMenu } from './ThreeDotsMenu';

type ThreeDotsMenuProps = React.ComponentProps<typeof ThreeDotsMenu>;

const meta: Meta<ThreeDotsMenuProps> = {
  title: 'UI/ThreeDotsMenu',
  component: ThreeDotsMenu,
  decorators: [
    (StoryComponent) => (
      <View style={{ alignItems: 'flex-end', padding: 24 }}>
        <StoryComponent />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<ThreeDotsMenuProps>;

const logMenuPress = (label: string) => {
  console.log('[storybook:menu-press]', label);
};

export const Default: Story = {
  render: () => (
    <ThreeDotsMenu
      items={[
        {
          label: 'Edit event',
          icon: 'create-outline',
          onPress: () => logMenuPress('Edit event'),
        },
        {
          label: 'Share',
          icon: 'share-social-outline',
          onPress: () => logMenuPress('Share'),
        },
      ]}
    />
  ),
};

export const WithDestructiveAction: Story = {
  render: () => (
    <ThreeDotsMenu
      items={[
        {
          label: 'Promote',
          icon: 'trending-up-outline',
          onPress: () => logMenuPress('Promote'),
        },
        {
          label: 'Delete event',
          icon: 'trash-outline',
          colorIcon: '#E63946',
          onPress: () => logMenuPress('Delete event'),
        },
      ]}
    />
  ),
};
