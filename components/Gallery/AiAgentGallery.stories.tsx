import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { ThemeProvider } from '../../theme';
import { AiAgentGalleryView } from './AiAgentGallery.pure';

type Props = React.ComponentProps<typeof AiAgentGalleryView>;

const meta: Meta<Props> = {
  title: 'Gallery/AiAgentGallery',
  component: AiAgentGalleryView,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ paddingVertical: 24 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  args: {
    galleryColumns: 3,
    galleryItemSize: 108,
    emptyTest: 'No generated images yet. Try creating one with your AI agent!',
  },
};

export default meta;

const Template: StoryFn<Props> = ({
  onOpenAt: _onOpenAt,
  onClose: _onClose,
  visible: _visible,
  initialIndex: _initialIndex,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  return (
    <AiAgentGalleryView
      {...rest}
      visible={visible}
      initialIndex={initialIndex}
      onOpenAt={(index) => {
        setInitialIndex(index);
        setVisible(true);
      }}
      onClose={() => setVisible(false)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  photos: [
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=60',
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  photos: [],
};

export const Empty = Template.bind({});
Empty.args = {
  isLoading: false,
  photos: [],
};
