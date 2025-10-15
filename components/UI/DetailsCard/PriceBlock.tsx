import React from 'react';
import { View } from 'react-native';
import { IconLabel } from './IconLabel';
import { useTheme } from '../../../theme';


interface PriceBlockProps {
    price: string;
}

export const PriceBlock: React.FC<PriceBlockProps> = ({ price }) => {
    const { globalStyleSheet } = useTheme();

    return (
        <View style={globalStyleSheet.flexRowCenterStart}>
            <IconLabel icon='cash-outline' label='Price:' value={price}/>
        </View>
    );
};

