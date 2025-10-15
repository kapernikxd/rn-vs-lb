import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Spacer from './Spacer';
import { ThemeType, useTheme } from '../../theme';
import { Button } from '../Button';

type Props = {
  goBack?: () => void;
}

const DeletedState: FC<Props> = ({ goBack }) => {
  const { theme, commonStyles, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Ionicons name="file-tray-outline" size={50} color={theme.placeholder} />
      <Spacer size='xxs' />
      <Text style={[typography.titleH6Regular, { color: theme.placeholder }]}>Deleted</Text>
      <Spacer size='lg' />
      {goBack && <Button onPress={goBack} type='gray-outline' title='Go back' textStyle={[typography.body, { color: theme.greyText }]} />}
    </View>
  );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    padding: 30,
  },
  reverted: {
    transform: [{ scaleY: -1 }]
  },
});

export default DeletedState;
