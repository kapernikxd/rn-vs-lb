import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { action } from '@storybook/addon-actions';
import OrganizerContainer from './OrganizerContainer';
import { renderWithTheme, WithThemeArgs } from '../../../storybook/renderWithTheme';

type OrganizerContainerStoryArgs = WithThemeArgs & React.ComponentProps<typeof OrganizerContainer>;

const meta: Meta<OrganizerContainerStoryArgs> = {
  title: 'Components/EventCard/OrganizerContainer',
  component: OrganizerContainer,
  args: {
    avatarUri: 'https://placekitten.com/120/120',
    organizerName: 'Product Design Community',
    organizerLink: 'https://example.com',
    themeMode: 'light',
  },
  argTypes: {
    avatarUri: { control: 'text' },
    organizerName: { control: 'text' },
    organizerLink: { control: 'text' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<OrganizerContainerStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <OrganizerStoryWrapper {...rest} />;
  }, {
    maxWidth: 360,
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<OrganizerContainerStoryArgs>;

const OrganizerStoryWrapper: React.FC<React.ComponentProps<typeof OrganizerContainer>> = (props) => {
  useEffect(() => {
    const originalOpenURL = Linking.openURL;

    Linking.openURL = async (url: string) => {
      action('openURL')(url);
      return true;
    };

    return () => {
      Linking.openURL = originalOpenURL;
    };
  }, []);

  return <OrganizerContainer {...props} />;
};

export const Default: Story = {};

export const CustomLink: Story = {
  args: {
    organizerLink: 'https://community.example.com',
    organizerName: 'Global Makers Club',
  },
};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};
