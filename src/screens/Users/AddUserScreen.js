import React from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/slices/userSlice';
import { saveData } from '../../storage/asyncStorage';
import uuid from 'react-native-uuid';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const AddUserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const newUser = { id: uuid.v4(), ...values };
        dispatch(addUser(newUser));

        // Save to AsyncStorage
        await saveData('users', [...users, newUser]);

        Alert.alert('Success', 'User added!');
        navigation.goBack();
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View>
          <TextInput placeholder="Name" value={values.name} onChangeText={handleChange('name')} />
          {errors.name && <Text>{errors.name}</Text>}

          <TextInput placeholder="Email" value={values.email} onChangeText={handleChange('email')} keyboardType="email-address" />
          {errors.email && <Text>{errors.email}</Text>}

          <Button title="Add User" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default AddUserScreen;
