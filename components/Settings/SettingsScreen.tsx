import React from 'react';
import { ScrollView, Switch, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CardContainer } from '../UI';
import { SizesType, ThemeType, useTheme } from '../../theme';
import SettingsRow from './SettingsRow';
import SettingsSectionTitle from './SettingsSectionTitle';

const SettingsScreen: React.FC = () => {
  const { globalStyleSheet, sizes, theme } = useTheme();
  const styles = React.useMemo(() => createStyles(theme, sizes), [theme, sizes]);

  const [inAppBrowser, setInAppBrowser] = React.useState(true);
  const [locationData, setLocationData] = React.useState(true);
  const [applicationData, setApplicationData] = React.useState(true);
  const [proxyServer, setProxyServer] = React.useState(false);
  const [saveData, setSaveData] = React.useState(false);

  const buildSwitch = (value: boolean, onChange: (next: boolean) => void) => (
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: theme.border, true: theme.primary }}
      thumbColor={theme.black}
      ios_backgroundColor={theme.border}
    />
  );

  return (
    <ScrollView
      style={[globalStyleSheet.containerPage, styles.screen]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.section}>
        <SettingsSectionTitle title="App sign-in" />
        <CardContainer style={styles.card}>
          <SettingsRow title="Passcode, fingerprint or face ID" value="Disabled" isLast />
        </CardContainer>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <SettingsSectionTitle title="Application" />
        <CardContainer style={styles.card}>
          <SettingsRow title="Font size" value="Match system" />
          <SettingsRow title="Language" value="System" />
          <SettingsRow
            title="In-app browser"
            description="Open external links within the app"
            rightAccessory={buildSwitch(inAppBrowser, setInAppBrowser)}
          />
          <SettingsRow
            title="Location data"
            description="Improve recommendations in the news feed"
            rightAccessory={buildSwitch(locationData, setLocationData)}
          />
          <SettingsRow
            title="Application data"
            description="Improve recommendations in the news feed"
            rightAccessory={buildSwitch(applicationData, setApplicationData)}
          />
          <SettingsRow
            title="Use proxy server"
            rightAccessory={buildSwitch(proxyServer, setProxyServer)}
          />
          <SettingsRow
            title="Save data"
            description="Disable video autoplay and load images in low quality"
            rightAccessory={buildSwitch(saveData, setSaveData)}
          />
          <SettingsRow
            title="Default apps"
            description="Select which apps links to chats, calls and clips will open in"
            rightAccessory={<MaterialIcons name="chevron-right" size={20} color={theme.placeholder} />}
            isLast
          />
        </CardContainer>
      </View>

    </ScrollView>
  );
};

const createStyles = (theme: ThemeType, sizes: SizesType) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.background,
    },
    content: {
      paddingBottom: sizes.xl,
    },
    section: {
      marginBottom: sizes.lg,
    },
    lastSection: {
      marginBottom: 0,
    },
    card: {
      paddingHorizontal: sizes.md,
      paddingVertical: sizes.xs,
      marginBottom: 0,
      backgroundColor: theme.card,
    },
  });

export default SettingsScreen;
