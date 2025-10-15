import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import UserProfileCard from './UserProfileCard';

type UserProfileCardProps = React.ComponentProps<typeof UserProfileCard>;

const meta: Meta<UserProfileCardProps> = {
  title: 'UserCards/UserProfileCard',
  component: UserProfileCard,
  argTypes: {
    layout: {
      control: 'radio',
      options: ['grid', 'list'],
    },
    fullName: {
      control: 'text',
    },
    profession: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
};

export default meta;

const Template: StoryFn<UserProfileCardProps> = (args) => <UserProfileCard {...args} />;

const goToProfileHandler = () => {
  console.log('[storybook:user-profile-card:open]');
};

export const GridLayout = Template.bind({});
GridLayout.args = {
  layout: 'grid',
  fullName: 'Savannah Nguyen',
  profession: 'Volunteer coordinator',
  description: 'Helping NGOs organise large-scale charity events and campaigns.',
  avatarUrl: 'https://i.pravatar.cc/150?img=8',
  goToPofile: goToProfileHandler,
};

export const ListLayout = Template.bind({});
ListLayout.args = {
  layout: 'list',
  fullName: 'Courtney Henry',
  profession: 'Medical volunteer',
  description: 'Certified nurse supporting health-related programmes and first aid trainings.',
  avatarUrl: 'https://i.pravatar.cc/150?img=33',
  goToPofile: goToProfileHandler,
};

export const MinimalInfo = Template.bind({});
MinimalInfo.args = {
  layout: 'list',
  fullName: 'Brooklyn Simmons',
  description: 'Active participant of community-driven initiatives with a focus on education.',
  avatarUrl: 'https://i.pravatar.cc/150?img=19',
  goToPofile: goToProfileHandler,
};
