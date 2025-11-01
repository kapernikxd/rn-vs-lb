import React, { useMemo, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from '../../theme';
import HeaderDefault from '../Header/HeaderDefault';
import { HeaderHome } from '../Header/HeaderHome';
import StatusFilter, { StatusOption } from '../UI/StatusFilter/StatusFilter';
import TabBar, { TabItem } from '../UI/TabBar/TabBar';
import HorizontalCardSection, { HorizontalCard } from '../UI/HorizontalCardSection';
import EventCardList from '../Posts/EventCardList';
import PlaceCardList from '../Posts/PlaceCardList';
import ProfileSummary from '../Profile/ProfileSummary/ProfileSummary';
import ProfilePhotoBanner from '../Profile/ProfilePhotoBanner';
import UserProfileTabs, { UserProfileTab } from '../Profile/ProfileTabs/UserProfileTabs';
import {
  ChatItem,
  ChatItemProps,
  ChatTabs,
  InputMessage,
  MessageItem,
  PinnedMessagesBar,
  type MessageItemProps,
} from '../Chat';
import type { MessageDTO as TransportMessageDTO } from '../../types/message';
import Spacer from '../UI/Spacer';

const meta: Meta = {
  title: 'Screens/Compositions/AppScreens',
  component: () => null,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={styles.previewBackground}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryFn;

const ScreenSurface: React.FC<React.PropsWithChildren<{ background?: string }>> = ({ children, background = '#f5f6f8' }) => (
  <View style={styles.screenWrapper}>
    <View style={[styles.screenSurface, { backgroundColor: background }]}>{children}</View>
  </View>
);

type EventCardData = {
  imageUri: string;
  date: string;
  title: string;
  description: string;
  isInvitation: boolean;
  participantsCount?: number;
  maxParticipants?: number;
};

type PlaceCardData = {
  imageUri: string;
  title: string;
  description: string;
};

const storyHighlights: HorizontalCard[] = [
  {
    id: '1',
    title: 'City clean-up day',
    image: { uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80' },
  },
  {
    id: '2',
    title: 'Street art workshop',
    image: { uri: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&q=80' },
  },
  {
    id: '3',
    title: 'Local farmer market',
    image: { uri: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=400&q=80' },
  },
];

const eventFeed: EventCardData[] = [
  {
    imageUri: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=800&q=80',
    date: 'Tomorrow · 19:00',
    title: 'Community jazz evening',
    description: 'Bring your instrument or just enjoy. Open jam session with local musicians.',
    isInvitation: true,
    participantsCount: 24,
    maxParticipants: 40,
  },
  {
    imageUri: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    date: 'Sat, 12 Oct · 10:00',
    title: 'Kids science fair',
    description: 'Interactive experiments, robotics corner and eco-workshops for the whole family.',
    isInvitation: false,
    participantsCount: 75,
    maxParticipants: 120,
  },
];

const placeFeed: PlaceCardData[] = [
  {
    imageUri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    title: 'Neighbourhood brunch spot',
    description: 'Seasonal menu, rooftop seating and a cosy corner for remote work sessions.',
  },
  {
    imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    title: 'Artisan bakery & coffee',
    description: 'Fresh sourdough every morning, latte art classes on weekends and playlists curated by DJs.',
  },
];

const profileStats = [
  { label: 'Followers', value: '4 812' },
  { label: 'Following', value: '326' },
  { label: 'Projects', value: 48 },
];

const chatPreviewItems: ChatItemProps[] = [
  {
    variant: 'person',
    senderFullName: 'Alex Johnson',
    imgUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60',
    isUserOnline: true,
    lastMessage: 'See you at the community hub in 10?',
    createdAt: '10:42',
    unread: '+',
  },
  {
    variant: 'group',
    chatName: 'Organizers',
    senderFullName: 'Nora',
    imgUrl: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=200&q=60',
    lastMessage: 'Deck updated with logistics timeline.',
    createdAt: '09:15',
    unread: '+',
  },
  {
    variant: 'bot',
    chatName: 'Event summary bot',
    lastMessage: 'Digest for yesterday is ready. Tap to open.',
    createdAt: '08:00',
  },
  {
    variant: 'person',
    senderFullName: 'Jess Carter',
    imgUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60',
    isUserOnline: false,
    lastMessage: 'Uploading the press photos tonight.',
    createdAt: 'Yesterday',
  },
];

const getChatPreviewLabel = (item: ChatItemProps) =>
  item.variant === 'person' ? item.chatName ?? item.senderFullName : item.chatName;

const conversationMessages: MessageItemProps['item'][] = [
  {
    _id: 'm-1',
    sender: { _id: 'alex', fullName: 'Alex Johnson' },
    content: 'Hey! Quick reminder that the venue opens at 18:30. Need help with setup?',
    createdAt: '18:02',
  },
  {
    _id: 'm-2',
    sender: { _id: 'me', fullName: 'You' },
    content: 'All good! Flyers are printed and the volunteer brief is in the shared folder.',
    createdAt: '18:05',
    isEdited: true,
  },
  {
    _id: 'm-3',
    sender: { _id: 'alex', fullName: 'Alex Johnson' },
    content: 'Legend. Dropping the floor plan here 👉 https://example.com/layout',
    createdAt: '18:06',
  },
  {
    _id: 'm-4',
    sender: { _id: 'alex', fullName: 'Alex Johnson' },
    images: ['https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80'],
    content: 'Stage lighting looks like this right now.',
    createdAt: '18:07',
  },
  {
    _id: 'm-5',
    sender: { _id: 'me', fullName: 'You' },
    content: 'Perfect, thanks! I will pin the checklist so everyone sees it.',
    createdAt: '18:08',
    replyTo: {
      _id: 'm-1',
      sender: { _id: 'alex', fullName: 'Alex Johnson' },
      content: 'Hey! Quick reminder that the venue opens at 18:30. Need help with setup?',
    },
  },
];

const pinnedConversationMessages: TransportMessageDTO[] = conversationMessages.slice(0, 3).map((message) => {
  const mapped: TransportMessageDTO = {
    _id: message._id,
    sender: { _id: message.sender._id },
    content: message.content ?? '',
    createdAt: message.createdAt ?? '',
    readBy: ['me'],
    isEdited: !!message.isEdited,
  };

  if (message.images?.length) {
    mapped.images = message.images;
  }

  if (message.attachments?.length) {
    mapped.attachments = message.attachments;
  }

  if (message.replyTo) {
    mapped.replyTo = {
      _id: message.replyTo._id,
      sender: { _id: message.replyTo.sender?._id ?? 'unknown' },
      content: message.replyTo.content ?? '',
      createdAt: '',
      readBy: ['me'],
      isEdited: false,
      images: message.replyTo.images,
      attachments: message.replyTo.attachments,
    };
  }

  return mapped;
});

const useScreenPadding = () => {
  const { sizes } = useTheme();
  return useMemo(() => ({ paddingHorizontal: sizes.md, paddingBottom: sizes.lg }), [sizes]);
};

export const HomeFeed: Story = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<StatusOption['key']>('all');
  const padding = useScreenPadding();

  const tabs: TabItem[] = [
    { key: 'feed', label: 'Events', icon: 'event' },
    { key: 'places', label: 'Places', icon: 'place' },
    { key: 'news', label: 'News', icon: 'article' },
    { key: 'tasks', label: 'Tasks', icon: 'check-circle' },
  ];

  const statusOptions: StatusOption[] = [
    { key: 'all', label: 'All' },
    { key: 'today', label: 'Today' },
    { key: 'weekend', label: 'Weekend' },
    { key: 'foryou', label: 'For you' },
  ];

  return (
    <ScreenSurface>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, padding]}
      >
        <Spacer size="sm" />
        <HeaderHome
          logo={<Text style={styles.logo}>CityLife</Text>}
          onPressCity={() => console.log('city')}
          onPressMap={() => console.log('map')}
          onPress={() => console.log('filters')}
          onPressSpecialists={() => console.log('specialists')}
          specialistsActive={activeTab === 3}
        />

        <StatusFilter
          selectedStatus={selectedStatus}
          onChangeStatus={setSelectedStatus}
          options={statusOptions}
          type="rounded"
        />

        <HorizontalCardSection
          title="Highlights nearby"
          cards={storyHighlights}
          onPressSeeAll={() => console.log('see all highlights')}
        />

        <TabBar activeTabIndex={activeTab} onChangeTab={setActiveTab} tabs={tabs} />

        <View style={styles.feedSection}>
          {activeTab === 1
            ? placeFeed.map((card, index) => (
                <PlaceCardList
                  key={`place-${index}`}
                  imageUri={card.imageUri}
                  title={card.title}
                  description={card.description}
                />
              ))
            : eventFeed.map((card, index) => (
                <EventCardList
                  key={`event-${index}`}
                  imageUri={card.imageUri}
                  date={card.date}
                  title={card.title}
                  description={card.description}
                  isInvitation={card.isInvitation}
                  participantsCount={card.participantsCount}
                  maxParticipants={card.maxParticipants}
                />
              ))}
        </View>
      </ScrollView>
    </ScreenSurface>
  );
};

export const ProfilePublic: Story = () => {
  const [activeTab, setActiveTab] = useState<UserProfileTab>('events');
  const padding = useScreenPadding();

  return (
    <ScreenSurface>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, padding]}>
        <ProfileSummary
          avatarUri="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
          name="Maria Ortega"
          username="@maria.designs"
          stats={profileStats}
          website="maria.designs/community"
          showAddButton={false}
          onAvatarPress={() => console.log('open avatar')}
          onEditPress={() => console.log('edit profile')}
        />

        <UserProfileTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        <View style={styles.feedSection}>
          {activeTab === 'events'
            ? eventFeed.map((card, index) => (
                <EventCardList
                  key={`profile-event-${index}`}
                  imageUri={card.imageUri}
                  date={card.date}
                  title={card.title}
                  description={card.description}
                  isInvitation={false}
                  maxParticipants={card.maxParticipants}
                  participantsCount={card.participantsCount}
                />
              ))
            : placeFeed.map((card, index) => (
                <PlaceCardList
                  key={`profile-place-${index}`}
                  imageUri={card.imageUri}
                  title={card.title}
                  description={card.description}
                />
              ))}
        </View>
      </ScrollView>
    </ScreenSurface>
  );
};

