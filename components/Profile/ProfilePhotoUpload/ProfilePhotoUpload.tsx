import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export type ProfilePhotoUploadProps = {
  imageUri: string | null;

  /** Превью (контролируемый режим) */
  previewVisible?: boolean;
  onRequestOpenPreview?: () => void;
  onRequestClosePreview?: () => void;

  /** Клики по кнопкам */
  onPressSelect?: () => void;
  onPressRemove?: () => void;
  onPressEye?: () => void;

  /** Внешние стили/цвета */
  style?: ViewStyle;
  colors?: {
    bgDark?: string;
    overlay?: string;
    primary?: string;
    textMuted?: string;
    white?: string;
  };

  /** Размер квадрата */
  size?: number;

  /** Оверлей и его авто-скрытие */
  enableOverlay?: boolean;
  autoHideMs?: number; // по умолчанию 1000
};

const DEFAULT_COLORS = {
  bgDark: '#222428',
  overlay: 'rgba(0,0,0,0.45)',
  primary: '#6f2da8',
  textMuted: 'rgba(255,255,255,0.65)',
  white: '#fff',
};

export const ProfilePhotoUpload: FC<ProfilePhotoUploadProps> = ({
  imageUri,
  previewVisible,
  onRequestOpenPreview,
  onRequestClosePreview,
  onPressSelect,
  onPressRemove,
  onPressEye,
  style,
  colors,
  size = 180,
  enableOverlay = true,
  autoHideMs = 1000,
}) => {
  const c = { ...DEFAULT_COLORS, ...(colors || {}) };
  const s = makeStyles(c, size);

  const [overlay, setOverlay] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleHide = () => {
    clearTimer();
    if (autoHideMs > 0) {
      timerRef.current = setTimeout(() => {
        setOverlay(false);
        timerRef.current = null;
      }, autoHideMs);
    }
  };

  const showOverlay = () => {
    if (!enableOverlay) return;
    setOverlay(true);
    scheduleHide();
  };

  const toggleOverlay = () => {
    if (!enableOverlay) return;
    setOverlay((v) => {
      const next = !v;
      clearTimer();
      if (next) scheduleHide();
      return next;
    });
  };

  const openPreview = () => {
    onRequestOpenPreview?.();
    // пока открыт превью — нет смысла держать оверлей
    setOverlay(false);
    clearTimer();
  };

  const closePreview = () => {
    onRequestClosePreview?.();
  };

  // Чистим таймер при размонтировании
  useEffect(() => clearTimer, []);

  // Если картинка пропала — прячем оверлей
  useEffect(() => {
    if (!imageUri) {
      setOverlay(false);
      clearTimer();
    }
  }, [imageUri]);

  return (
    <View style={[s.container, style]}>
      {/* Превью */}
      <Modal transparent visible={!!previewVisible} onRequestClose={closePreview} animationType="fade">
        <Pressable style={s.modalBg} onPress={closePreview}>
          <View style={s.modalContent}>
            {imageUri ? <Image source={{ uri: imageUri }} style={s.fullImage} resizeMode="contain" /> : null}
            <TouchableOpacity style={s.closeButton} onPress={closePreview} accessibilityRole="button">
              <Icon name="close" size={24} color={c.white} />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <View style={s.photoContainer}>
        {imageUri ? (
          <TouchableOpacity
            activeOpacity={1}
            style={s.imageWrapper}
            onPress={toggleOverlay}
            onLongPress={showOverlay}
            delayLongPress={200}
          >
            <Image source={{ uri: imageUri }} style={s.photo} />
            {enableOverlay && overlay && (
              <View style={s.overlay}>
                <TouchableOpacity
                  style={s.iconBtn}
                  onPress={() => {
                    onPressEye?.();
                    openPreview();
                  }}
                  onPressIn={() => scheduleHide()} // чуть продлеваем таймер при взаимодействии
                >
                  <Icon name="eye" size={24} color={c.white} />
                </TouchableOpacity>

                <View style={{ width: 16 }} />

                <TouchableOpacity
                  style={s.iconBtn}
                  onPress={() => {
                    onPressRemove?.();
                    setOverlay(false);
                    clearTimer();
                  }}
                  onPressIn={() => scheduleHide()}
                >
                  <Icon name="delete" size={24} color={c.white} />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={s.placeholder}>
            <Text style={s.placeholderText}>{size} × {size}</Text>
            <TouchableOpacity style={s.cameraButton} onPress={onPressSelect}>
              <Icon name="camera" size={24} color={c.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

function makeStyles(c: Required<ProfilePhotoUploadProps['colors']>, size: number) {
  return StyleSheet.create<{
    container: ViewStyle;
    photoContainer: ViewStyle;
    imageWrapper: ViewStyle;
    photo: ImageStyle;
    placeholder: ViewStyle;
    placeholderText: TextStyle;
    cameraButton: ViewStyle;
    overlay: ViewStyle;
    iconBtn: ViewStyle;
    modalBg: ViewStyle;
    modalContent: ViewStyle;
    fullImage: ImageStyle;
    closeButton: ViewStyle;
  }>({
    container: { alignItems: 'center', marginVertical: 16 },
    photoContainer: { width: size, height: size, position: 'relative' },
    imageWrapper: { flex: 1 },
    photo: { width: '100%', height: '100%', borderRadius: 8, resizeMode: 'cover' },
    placeholder: {
      width: '100%', height: '100%', borderRadius: 8,
      backgroundColor: c.bgDark, alignItems: 'center', justifyContent: 'center',
    },
    placeholderText: { color: c.textMuted, marginBottom: 8 },
    cameraButton: {
      position: 'absolute', bottom: 8, right: 8,
      backgroundColor: c.primary, borderRadius: 20, padding: 8,
    },
    overlay: {
      position: 'absolute', inset: 0 as unknown as number,
      backgroundColor: c.overlay, borderRadius: 8,
      alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
    },
    iconBtn: { padding: 8 },
    modalBg: {
      flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
      alignItems: 'center', justifyContent: 'center', padding: 16,
    },
    modalContent: {
      width: '90%', borderRadius: 8, overflow: 'hidden',
      backgroundColor: 'rgba(0,0,0,0.75)', alignItems: 'center', justifyContent: 'center',
      padding: 8,
    },
    fullImage: { width: '100%', height: 420 },
    closeButton: { position: 'absolute', top: 8, right: 8 },
  });
}

export default ProfilePhotoUpload;
