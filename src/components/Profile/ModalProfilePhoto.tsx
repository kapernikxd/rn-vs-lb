import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { ThemeType, useTheme, CommonStylesType } from '../../theme';

interface ModalProfilePhoto {
    previewVisible: boolean;
    handleClosePreview: () => void;
    photoUri: string;
    isMe: boolean;
    goToEditProfileSetting: () => void;
}

export const ModalProfilePhoto: React.FC<ModalProfilePhoto> = ({
    previewVisible,
    handleClosePreview,
    photoUri,
    isMe,
    goToEditProfileSetting,
}) => {
    const { theme, commonStyles } = useTheme();
    const styles = getStyles({ commonStyles, theme });

    const handleEditProfile = () => {
        goToEditProfileSetting();
        handleClosePreview();
    };

    return (
        <Modal visible={previewVisible} transparent animationType="fade" onRequestClose={handleClosePreview}>
            <TouchableWithoutFeedback onPress={handleClosePreview}>
                <View style={styles.modalContainer}>
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: photoUri }} style={styles.fullImage} />
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleClosePreview}>
                        <Icon name="close" size={24} color={theme.white} />
                    </TouchableOpacity>

                    {isMe && (
                        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                            <Icon name="pencil" size={24} color={theme.white} />
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const getStyles = ({
    commonStyles,
    theme,
}: {
    commonStyles: CommonStylesType;
    theme: ThemeType;
}) =>
    StyleSheet.create({
        modalContainer: {
            flex: 1,
            ...commonStyles.backgroundRGBA,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageWrapper: {
            borderRadius: 8,
            overflow: 'hidden',
        },
        fullImage: {
            width: 300,
            height: 500,
            resizeMode: 'contain',
        },
        closeButton: {
            position: 'absolute',
            top: 40,
            right: 20,
            backgroundColor: theme.backgroundSemiTransparent,
            borderRadius: 20,
            padding: 6,
        },
        editButton: {
            position: 'absolute',
            top: 40,
            left: 20,
            backgroundColor: theme.backgroundSemiTransparent,
            borderRadius: 20,
            padding: 6,
        },
    });
