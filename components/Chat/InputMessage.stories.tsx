// stories/Chat/InputMessage.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Alert, ScrollView } from 'react-native';
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

const logEvent = (label: string, ...args: unknown[]) => {
  if (args.length > 0) {
    console.log(`[storybook:input-message:${label}]`, ...args);
  } else {
    console.log(`[storybook:input-message:${label}]`);
  }
};

const mockAttach = async (): Promise<ImageAsset[]> => {
  // имитируем выбор 2 картинок
  return [
    { uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60' },
    { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60' },
  ];
};

const createSubmitHandler = (delay = 500) =>
  async (images?: ImageAsset[]) => {
    logEvent('submit', images?.map((i) => i.uri) ?? []);

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return true;
  };

const submitMessage = createSubmitHandler();
const typingHandler = () => logEvent('typing');
const stopTypingHandler = () => logEvent('stop-typing');
const replyCancelHandler = () => logEvent('cancel-reply');
const editCancelHandler = () => logEvent('cancel-edit');
const attachmentLogger = (uris: string[]) => logEvent('attachments', uris);
const slowSubmitMessage = createSubmitHandler(1200);

// ---- templates ----
const Template: StoryFn<Props> = (args) => {
  const s = useStateWrapper('');
  return (
    <InputMessage
      {...args}
      value={s.value}
      onChange={s.setValue}
      onSubmit={submitMessage}
      onTyping={typingHandler}
      onStopTyping={stopTypingHandler}
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
    attachmentLogger(imgs.map((i) => i.uri));
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
      onSubmit={submitMessage}
      replyToMessage={{
        content: 'Original message preview goes here…',
        images: [],
        attachments: [],
      }}
      onCancelReply={replyCancelHandler}
      onTyping={typingHandler}
      onStopTyping={stopTypingHandler}
    />
  );
};

export const EditMode: StoryFn = () => {
  const s = useStateWrapper('Edited content…');
  return (
    <InputMessage
      value={s.value}
      onChange={s.setValue}
      onSubmit={submitMessage}
      editMessage={{ content: 'Previous message text…' }}
      onCancelEdit={editCancelHandler}
      onTyping={typingHandler}
      onStopTyping={stopTypingHandler}
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
        await slowSubmitMessage(imgs);
        setSending(false);
        return true;
      }}
      sendingControlled
      isSending={sending}
      onAttachPress={mockAttach}
      maxImages={1}
      onTyping={typingHandler}
      onStopTyping={stopTypingHandler}
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
          onSubmit={submitMessage}
          onAttachPress={idx === 0 ? mockAttach : undefined}
          maxImages={idx === 0 ? 2 : 1}
          placeholder={`Message #${idx + 1}`}
          onTyping={() => logEvent(`typing-${idx}`)}
          onStopTyping={() => logEvent(`stop-typing-${idx}`)}
        />
      ))}
    </ScrollView>
  );
};
