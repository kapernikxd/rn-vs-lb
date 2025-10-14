import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme/theme';
import { GlobalStyleSheet } from '../../constants/theme/styleSheet';

interface MeetProfileCardProps {
  name: string;
  userName?: string;
  quote: string;
  imageUri: string;
  postCount: string;
  followersCount: string;
  followingCount: string;

}

const GradientLine: React.FC = () => {
  return (
    <>
      <View style={[styles.line, styles.right]} />
      <View style={[styles.line, styles.left]} />
    </>
  );
};


const MeetProfileCard: React.FC<MeetProfileCardProps> = ({name,userName, quote, imageUri,postCount,followersCount, followingCount }) => {
    return (
      <></>
        // <ImageBackground
        //     style={{width:'100%',height:340,borderBottomLeftRadius:25,borderBottomRightRadius:25,overflow:'hidden'}}
        //     source={IMAGES.profilebackground}
        //   >
        //     <View style={GlobalStyleSheet.container}>
        //       <View style={[GlobalStyleSheet.flexalingjust,{marginTop:10}]}>
        //         <TouchableOpacity
        //           onPress={() => console.log('goBack')}
        //         >
        //           <Image
        //             style={{ width: 18, height: 18, tintColor: '#fff' }}
        //             source={IMAGES.arrowleft}
        //           />
        //         </TouchableOpacity>
        //       <TouchableOpacity
        //         onPress={() => console.log('Settings')}
        //       >
        //           <View style={GlobalStyleSheet.background}>
        //             <Image
        //               style={[GlobalStyleSheet.image,{tintColor: COLORS.white }]}
        //               source={IMAGES.setting}
        //             />
        //           </View>
        //         </TouchableOpacity>
        //       </View>
        //     </View>
        //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        //       <View>
        //         <TouchableOpacity>
        //           <View style={{ backgroundColor:'rgba(217, 217, 217, .6)',height:110,width:110,borderRadius:100,alignItems:'center',justifyContent:'center'}}>
        //             <Image
        //                 style={{width:100,height:100,borderRadius:100}}
        //                 // source={IMAGES.profile}
        //                 source={{ uri: imageUri }}
        //             />
        //           </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity
        //           onPress={()=> console.log('EditProfile')}
        //           style={{position:'absolute',bottom:0,right:0}}
        //         >
        //           <View style={{ backgroundColor: '#001F50', width: 36, height: 36, borderRadius: 50, alignItems:'center',justifyContent:'center' }}>
        //             <View style={{ backgroundColor: '#2979F8', width: 30, height: 30, borderRadius: 50, alignItems:'center',justifyContent:'center'}}>
        //               <Image
        //                 style={{width:18,height:18,resizeMode:'contain'}}
        //                 source={IMAGES.write2}
        //               />
        //             </View>
        //           </View>
        //         </TouchableOpacity>
        //       </View>
        //       <View style={{marginTop:20,alignItems:'center'}}>
        //         <Text style={{ ...FONTS.h6, color: COLORS.white }}>{name}</Text>
        //         {userName && <Text style={{ ...FONTS.font, color: COLORS.white,opacity:.6,marginTop:5 }}>{userName}</Text>}
        //       </View>
        //     <View style={{ backgroundColor: 'rgba(255, 255, 255, .1)', height: 70, width: 300, borderRadius: 12, marginTop: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
              
        //         <View style={{ alignItems: 'center', width: '33.33%' }}>
        //           <Text style={GlobalStyleSheet.textfont2}>{postCount}</Text>
        //           <Text style={GlobalStyleSheet.titlefont}>Post</Text>
        //         </View>
        //         <View style={{ width: '33.33%' }}>
        //         <TouchableOpacity style={{ alignItems: 'center' }}
        //           onPress={() => console.log('Followers')}
        //         >
        //               <Text style={GlobalStyleSheet.textfont2}>{followersCount}</Text>
        //               <Text style={GlobalStyleSheet.titlefont}>Followers</Text>
        //           </TouchableOpacity>
        //         </View>
        //         <View style={{ width: '33.33%' }}>
        //         <TouchableOpacity style={{ alignItems: 'center', }}
        //           onPress={() => console.log('Following')}
        //         >
        //             <Text style={GlobalStyleSheet.textfont2}>{followingCount}</Text>
        //             <Text style={GlobalStyleSheet.titlefont}>Following</Text>
        //           </TouchableOpacity>
        //         </View>
              
        //         <GradientLine />
        //       </View>
        //     </View>
        // </ImageBackground>
    );
};

const styles = StyleSheet.create({
  line: {
    width: 2,
    height: 50,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  right: {
    right: 100,
  },
  left: {
    left: 100,
  },
});

export default MeetProfileCard;