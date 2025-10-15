// stories/Common/TextWithLinks.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Alert } from 'react-native';
import { action } from '@storybook/addon-actions';
import TextWithLinks, { TextWithLinksProps } from '../../../src/components/UI/TextWithLinks';

const meta: Meta<TextWithLinksProps> = {
  title: 'UI/TextWithLinks',
  component: TextWithLinks,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#f6f6f6' }}>
        <Story />
      </View>
    ),
  ],
};
export default meta;

const Template: StoryFn<TextWithLinksProps> = (args) => <TextWithLinks {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Open https://example.com or www.google.com for more info.',
};

export const CustomLinkStyle = Template.bind({});
CustomLinkStyle.args = {
  text: 'Styled links → https://developer.apple.com and www.github.com.',
  linkTextStyle: { color: '#2563eb', textDecorationLine: 'underline', fontWeight: '600' },
};

export const CustomHandler = Template.bind({});
CustomHandler.args = {
  text: 'Click here: www.pllace.su/event/123',
  onLinkPress: (url) => {
    action('onLinkPress')(url);
    Alert.alert('Custom handler', url);
  },
};

export const LongText = Template.bind({});
LongText.args = {
  text:
    'This is a very long paragraph to test wrapping and link detection. ' +
    'Visit https://reactnative.dev for docs, or try www.example.org to see if the matcher works. ' +
    'In addition, check https://expo.dev and then www.wikipedia.org for extra coverage.',
  linkTextStyle: { color: '#10b981' },
};

export const Multiline = Template.bind({});
Multiline.args = {
  text: 'First line with a link: https://news.ycombinator.com\nSecond line: www.apple.com\nThird line plain.',
};

export const NoLinks = Template.bind({});
NoLinks.args = {
  text: 'Just a plain text without any links here.',
};

export const EmptyText = Template.bind({});
EmptyText.args = {
  text: '',
};
