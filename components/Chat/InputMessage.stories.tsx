// components/Chat/InputMessage.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Alert, ScrollView } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '../../theme';
import InputMessage, { ImageAsset } from './InputMessage';

type Props = React.ComponentProps<typeof InputMessage>;

const meta: Meta<Props> = {
  title: 'Chat/InputMessage',
  component: InputMessage,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 16, backgroundColor: '#f6f6f6' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof InputMessage>;

export default meta;

const useStateWrapper = (initial = '') => {
  const [value, setValue] = useState(initial);
  return { value, setValue };
};

const mockAttach = async (): Promise<ImageAsset[]> => [
  {
    uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60',
  },
  {
    uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
  },
];

const mockSubmit = async (images?: ImageAsset[]) => {
  action('onSubmit')(images?.map((i) => i.uri) ?? []);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
};

type Story = StoryObj<typeof InputMessage>;

export const Default: Story = {
  render: (args) => {
    const s = useStateWrapper('');
    return (
      <InputMessage
        {...args}
        value={s.value}
        onChange={s.setValue}
        onSubmit={mockSubmit}
        onTyping={action('onTyping')}
        onStopTyping={action('onStopTyping')}
      />
    );
  },
  args: {
    placeholder: 'Message',
    maxImages: 1,
  },
};

export const WithAttachments: Story = {
  render: (args) => {
    const s = useStateWrapper('');
    return (
      <InputMessage
        {...args}
        value={s.value}
        onChange={s.setValue}
        onSubmit={mockSubmit}
        onTyping={action('onTyping')}
        onStopTyping={action('onStopTyping')}
      />
    );
  },
  args: {
    placeholder: 'Attach up to 2 images',
    maxImages: 2,
    onAttachPress: async () => {
      const imgs = await mockAttach();
      action('onAttachPress')(imgs.map((i) => i.uri));
      return imgs;
    },
    onMaxImagesExceeded: (max) => Alert.alert('Max images exceeded', `Allowed: ${max}`),
  },
};

export const ReplyMode: Story = {
  render: () => {
    const s = useStateWrapper('Thanks for the info!');
    return (
      <InputMessage
        value={s.value}
        onChange={s.setValue}
        onSubmit={mockSubmit}
        replyToMessage={{
          content: 'Original message preview goes here…',
          images: [],
          attachments: [],
        }}
        onCancelReply={action('onCancelReply')}
        onTyping={action('onTyping')}
        onStopTyping={action('onStopTyping')}
      />
    );
  },
};

export const EditMode: Story = {
  render: () => {
    const s = useStateWrapper('Edited content…');
    return (
      <InputMessage
        value={s.value}
        onChange={s.setValue}
        onSubmit={mockSubmit}
        editMessage={{ content: 'Previous message text…' }}
        onCancelEdit={action('onCancelEdit')}
        onTyping={action('onTyping')}
        onStopTyping={action('onStopTyping')}
      />
    );
  },
};

export const SendingControlled: Story = {
  render: () => {
    const s = useStateWrapper('Sending...');
    const [sending, setSending] = useState(false);

    return (
      <InputMessage
        value={s.value}
        onChange={s.setValue}
        onSubmit={async (imgs) => {
          setSending(true);
          action('onSubmit')(imgs?.map((i) => i.uri) ?? []);
          await new Promise((resolve) => setTimeout(resolve, 1200));
          setSending(false);
          return true;
        }}
        sendingControlled
        isSending={sending}
        onAttachPress={mockAttach}
        maxImages={1}
        onTyping={action('onTyping')}
        onStopTyping={action('onStopTyping')}
      />
    );
  },
};

export const ManyInputsDemo: Story = {
  render: () => {
    const [vals, setVals] = useState<string[]>(Array.from({ length: 3 }, () => ''));

    return (
      <ScrollView
        style={{ maxHeight: 640, backgroundColor: '#f6f6f6' }}
        contentContainerStyle={{ gap: 16 }}
      >
        {vals.map((v, idx) => (
          <InputMessage
            key={idx}
            value={v}
            onChange={(text) =>
              setVals((prev) => prev.map((pv, i) => (i === idx ? text : pv)))
            }
            onSubmit={mockSubmit}
            onAttachPress={idx === 0 ? mockAttach : undefined}
            maxImages={idx === 0 ? 2 : 1}
            placeholder={`Message #${idx + 1}`}
            onTyping={action(`onTyping[${idx}]`)}
            onStopTyping={action(`onStopTyping[${idx}]`)}
          />
        ))}
      </ScrollView>
    );
  },
};
