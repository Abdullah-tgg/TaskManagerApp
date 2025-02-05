import React from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';
import { saveData } from '../../storage/asyncStorage';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const UpdateUserScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  return (
    <Formik
      initialValues={{ name: user.name, email: user.email }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const updatedUser = { ...user, ...values };
        dispatch(updateUser(updatedUser));

        // Save to AsyncStorage
        const updatedUsers = users.map(u => (u.id === user.id ? updatedUser : u));
        await saveData('users', updatedUsers);

        Alert.alert('Success', 'User updated!');
        navigation.goBack();
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View>
          <TextInput placeholder="Name" value={values.name} onChangeText={handleChange('name')} />
          {errors.name && <Text>{errors.name}</Text>}

          <TextInput placeholder="Email" value={values.email} onChangeText={handleChange('email')} keyboardType="email-address" />
          {errors.email && <Text>{errors.email}</Text>}

          <Button title="Update User" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default UpdateUserScreen;
