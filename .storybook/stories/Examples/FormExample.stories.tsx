// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { FormProvider, useForm } from 'react-hook-form';
// import { Meta, Story } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import Button from '../../../src/components/buttons/Button';
// import { AutoComplete, TextInput, DatePicker, TextArea, MultiSelect, Select } from '../../../src/form';

// // Основной компонент формы
// const FormExample = ({ onSubmitAction, onCancelAction }) => {
//   const methods = useForm();

//   const handleSubmit = methods.handleSubmit((data: any) => {
//     if (data.dob instanceof Date) {
//       data.dob = data.dob.toISOString(); // Преобразуем дату в ISO строку
//     }
//     onSubmitAction(data); // Передаем данные формы в экшен Storybook при отправке
//   });

//   const handleCancel = () => {
//     const formData = methods.getValues(); // Получаем текущие данные формы
//     methods.reset(); // Сбрасываем форму до начальных значений
//     onCancelAction(formData); // Передаем данные формы в экшен Storybook при отмене
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <FormProvider {...methods}>
//         <Text style={styles.title}>Example Form</Text>

//         <View style={styles.inputWrapper}>
//           <TextArea
//             name="bio"
//             control={methods.control}
//             label="Bio"
//             placeholder="Tell us about yourself"
//             rules={{ required: 'Bio is required!' }}
//             required={true}
//           />
//         </View>

//         <View style={styles.inputWrapper}>
//         <AutoComplete
//           name="address"
//           control={methods.control}
//           label="Address"
//           placeholder="Enter an address"
//           rules={{ required: 'Address is required!' }}
//           required={true}
//         />
//         </View>

//         <View style={styles.inputWrapper}>
//         <MultiSelect
//           name="categories"
//           label="Выберите категории"
//           options={[
//             { label: 'Выставки', value: 'Выставки' },
//             { label: 'С детьми', value: 'С детьми' },
//             { label: 'Активный отдых', value: 'Активный отдых' },
//             { label: 'Стендап', value: 'Стендап' },
//             { label: 'Образование', value: 'Образование' },
//             { label: 'Театры', value: 'Театры' },
//             { label: 'Игры', value: 'Игры' },
//             { label: 'Кино', value: 'Кино' },
//             { label: 'Концерты', value: 'Концерты' },
//           ]}
//           placeholder="Выберите..."
//           rules={{ required: 'Categories is required!' }}
//           required={true}
//           control={methods.control}
//         />
//          </View>

//          <View style={styles.inputWrapper}>
//         <Select
//           name="select"
//           label="Выберите категории"
//           options={[
//             { label: 'Выставки', value: 'Выставки' },
//             { label: 'С детьми', value: 'С детьми' },
//             { label: 'Активный отдых', value: 'Активный отдых' },
//             { label: 'Стендап', value: 'Стендап' },
//             { label: 'Образование', value: 'Образование' },
//             { label: 'Театры', value: 'Театры' },
//             { label: 'Игры', value: 'Игры' },
//             { label: 'Кино', value: 'Кино' },
//             { label: 'Концерты', value: 'Концерты' },
//           ]}
//           placeholder="Выберите..."
//           rules={{ required: 'Select is required!' }}
//           required={true}
//           control={methods.control}
//         />
//         </View>

//         <View style={styles.inputWrapper}>
//         <TextInput
//           name='description'
//           label='Description'
//           placeholder='Enter your description...'
//           rules={{ required: 'Description is required!' }}
//           required={true}
//           control={methods.control}
//         />
//         </View>

//         <View style={styles.inputWrapper}>
//         <TextInput
//           name='email'
//           label='Email'
//           placeholder='Enter email...'
//           keyboardType={'email-address'}
//           required={true}
//           control={methods.control}
//           rules={{
//             required: 'Email is required!',
//             pattern: {
//               value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//               message: 'Invalid email address!',
//             }
//           }
//           }
//         />
//         </View>

//         <View style={styles.inputWrapper}>
//         <TextInput
//           name='password'
//           label='Password'
//           placeholder='Enter password...'
//           required={true}
//           secureTextEntry={true}
//           control={methods.control}
//           rules={{
//             required: 'Password is required!',
//             minLength: {
//               value: 6,
//               message: 'Password must be at least 6 characters!',
//             }
//           }
//           }
//         />
//         </View>

//         <View style={styles.inputWrapper}>
//         <DatePicker
//           name="dob"
//           control={methods.control}
//           label="Date of Birth"
//           rules={{ required: 'Date of birth is required!' }}
//           required={true}
//         />
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             title="Submit"
//             onPress={handleSubmit}
//             type="primary"
//           />
//           <Button
//             title="Cancel"
//             onPress={handleCancel}
//             type="gray"
//           />
//         </View>
//       </FormProvider>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     // backgroundColor: 'black',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   inputWrapper: {
//     marginTop: 12,
//   }
// });

// // Экспорт конфигурации для Storybook
// export default {
//   title: 'Examples/FormExample',
//   component: FormExample,
//   argTypes: {
//     onSubmitAction: { action: 'submit' }, // Экшен для кнопки Submit
//     onCancelAction: { action: 'cancel' }, // Экшен для кнопки Cancel
//   },
// } as Meta;

// const Template: Story = (args) => <FormExample {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//   onSubmitAction: action('submit'), // Вызов экшена при отправке
//   onCancelAction: action('cancel'), // Вызов экшена при отмене
// };