import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

import { commonStyles } from './commonFormStyles';
import { COLORS, SIZES } from '../constants/theme';

export interface DatePickerProps {
  name: string;
  control: any;
  label?: string;
  style?: object;
  containerStyle?: object;
  rules?: object;
  defaultValue?: Date;
  errorTextStyle?: object;
  required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  control,
  label,
  style,
  containerStyle,
  rules = {},
  defaultValue = new Date(), // Значение по умолчанию - текущая дата
  errorTextStyle,
  required,
}) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined, onChange: any, currentValue: Date) => {
    const currentDate = selectedDate || currentValue || defaultValue;
    
    // Сохраняем выбранное время при изменении даты
    if (currentValue) {
      currentDate.setHours(currentValue.getHours());
      currentDate.setMinutes(currentValue.getMinutes());
    }

    setShowDatePicker(false);
    onChange(currentDate); // Обновляем значение в форме
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined, onChange: any, currentValue: Date) => {
    setShowTimePicker(false);
    
    if (selectedTime) {
      const currentDate = currentValue || defaultValue;
      
      // Сохраняем выбранную дату при изменении времени
      currentDate.setHours(selectedTime.getHours());
      currentDate.setMinutes(selectedTime.getMinutes());
      
      onChange(currentDate); // Обновляем значение в форме
    }
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
            <View style={[commonStyles.inputBorder, commonStyles.inputContainer, styles.row]}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.dateButtonContainer]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.buttonText}>
                  {value ? value.toDateString() : 'Select a date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.timeButtonContainer]}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.buttonText}>
                  {value ? value.toTimeString().slice(0, 5) : 'Select time'}
                </Text>
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={value || defaultValue}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  handleDateChange(event, selectedDate, onChange, value)
                }
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={value || defaultValue}
                mode="time"
                display="default"
                onChange={(event, selectedTime) =>
                  handleTimeChange(event, selectedTime, onChange, value)
                }
              />
            )}
            {error && <Text style={[commonStyles.errorText, errorTextStyle]}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  placeholder:{
    color: COLORS.placeholder,
    fontSize: SIZES.font,
  },
  buttonText: {
    color: COLORS.dark,
    fontSize: SIZES.font,
  },
  dateButtonContainer: {
    flex: 0.6, // 60% ширины
  },
  timeButtonContainer: {
    flex: 0.4, // 40% ширины
    alignItems: "flex-end",
  },
});

export default DatePicker;