// stories/Profile/ModalProfilePhoto.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Button } from 'react-native';
import { ModalProfilePhoto } from './ModalProfilePhoto'; // <-- проверь путь!

const meta = {
  title: 'Features/Profile/ModalProfilePhoto',
  component: ModalProfilePhoto,
  argTypes: {
    handleClosePreview: { action: 'handleClosePreview' },
    goToEditProfileSetting: { action: 'goToEditProfileSetting' },
  },
  args: {
    photoUri: 'https://picsum.photos/seed/profile-photo/800/1200',
  },
} satisfies Meta<typeof ModalProfilePhoto>;

export default meta;
type S = StoryObj<typeof ModalProfilePhoto>;

/** Вспомогательный враппер: держим локальный стейт и вызываем action-коллбэки из args */
function ModalDemo(props: React.ComponentProps<typeof ModalProfilePhoto> & {
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
    props.onOpen?.();
  };
  const closeModal = () => {
    setOpen(false);
    props.handleClosePreview?.(); // попадёт в Actions
  };
  const goEdit = () => {
    props.goToEditProfileSetting?.(); // попадёт в Actions
    setOpen(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <Button title="Open preview" onPress={openModal} />
      <ModalProfilePhoto
        {...props}
        previewVisible={open}
        handleClosePreview={closeModal}
        goToEditProfileSetting={goEdit}
      />
    </View>
  );
}

/** Кейс: чужой профиль (кнопка edit скрыта) */
export const Viewer: S = {
  render: (args) => <ModalDemo {...args} isMe={false} />,
};

/** Кейс: мой профиль (появляется кнопка edit) */
export const MeWithEdit: S = {
  render: (args) => <ModalDemo {...args} isMe={true} />,
};
