// // ... твои импорты стора/навигации/утилит
// import PortfolioCarousel from './PortfolioCarousel';
// import ServicesList, { ServiceItem } from './ServicesList';
// import GalleryModal from '../../components/Specialist/GalleryModal';
// import SocialIconsRow from '../UI/Social/SocialIconsRow';
// import Hero from './Hero';
// import { SafeAreaView, ScrollView } from 'react-native';
// import DescriptionSection from '../UI/DescriptionMore';

// //
// // внутри компонента после загрузки данных:
// //
// const addressLine = info.showOnMap && info.address
//   ? info.address
//   : `${info.city || ''}${info.city && info.country ? ', ' : ''}${info.country || ''}`;

// const socialsNode = (
//   <SocialIconsRow
//     visible={{
//       tg: !!socials.tg, instagram: !!socials.instagram,
//       facebook: !!socials.facebook, vk: !!socials.vk,
//     }}
//     onPressTg={() => Linking.openURL(socials.tg!)}
//     onPressInstagram={() => Linking.openURL(socials.instagram!)}
//     onPressFacebook={() => Linking.openURL(socials.facebook!)}
//     onPressVk={() => Linking.openURL(socials.vk!)}
//   />
// );

// return (
//   <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
//     <ScrollView bounces contentContainerStyle={{ paddingBottom: sizes.xl }}>
//       <Hero
//         coverUrl={coverUrl}
//         avatarUrl={avatarUrl}
//         fullName={fullName}
//         profession={info?.profession}
//         addressLine={addressLine}
//         showOnMap={!!info.showOnMap && !!info.location}
//         onBack={goBack}
//         onShare={() => handleShareUserLink(profileStore.profile._id)}
//         onMessage={onMessage}
//         onPressMap={openMap}
//         socials={socialsNode}
//       />

//       {!!info.description && (
//         <DescriptionSection
//           text={info.description}
//           expanded={descExpanded}
//           onToggle={() => setDescExpanded((v) => !v)}
//         />
//       )}

//       {!!info.portfolioImages?.length && (
//         <PortfolioCarousel
//           images={info.portfolioImages}
//           onPressImage={(idx) => { setActiveIndex(idx); setModalVisible(true); }}
//         />
//       )}

//       {!!displayed.length && (
//         <ServicesList
//           services={displayed as ServiceItem[]}
//           total={services.length}
//           onPressService={(svc) => goToServiceDetails(svc.raw ?? svc)}
//           onPressMore={hasMore ? () => goToSpecialistUserServices(id) : undefined}
//         />
//       )}
//     </ScrollView>

//     <GalleryModal
//       visible={modalVisible}
//       images={info.portfolioImages || []}
//       initialIndex={activeIndex}
//       onRequestClose={() => setModalVisible(false)}
//     />
//   </SafeAreaView>
// );
