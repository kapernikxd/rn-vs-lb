// stories/Chat/InputMessage.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Alert, ScrollView } from 'react-native';
import { action } from '../../utils/actions';
import { ThemeProvider } from '../../../src/theme';
import InputMessage, { ImageAsset } from '../../../src/components/Chat/InputMessage';

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
};
export default meta;

// ---- helpers ----
const useStateWrapper = (initial = '') => {
  const [value, setValue] = useState(initial);
  return { value, setValue };
};

const mockAttach = async (): Promise<ImageAsset[]> => {
  // имитируем выбор 2 картинок
  return [
    { uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60' },
    { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60' },
  ];
};

const mockSubmit = async (images?: ImageAsset[]) => {
  action('onSubmit')(images?.map((i) => i.uri) ?? []);
  await new Promise((r) => setTimeout(r, 500));
  return true;
};

// ---- templates ----
const Template: StoryFn<Props> = (args) => {
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
};

// ---- stories ----
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Message',
  maxImages: 1,
};

export const WithAttachments = Template.bind({});
WithAttachments.args = {
  placeholder: 'Attach up to 2 images',
  maxImages: 2,
  onAttachPress: async () => {
    const imgs = await mockAttach();
    action('onAttachPress')(imgs.map((i) => i.uri));
    return imgs;
  },
  onMaxImagesExceeded: (max) => Alert.alert('Max images exceeded', `Allowed: ${max}`),
};

export const ReplyMode: StoryFn = () => {
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
};

export const EditMode: StoryFn = () => {
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
};

export const SendingControlled: StoryFn = () => {
  const s = useStateWrapper('Sending...');
  const [sending, setSending] = useState(false);

  return (
    <InputMessage
      value={s.value}
      onChange={s.setValue}
      onSubmit={async (imgs) => {
        setSending(true);
        action('onSubmit')(imgs?.map((i) => i.uri) ?? []);
        await new Promise((r) => setTimeout(r, 1200));
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
};

export const ManyInputsDemo: StoryFn = () => {
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
          onChange={(t) =>
            setVals((prev) => prev.map((pv, i) => (i === idx ? t : pv)))
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
};
