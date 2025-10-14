import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from '../../../src/components/eventCard';

export default {
  title: 'EventCard',
  component: EventCard,
  argTypes: {
    imageUri: { control: 'text', description: 'URL of the event image' },
    date: { control: 'text', description: 'Date and time of the event' },
    title: { control: 'text', description: 'Title of the event' },
    description: { control: 'text', description: 'Description of the event' },
    organizerAvatarUri: { control: 'text', description: 'URL of the organizer\'s avatar' },
    organizerName: { control: 'text', description: 'Name of the organizer' },
    organizerLink: { control: 'text', description: 'Link to Organizer Profile' },
    likes: { control: 'number', description: 'Number of likes' },
    views: { control: 'number', description: 'Number of views' },
    tags: {
      control: 'object',
      description: 'Array of tag objects with label, backgroundColor, textColor, and borderColor',
    },
  },
} as Meta<typeof EventCard>;

export const Default: StoryObj<typeof EventCard> = {
  args: {
    imageUri: 'https://media.istockphoto.com/id/826713228/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BC%D0%B0%D1%82%D1%8C-%D0%B8-%D0%B4%D0%BE%D1%87%D1%8C-%D0%B1%D0%B5%D0%B7%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%BD%D0%BE%D0%B9-%D0%BB%D1%8E%D0%B1%D0%B2%D0%B8.jpg',
    date: '20:45 25 Feb, 2025',
    title: 'Crash Drums Studio',
    description: 'Crash Drum Studio — это место, где звуки становятся настоящими, где каждый может найти своё вдохновение и воплотить свои музыкальные мечты в жизнь. Присоединяйтесь к нам и почувствуйте силу музыки!',
    organizerAvatarUri: 'https://pllace.online:5001/images/6511ee57e3578ef445159ed6/ahjq2678qem61.png',
    organizerName: 'Admin Belgrade',
    organizerLink: 'https://pllace.online/profile/6511ee57e3578ef445159ed6',
    likes: 12,
    views: 13,
    tags: [
      { label: 'event', backgroundColor: '#FFF7E5', textColor: '#D78902', borderColor: '#FFD480' },
      { label: 'place', backgroundColor: '#F3E8FF', textColor: '#8A2BE2', borderColor: '#CBA3FF' },
    ],
    
  },
  render: (args) => (
    <EventCard
      imageUri={args.imageUri}
      date={args.date}
      tags={args.tags}
      title={args.title}
      description={args.description}
      organizerAvatarUri={args.organizerAvatarUri}
      organizerName={args.organizerName}
      organizerLink={args.organizerLink}
      likes={args.likes}
      views={args.views}
    />
  ),
};