import React, { FC } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { COLORS } from "../../constants/theme/theme";

interface SheetProps {
  sheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints?: Array<string | number>;
  onClose: () => void;
  children: React.ReactNode;
}

const Sheet: FC<SheetProps> = ({
  sheetRef,
  snapPoints = ['50%'],
  onClose,
  children,
}) => {
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableContentPanningGesture={true}
      animateOnMount={true}
      animationConfigs={{
        duration: 250,
      }}
      onClose={onClose}
      handleStyle={[styles.defaultHandle]}
      handleIndicatorStyle={[styles.defaultHandleIndicator]}
      backgroundStyle={[styles.defaultBackground]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} onPress={onClose} />
      )}
    >
        {children}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  defaultHandle: {
    top: 0,
  },
  defaultHandleIndicator: {
    backgroundColor: COLORS.border,
    width: 92,
  },
  defaultBackground: {
    backgroundColor: COLORS.card,
  },
});

export default Sheet;
