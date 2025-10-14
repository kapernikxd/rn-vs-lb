import React from 'react';
import { Meta, Story } from '@storybook/react';
import PostOptionSheet from '../../../src/components/bottomsheet/PostOptionSheet';
import { Button, StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from '../../../src/constants/theme/theme';

const PostOptionSheetExample = () => {
  const {} = useTheme();
  const sheetRef = React.useRef<BottomSheet>(null);
  const scrollRef = React.useRef();
  const [showOverlay, setShowOverlay] = React.useState<boolean>(false);

  const handleOpenPress = React.useCallback((index: number) => {
    setShowOverlay(true);
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = React.useCallback(() => {
    setShowOverlay(false);
    sheetRef.current?.close();
  }, []);

  // Custom backdrop component
  const renderBackdrop = React.useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      opacity={0.5} // Set opacity for backdrop
      onPress={handleClosePress} // Close sheet on backdrop press
    />
  ), [handleClosePress]);

  return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.card,
        }}
      >
        <GestureHandlerRootView style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={(e) => scrollRef.current.handleScroll(e)}
          showsVerticalScrollIndicator={false}>

          <View style={GlobalStyleSheet.container}>
            <View style={styles.button}>
              <Button title="Open Bottom Sheet" onPress={() => handleOpenPress(0)} />
            </View>
          </View>
        </ScrollView>
        <PostOptionSheet
          sheetRef={sheetRef}
          onClose={handleClosePress}
        />
        </GestureHandlerRootView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 200,
  },
});

export default {
  title: 'Bottomsheet/PostOptionSheet',
  component: PostOptionSheetExample,
} as Meta;

const Template: Story = (args) => <PostOptionSheetExample {...args} />;

export const Default = Template.bind({});