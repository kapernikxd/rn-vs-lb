import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { action } from '../../utils/actions';
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

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      label: 'Edit event',
      icon: 'create-outline',
      onPress: () => action('edit-event')(),
    },
    {
      label: 'Share',
      icon: 'share-social-outline',
      onPress: () => action('share-event')(),
    },
  ],
};

export const WithDestructiveAction = Template.bind({});
WithDestructiveAction.args = {
  items: [
    {
      label: 'Promote',
      icon: 'trending-up-outline',
      onPress: () => action('promote')(),
    },
    {
      label: 'Delete event',
      icon: 'trash-outline',
      colorIcon: '#E63946',
      onPress: () => action('delete')(),
    },
  ],
};
