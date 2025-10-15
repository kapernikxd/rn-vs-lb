// stories/Common/LinkPreview.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Alert } from 'react-native';
import { ThemeProvider } from '../../theme';
import { LinkPreview } from './LinkPreview'; // ← при необходимости обнови путь

type Props = React.ComponentProps<typeof LinkPreview>;

const meta: Meta<Props> = {
  title: 'UI/LinkPreview',
  component: LinkPreview,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 16, backgroundColor: '#f6f6f6' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};
export default meta;

const Template: StoryFn<Props> = (args) => <LinkPreview {...args} />;

const linkHandlerLogger = (url: string) => {
  console.log('[storybook:link-preview:link]', url);
};
const customLinkHandler = (url: string) => {
  linkHandlerLogger(url);
  Alert.alert('Custom handler', url);
};

export const Default = Template.bind({});
Default.args = {
  url: 'https://pllace.su/event/123',
  title: 'City clean-up initiative',
  description:
    'Join our community effort to clean and revitalize the local park. All are welcome!',
  image:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=60',
};

export const WithCustomLinkHandler = Template.bind({});
WithCustomLinkHandler.args = {
  url: 'www.google.com',
  title: 'Google',
  description: 'Search the world’s information.',
  linkHandler: customLinkHandler,
};

export const NoImage = Template.bind({});
NoImage.args = {
  url: 'https://developer.apple.com',
  title: 'Apple Developer',
  description:
    'Discover the tools, documentation, and sample code you need to build apps.',
};

export const LongTitleAndDescription = Template.bind({});
LongTitleAndDescription.args = {
  url: 'https://example.com/articles/very-long-slug',
  title:
    'A very long, descriptive article title that demonstrates truncation behavior in two lines of text',
  description:
    'This description is intentionally verbose to check exactly how three-line truncation behaves in our design. It should gracefully cut off without breaking words or layout.',
  image:
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=60',
};

export const UrlOnly = Template.bind({});
UrlOnly.args = {
  url: 'pllace.su/user/42', // проверим авто-нормализацию до https://
};
