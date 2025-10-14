import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MeetProfileCard from '../../../src/components/profile/meetProfileCard';


export default {
  title: 'Profile/MeetCard', // Название истории
  component: MeetProfileCard,
} as ComponentMeta<typeof MeetProfileCard>;

const Template: ComponentStory<typeof MeetProfileCard> = (args) => <MeetProfileCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Vadim Stepanov',
  quote: 'Не меняйте людей, меняйте людей.',
  imageUri: "../../../src/assets/images/profile/profile.jpg",
  // imageUri: 'https://shapka-youtube.ru/wp-content/uploads/2024/07/krutaya-avatarka-standoff-2-dlya-kibersportsmena.jpg',
  userName: 'alex_techie_2123',
  postCount: '54',
  followersCount: '123',
  followingCount: '16',
};