export const ProfileOwner: Story = () => {
  const [activeTab, setActiveTab] = useState<UserProfileTab>('events');
  const padding = useScreenPadding();

  return (
    <ScreenSurface>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, padding]}>
        <ProfilePhotoBanner
          message="Add a cover photo so neighbours recognise your projects faster."
          buttonText="Upload cover"
          onAddPhoto={() => console.log('add photo')}
          onClose={() => console.log('dismiss banner')}
        />

        <ProfileSummary
          avatarUri="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80"
          name="You"
          username="@city.creator"
          stats={profileStats}
          onAvatarPress={() => console.log('change avatar')}
          onAddPress={() => console.log('add avatar')}
          onEditPress={() => console.log('edit profile')}
          editLabel="Edit profile"
        />

        <UserProfileTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        <View style={styles.feedSection}>
          {activeTab === 'events'
            ? eventFeed.map((card, index) => (
                <EventCardList
                  key={`owner-event-${index}`}
                  imageUri={card.imageUri}
                  date={card.date}
                  title={card.title}
                  description={card.description}
                  isInvitation={index === 0}
                  maxParticipants={card.maxParticipants}
                  participantsCount={card.participantsCount}
                />
              ))
            : placeFeed.map((card, index) => (
                <PlaceCardList
                  key={`owner-place-${index}`}
                  imageUri={card.imageUri}
                  title={card.title}
                  description={card.description}
                />
              ))}
        </View>
      </ScrollView>
    </ScreenSurface>
  );
};

