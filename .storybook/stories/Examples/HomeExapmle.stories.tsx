// import React from 'react';
// import { Meta, Story } from '@storybook/react';
// import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
// import { BottomTab } from '../../../src/components/footer';
// import { HeaderHome } from '../../../src/components/header';
// import { GlobalStyleSheet } from '../../../src/constants/styleSheet';
// import { COLORS } from '../../../src/constants/theme';
// import { EventCard } from '../../../src/components/eventCard';
// import Logo from '../../../src/assets/images/logo.svg';

// const CARDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// const HomeExample = () => {
//     const handleUpdateProfile = () => {
//         console.log('Update Profile Pressed');
//     };

//     const handleCancel = () => {
//         console.log('Cancel Pressed');
//     };

//     const scrollRef = React.useRef();

//     return (
//         <View style={styles.container}>
//             <View style={styles.inner}>
//                 <HeaderHome logo={Logo}/>
//             </View>
//             <ScrollView
//                 scrollEventThrottle={16}
//                 // onScroll={(e) => scrollRef.current.handleScroll(e)}
//                 showsVerticalScrollIndicator={false}>
//                 <View style={styles.content}>
//                     <>
//                         {CARDS.map((card, i) => {
//                             return (
//                                 <EventCard
//                                     key={i}
//                                     imageUri={'https://pllace.online:5001/images/6511ee57e3578ef445159ed6/posts/65c7ae1354def36407b72362/DSC_8251.jpg'}
//                                     date={'20:45 25 Feb, 2025'}
//                                     title={'Crash Drums Studio'}
//                                     description={'Crash Drum Studio — это место, где звуки становятся настоящими, где каждый может найти своё вдохновение и воплотить свои музыкальные мечты в жизнь. Присоединяйтесь к нам и почувствуйте силу музыки!'}
//                                     organizerAvatarUri={'https://pllace.online:5001/images/6511ee57e3578ef445159ed6/ahjq2678qem61.png'}
//                                     organizerName={'Admin Belgrade'}
//                                     organizerLink={'https://pllace.online/profile/6511ee57e3578ef445159ed6'}
//                                     likes={12}
//                                     views={13}
//                                     tags={[
//                                         { label: 'event', backgroundColor: '#FFF7E5', textColor: '#D78902', borderColor: '#FFD480' },
//                                     ]} />
//                             )
//                         })}
//                     </>
//                 </View>
//             </ScrollView>
//             <BottomTab />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//     },
//     inner: {
//         paddingTop: 4,
//         paddingBottom: 4,
//         paddingLeft: 10,
//         paddingRight: 10,
//     },
//     content: {
//         flex: 1,
//         backgroundColor: '#f0f0f0',
//         padding: 0,
//         margin:0,
//     },
// });

// export default {
//     title: 'Examples/HomeExample',
//     component: HomeExample,
// } as Meta;

// const Template: Story = () => <HomeExample />;

// export const Default = Template.bind({});
// Default.args = {};