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

const SheetLong: FC<SheetProps> = ({
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
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      onClose={onClose}
      handleStyle={[styles.defaultHandle ]}
      handleIndicatorStyle={[styles.defaultHandleIndicator]}
      backgroundStyle={[styles.defaultBackground]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} onPress={onClose} />
      )}
    >
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        {children}
      </BottomSheetScrollView>
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

export default SheetLong;
