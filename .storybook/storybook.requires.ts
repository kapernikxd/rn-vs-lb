import { configure } from "@storybook/react-native";

declare const module: { hot?: { accept: () => void } };
declare const require: (path: string) => unknown;

const stories = [
  "./stories/Button/DeleteAccountButton.stories",
  "./stories/Button/PostButton.stories",
  "./stories/Button/TelegramFeedbackLink.stories",
  "./stories/Button/UIButton.stories",
  "./stories/Cards/EventCard.stories",
  "./stories/Cards/PlaceCard.stories",
  "./stories/Chat/ChatItem.stories",
  "./stories/Chat/InputMessage.stories",
  "./stories/Chat/MessageItem.stories",
  "./stories/Chat/PinnedMessagesBar.stories",
  "./stories/Header/HeaderDefault.stories",
  "./stories/Header/HeaderEdit.stories",
  "./stories/Header/HeaderHome.stories",
  "./stories/Header/HeaderSwitcher.stories",
  "./stories/Header/HeaderWithImg.stories",
  "./stories/Modals/ReportModal.stories",
  "./stories/Poll/CommentItem.stories",
  "./stories/Poll/PollCardList.stories",
  "./stories/Posts/EventCardList.stories",
  "./stories/Posts/PlaceCardList.stories",
  "./stories/Profile/ModalProfilePhoto.stories",
  "./stories/Profile/ProfilePhotoBanner.stories",
  "./stories/Tooltip/DangerTooltip.stories",
  "./stories/Tooltip/InfoTooltip.stories",
  "./stories/Tooltip/InfoTooltipBase.stories",
  "./stories/Tooltip/SucceedTooltip.stories",
  "./stories/Tooltip/WarningTooltip.stories",
  "./stories/UI/CardContainer.stories",
  "./stories/UI/DeletedState.stories",
  "./stories/UI/DetailsCard/AddressBlock.stories",
  "./stories/UI/DetailsCard/IconLabel.stories",
  "./stories/UI/DetailsCard/InfoNotification.stories",
  "./stories/UI/DetailsCard/PriceBlock.stories",
  "./stories/UI/Dot.stories",
  "./stories/UI/EmptyState.stories",
  "./stories/UI/Hr.stories",
  "./stories/UI/LinkPreview.stories",
  "./stories/UI/ListBlockItem.stories",
  "./stories/UI/ListItem.stories",
  "./stories/UI/LoadingScreen.stories",
  "./stories/UI/NoAuth.stories",
  "./stories/UI/ParticipantItem.stories",
  "./stories/UI/Social/SocialStatsEvent.stories",
  "./stories/UI/Social/SocialStatsPlace.stories",
  "./stories/UI/Spacer.stories",
  "./stories/UI/TextWithLinks.stories",
  "./stories/UI/ThemeSwitcher.stories",
  "./stories/UI/ThreeDotsMenu.stories",
  "./stories/UI/TripleSwitch.stories",
  "./stories/UserCards/Organizer.stories",
  "./stories/UserCards/SpecialistCard.stories",
  "./stories/UserCards/UserProfileCard.stories",
  "./stories/UserCards/UserRow.stories",
] as const;

configure(() => {
  stories.forEach((story) => {
    require(story);
  });
}, module);
