import React from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../redux/slices/taskSlice';
import { saveData } from '../../storage/asyncStorage';

const validationSchema = Yup.object({
  title: Yup.string().required('Task title is required'),
  description: Yup.string().required('Description is required'),
});

const UpdateTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  return (
    <Formik
      initialValues={{ title: task.title, description: task.description }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const updatedTask = { ...task, ...values };
        dispatch(updateTask(updatedTask));

        // Update AsyncStorage
        const updatedTasks = tasks.map(t => (t.id === task.id ? updatedTask : t));
        await saveData('tasks', updatedTasks);

        Alert.alert('Success', 'Task updated!');
        navigation.goBack();
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={{ padding: 20 }}>
          <Text>Task Title:</Text>
          <TextInput 
            placeholder="Enter Task Title"
            value={values.title} 
            onChangeText={handleChange('title')} 
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          {errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}

          <Text>Task Description:</Text>
          <TextInput 
            placeholder="Enter Task Description"
            value={values.description} 
            onChangeText={handleChange('description')} 
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          {errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}

          <Button title="Update Task" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default UpdateTaskScreen;
