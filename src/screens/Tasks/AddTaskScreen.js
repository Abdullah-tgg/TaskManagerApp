import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/slices/taskSlice';
import { saveData } from '../../storage/asyncStorage';
import uuid from 'react-native-uuid';
import Header from '../../components/Headers/Header';

const validationSchema = Yup.object({
  title: Yup.string().required('Task title is required'),
  description: Yup.string().required('Description is required'),
  dueDate: Yup.date().required('Due date is required'),
});

const AddTaskScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Formik
      initialValues={{ title: '', description: '', dueDate: new Date() }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const newTask = { id: uuid.v4(), ...values };
        dispatch(addTask(newTask));

        // Save to AsyncStorage
        await saveData('tasks', [...tasks, newTask]);

        Alert.alert('Success', 'Task added!');
        navigation.goBack();
      }}
    >
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <View>
          <Header title={'All Tasks'}/>
          <TextInput 
            placeholder="Title" 
            value={values.title} 
            onChangeText={handleChange('title')} 
          />
          {errors.title && <Text>{errors.title}</Text>}

          <TextInput 
            placeholder="Description" 
            value={values.description} 
            onChangeText={handleChange('description')} 
          />
          {errors.description && <Text>{errors.description}</Text>}

          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Text>Select Due Date: {values.dueDate.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={values.dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) {
                  setFieldValue('dueDate', selectedDate);
                }
              }}
            />
          )}

          {errors.dueDate && <Text>{errors.dueDate}</Text>}

          <Button title="Add Task" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default AddTaskScreen;
