import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Button, FlatList, View } from 'react-native';
import GuestAiChatModalView, { type PureChatMessage } from './GuestAiChatModal';
import appTheme, { SIZES } from '../../theme/theme';
import { getTypography } from '../../theme/styles/styleSheet';

type GuestAiChatProps = React.ComponentProps<typeof GuestAiChatModalView>;

const theme = appTheme.lightTheme;
const typography = getTypography(theme);

const sampleMessages: PureChatMessage[] = [
  { id: '1', role: 'assistant', content: 'Привет! Я помогу найти событие мечты.' },
  { id: '2', role: 'user', content: 'Покажи вечеринки на выходных.' },
  {
    id: '3',
    role: 'assistant',
    content:
      'Вот несколько вариантов: концерт в субботу, гастрономический фестиваль и выставка.\nВведите уточнение, чтобы подобрать лучше.',
  },
];

const defaultLimitLabel = (remaining: number, limit: number) => `Осталось сообщений: ${remaining} / ${limit}`;

const meta = {
  title: 'Features/Modals/GuestAiChatModal',
  component: GuestAiChatModalView,
  argTypes: {
    onClose: { action: 'close modal' },
    onSend: { action: 'send message' },
    onChangeInput: { action: 'change input' },
    listRef: {
      table: {
        disable: true,
      },
    },
    theme: { table: { disable: true } },
    typography: { table: { disable: true } },
    sizes: { table: { disable: true } },
    limitLabel: { table: { disable: true } },
  },
  args: {
    visible: true,
    botName: 'AI гид',
    messages: sampleMessages,
    inputValue: '',
    error: null,
    isSending: false,
    limit: 10,
    remaining: 10,
    theme,
    typography,
    sizes: SIZES,
    defaultBotName: 'AI-бот',
    limitLabel: defaultLimitLabel,
    inputPlaceholder: 'Спросите что-нибудь...'
  },
  decorators: [
    (StoryComponent) => (
      <View
        style={{
          flex: 1,
          minHeight: 640,
          justifyContent: 'flex-end',
          backgroundColor: '#0b0b0b55',
          paddingBottom: 24,
        }}
      >
        <StoryComponent />
      </View>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Guest chat modal that lets unauthorised users ask AI-powered questions before signing in.',
      },
    },
  },
} satisfies Meta<typeof GuestAiChatModalView>;

export default meta;

const Template: StoryFn<GuestAiChatProps> = (args) => {
  const { onClose, onSend, ...rest } = args;

  const [isVisible, setIsVisible] = React.useState(rest.visible);
  const [inputValue, setInputValue] = React.useState(rest.inputValue);
  const [messages, setMessages] = React.useState<PureChatMessage[]>(rest.messages);
  const [remaining, setRemaining] = React.useState(rest.remaining);
  const [isSending, setIsSending] = React.useState(rest.isSending);
  const listRef = React.useRef<FlatList<PureChatMessage>>(null);

  React.useEffect(() => {
    setIsVisible(rest.visible);
  }, [rest.visible]);

  React.useEffect(() => {
    setInputValue(rest.inputValue);
  }, [rest.inputValue]);

  React.useEffect(() => {
    setMessages(rest.messages);
  }, [rest.messages]);

  React.useEffect(() => {
    setRemaining(rest.remaining);
  }, [rest.remaining]);

  React.useEffect(() => {
    setIsSending(rest.isSending);
  }, [rest.isSending]);

  const handleClose = React.useCallback(() => {
    setIsVisible(false);
    onClose();
  }, [onClose]);

  const handleSend = React.useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setIsSending(true);
    onSend();

    const userMessage: PureChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setRemaining((prev) => (prev === undefined ? prev : Math.max(prev - 1, 0)));

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: `Я сохранил ваш запрос: "${trimmed}". Скоро пришлю подборку!`,
        },
      ]);
      listRef.current?.scrollToEnd({ animated: true });
      setIsSending(false);
    }, 600);
  }, [inputValue, onSend]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 12, alignItems: 'center' }}>
        <Button
          title={isVisible ? 'Скрыть модалку' : 'Показать модалку'}
          onPress={() => setIsVisible((prev) => !prev)}
        />
      </View>
      <GuestAiChatModalView
        {...rest}
        visible={isVisible}
        messages={messages}
        inputValue={inputValue}
        remaining={remaining}
        isSending={isSending}
        onClose={handleClose}
        onSend={handleSend}
        onChangeInput={setInputValue}
        listRef={listRef}
      />
    </View>
  );
};

export const Playground = Template.bind({});
Playground.args = {
  visible: false,
  remaining: 5,
};

export const DefaultOpen: StoryFn<GuestAiChatProps> = {
  render: Template,
  args: {
    visible: true,
  },
};

export const WithErrorState: StoryFn<GuestAiChatProps> = (args) => (
  <GuestAiChatModalView
    {...args}
    visible
    error="Не удалось подключиться к боту, попробуйте снова."
    messages={args.messages}
    inputValue={args.inputValue}
    onChangeInput={args.onChangeInput ?? (() => undefined)}
    onSend={args.onSend ?? (() => undefined)}
    listRef={React.createRef()}
  />
);
WithErrorState.args = {
  inputValue: 'Сообщение',
  isSending: false,
};
WithErrorState.parameters = {
  controls: {
    exclude: ['listRef', 'onChangeInput', 'onSend'],
  },
};