export const ChatList: Story = () => {
  const [activeTab, setActiveTab] = useState<'person' | 'group' | 'bot'>('person');
  const [botSubTab, setBotSubTab] = useState<'my' | 'others'>('my');
  const padding = useScreenPadding();

  return (
    <ScreenSurface>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, padding]}
      >
        <HeaderDefault title="Messages" onBackPress={() => console.log('back')} />

        <ChatTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          hasUnreadPrivate
          hasUnreadGroup
          hasUnreadBot
          showBotSubTabs
          activeBotSubTab={botSubTab}
          onChangeBotSubTab={setBotSubTab}
        />

        <View style={[styles.feedSection, { paddingTop: 8 }]}>
          {chatPreviewItems
            .filter((item) =>
              activeTab === 'bot'
                ? item.variant === 'bot'
                : activeTab === 'group'
                ? item.variant === 'group'
                : item.variant !== 'bot'
            )
            .map((item, index) => (
              <ChatItem
                key={`${item.variant}-${index}`}
                {...item}
                onPress={() => console.log('open chat', getChatPreviewLabel(item))}
              />
            ))}
        </View>
      </ScrollView>
    </ScreenSurface>
  );
};

export const Conversation: Story = () => {
  const [messageValue, setMessageValue] = useState('');
  const padding = useScreenPadding();

  return (
    <ScreenSurface background="#eef1f6">
      <View style={[styles.conversationContainer, padding]}>
        <HeaderDefault title="Alex Johnson" onBackPress={() => console.log('back')} />

        <PinnedMessagesBar
          pinnedMessages={pinnedConversationMessages}
          onUnpin={(id) => console.log('unpin', id)}
          onPress={(id) => console.log('open pinned message', id)}
          isGroupChat={false}
          myId="me"
          lastReadMessageIdOpponent={null}
          fixedItemHeight={84}
        />

        <ScrollView
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
        >
          <Spacer size="sm" />
          {conversationMessages.map((item) => (
            <MessageItem
              key={item._id}
              item={item}
              myId="me"
              isGroupChat={false}
              isReadByOpponent={item.sender._id === 'me'}
              linkHandler={(url) => console.log('open link', url)}
              timeText={item.createdAt}
            />
          ))}
        </ScrollView>

        <InputMessage
          value={messageValue}
          onChange={setMessageValue}
          placeholder="Write a message"
          editingLabel="Editing"
          onSubmit={async () => {
            console.log('send message', messageValue);
            setMessageValue('');
            return true;
          }}
          onAttachPress={async () => []}
        />
      </View>
    </ScreenSurface>
  );
};

const styles = StyleSheet.create({
  previewBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
    paddingVertical: 32,
  },
  screenWrapper: {
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: 16,
  },
  screenSurface: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    minHeight: 720,
  },
  scrollContent: {
    paddingTop: 16,
    gap: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
  },
  feedSection: {
    gap: 12,
    paddingBottom: 32,
  },
  conversationContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    gap: 12,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingHorizontal: 8,
    paddingBottom: 12,
    gap: 12,
  },
});

