import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { ThreeDotsMenu } from '../../../src/components/UI/ThreeDotsMenu';

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

const Template: StoryFn<ThreeDotsMenuProps> = (args) => <ThreeDotsMenu {...args} />;

const menuPressLogger = (label: string) => {
  console.log('[storybook:menu-press]', label);
};
const createMenuHandler = (label: string) => () => menuPressLogger(label);

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      label: 'Edit event',
      icon: 'create-outline',
      onPress: createMenuHandler('Edit event'),
    },
    {
      label: 'Share',
      icon: 'share-social-outline',
      onPress: createMenuHandler('Share'),
    },
  ],
};

export const WithDestructiveAction = Template.bind({});
WithDestructiveAction.args = {
  items: [
    {
      label: 'Promote',
      icon: 'trending-up-outline',
      onPress: createMenuHandler('Promote'),
    },
    {
      label: 'Delete event',
      icon: 'trash-outline',
      colorIcon: '#E63946',
      onPress: createMenuHandler('Delete event'),
    },
  ],
};
