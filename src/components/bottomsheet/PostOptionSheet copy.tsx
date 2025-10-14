// import React, { FC, useMemo } from "react";
// import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// import { GlobalStyleSheet } from "../../constants/styleSheet";
// import { COLORS, IMAGES } from "../../constants/theme";
// import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// interface PostOptionSheetProps {
//     sheetRef: React.RefObject<BottomSheetMethods>;
//     onClose: () => void;
// }

// const PostOptionSheet: FC<PostOptionSheetProps> = ({ sheetRef, onClose }) => {
//     const screenHeight = Dimensions.get("window").height;

//     // Вычисляем snapPoints с минимальным значением 10% для первого рендера
//     const snapPoints = useMemo(() => {
//         const percentage = (180 / screenHeight) * 100;
//         // const percentage = 100;
//         return [`${Math.max(percentage, 10)}%`];
//     }, [screenHeight]);

//     return (
//         // <GestureHandlerRootView style={styles.container}>
//             <BottomSheet
//                 ref={sheetRef}
//                 index={-1}
//                 snapPoints={snapPoints}
//                 enableDynamicSizing={false}
//                 enablePanDownToClose={true}
//                 onClose={onClose}
//                 handleStyle={{ top: 0 }}
//                 handleIndicatorStyle={{ backgroundColor: COLORS.border, width: 92 }}
//                 backgroundStyle={{ backgroundColor: COLORS.card }}
//                 backdropComponent={(props) => (
//                     <BottomSheetBackdrop {...props} disappearsOnIndex={-1} onPress={onClose}/>
//                 )}
//             >
//                 <View style={GlobalStyleSheet.container}>
//                     <TouchableOpacity style={GlobalStyleSheet.TouchableOpacity}>
//                         <Image style={GlobalStyleSheet.image} source={IMAGES.info} />
//                         <Text style={GlobalStyleSheet.text}>Report</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={GlobalStyleSheet.TouchableOpacity}>
//                         <Image style={[GlobalStyleSheet.image, { tintColor: COLORS.title }]} source={IMAGES.share2} />
//                         <Text style={[GlobalStyleSheet.text, { color: COLORS.title }]}>Share</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={GlobalStyleSheet.TouchableOpacity}>
//                         <Image style={[GlobalStyleSheet.image, { tintColor: COLORS.title }]} source={IMAGES.copylink} />
//                         <Text style={[GlobalStyleSheet.text, { color: COLORS.title }]}>Copy link</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={GlobalStyleSheet.TouchableOpacity}>
//                         <Image style={[GlobalStyleSheet.image, { tintColor: COLORS.title }]} source={IMAGES.close} />
//                         <Text style={[GlobalStyleSheet.text, { color: COLORS.title }]}>Hide post</Text>
//                     </TouchableOpacity>
//                 </View>
//             </BottomSheet>
//         // </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     bottomSheetBack: {
//         top: -1000,
//     }
// });

// export default PostOptionSheet;