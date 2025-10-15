// import React, { useState } from 'react';
// import { Meta, StoryFn } from '@storybook/react';
// import { View, Button as RNButton } from 'react-native';
// import { action } from '../../utils/actions';
// import { ModalProfilePhoto } from '../../../src/components/Profile/ModalProfilePhoto';

// const meta: Meta<React.ComponentProps<typeof ModalProfilePhoto>> = {
//   title: 'Profile/ModalProfilePhoto',
//   component: ModalProfilePhoto,
//   decorators: [
//     (Story) => (
//       <View style={{ flex: 1, minHeight: 400 }}>
//         <Story />
//       </View>
//     ),
//   ],
//   parameters: {
//     layout: 'fullscreen',
//   },
// };

// export default meta;

// const Template: StoryFn<React.ComponentProps<typeof ModalProfilePhoto>> = (args) => (
//   <ModalProfilePhoto {...args} />
// );

// export const VisibleForOwner = Template.bind({});
// VisibleForOwner.args = {
//   previewVisible: true,
//   photoUri: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=600&q=80',
//   isMe: true,
//   handleClosePreview: action('close-preview'),
//   goToEditProfileSetting: action('go-to-edit-profile'),
// };

// export const VisibleForGuest = Template.bind({});
// VisibleForGuest.args = {
//   previewVisible: true,
//   photoUri: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80',
//   isMe: false,
//   handleClosePreview: action('close-preview-guest'),
//   goToEditProfileSetting: action('go-to-edit-profile-guest'),
// };

// export const InteractiveToggle: StoryFn = () => {
//   const [visible, setVisible] = useState(false);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <RNButton title={visible ? 'Hide preview' : 'Show preview'} onPress={() => setVisible((state) => !state)} />
//       <ModalProfilePhoto
//         previewVisible={visible}
//         photoUri="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=600&q=80"
//         isMe
//         handleClosePreview={() => {
//           action('interactive-close')();
//           setVisible(false);
//         }}
//         goToEditProfileSetting={action('interactive-edit-profile')}
//       />
//     </View>
//   );
// };

// InteractiveToggle.parameters = {
//   controls: { disable: true },
// };
