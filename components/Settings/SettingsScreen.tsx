import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { CardContainer, Spacer } from '../UI';
import { SizesType, ThemeType, useTheme } from '../../theme';
import SettingsRow from './SettingsRow';
import SettingsSectionTitle from './SettingsSectionTitle';

const SettingsScreen: React.FC = () => {
  const { globalStyleSheet, sizes, theme } = useTheme();
  const styles = React.useMemo(() => createStyles(theme, sizes), [theme, sizes]);

  const [toggles, setToggles] = React.useState({
    inAppBrowser: true,
    locationData: true,
    applicationData: true,
    proxyServer: false,
    saveData: false,
  });

  const handleToggle = React.useCallback((key: keyof typeof toggles) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <ScrollView
      style={[globalStyleSheet.containerPage, styles.screen]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.section}>
        <SettingsSectionTitle title="App sign-in" />
        <CardContainer style={styles.card}>
          <SettingsRow title="Passcode, fingerprint or face ID" value="Disabled" variant="value" isLast />
        </CardContainer>
      </View>

      <Spacer size="lg" />

      <View style={styles.section}>
        <SettingsSectionTitle title="Application" />
        <CardContainer style={styles.card}>
          <SettingsRow title="Font size" value="Match system" variant="value" />
          <SettingsRow title="Language" value="System" variant="value" />
          <SettingsRow
            title="In-app browser"
            description="Open external links within the app"
            variant="switch"
            switchValue={toggles.inAppBrowser}
            onSwitchChange={() => handleToggle('inAppBrowser')}
          />
          <SettingsRow
            title="Location data"
            description="Improve recommendations in the news feed"
            variant="switch"
            switchValue={toggles.locationData}
            onSwitchChange={() => handleToggle('locationData')}
          />
          <SettingsRow
            title="Application data"
            description="Improve recommendations in the news feed"
            variant="switch"
            switchValue={toggles.applicationData}
            onSwitchChange={() => handleToggle('applicationData')}
          />
          <SettingsRow
            title="Use proxy server"
            variant="switch"
            switchValue={toggles.proxyServer}
            onSwitchChange={() => handleToggle('proxyServer')}
          />
          <SettingsRow
            title="Save data"
            description="Disable video autoplay and load images in low quality"
            variant="switch"
            switchValue={toggles.saveData}
            onSwitchChange={() => handleToggle('saveData')}
          />
          <SettingsRow
            title="Default apps"
            description="Select which apps links to chats, calls and clips will open in"
            variant="link"
            onPress={() => {}}
            isLast
          />
        </CardContainer>
      </View>

      <Spacer size="xl" />
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
    card: {
      paddingHorizontal: sizes.md,
      paddingVertical: sizes.xs,
      marginBottom: 0,
      backgroundColor: theme.card,
    },
  });

export default SettingsScreen;
