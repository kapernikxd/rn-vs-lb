import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import { commonStyles } from './commonFormStyles';

export interface ImageUploaderProps {
  name: string;
  control: any;
  label?: string;
  style?: object;
  containerStyle?: object;
  rules?: object;
  defaultValue?: string[];
  errorTextStyle?: object;
  required?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  name,
  control,
  label,
  style,
  containerStyle,
  rules = {},
  defaultValue = [],
  errorTextStyle,
  required,
}) => {
  const [imageUris, setImageUris] = useState<string[]>(defaultValue);

  const handleImagePick = async (onChange: any) => {
    if (imageUris.length >= 3) {
      alert('You can upload a maximum of 3 images');
      return;
    }

    // Запрашиваем разрешение на доступ к медиатеке
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      const updatedUris = [...imageUris, selectedImageUri];
      setImageUris(updatedUris);
      onChange(updatedUris);
    }
  };

  const handleRemoveImage = (uri: string, onChange: any) => {
    const updatedUris = imageUris.filter(imageUri => imageUri !== uri);
    setImageUris(updatedUris);
    onChange(updatedUris);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={commonStyles.label}>
        {required && <Text style={commonStyles.required}>* </Text>}
        {label}
      </Text>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TouchableOpacity
              style={[commonStyles.inputBorder, styles.uploadButton, style]}
              onPress={() => handleImagePick(onChange)}
            >
              <Text style={styles.uploadButtonText}>
                {imageUris.length < 3 ? 'Upload Image' : 'Maximum 3 images'}
              </Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {imageUris.map((uri) => (
                <View key={uri} style={styles.imageWrapper}>
                  <Image source={{ uri: uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveImage(uri, onChange)}
                  >
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {error && <Text style={[commonStyles.errorText, errorTextStyle]}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  uploadButton: {
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'black',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#ccc',
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default ImageUploader;
