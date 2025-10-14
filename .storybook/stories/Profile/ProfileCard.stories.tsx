import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProfileCard from '../../../src/components/profile/ProfileCard'; // Убедись, что путь правильный

export default {
  title: 'Profile/Card', // Название истории
  component: ProfileCard,
  argTypes: {
    onPostPress: { action: 'Post Pressed' }, // Storybook будет логировать событие при нажатии
    onLearnMorePress: { action: 'Learn More Pressed' }, // Storybook будет логировать событие при нажатии
    onBack: { action: 'on Back pressed' }
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Vadim Stepanov',
  quote: 'Не меняйте людей, меняйте людей.',
  imageUri: "https://pllace.su:5001/images/6514af811be92791a7f4eabb/IMG_20230827_131011_008.jpg",
  isAuth: true,
  // imageUri: 'https://shapka-youtube.ru/wp-content/uploads/2024/07/krutaya-avatarka-standoff-2-dlya-kibersportsmena.jpg',
};
