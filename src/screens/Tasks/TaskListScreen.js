import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../util/color';
import { setTasks, deleteTask } from '../../redux/slices/taskSlice';
import { loadData, saveData } from '../../storage/asyncStorage';
import Header from '../../components/Headers/Header';
import { MyButton } from '../../components/atoms/InputFields/MyButton';

const TaskListScreen = ({ navigation }) => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const savedTasks = await loadData('tasks');
      if (savedTasks) {
        dispatch(setTasks(savedTasks));
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      saveData('tasks', tasks);
    }
  }, [tasks]);

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    Alert.alert('Deleted', 'Task has been removed.');
  };

  return (
    <View style={styles.container}>
      <Header title="All Tasks" />
      <View style={styles.content}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('AssignedUserScreen', { taskId: item.id })}>
              <Text>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Entypo name="trash" size={18} color={colors.red} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        <MyButton title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: 10
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#000',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    marginTop: 10,
    padding: 10
  }
});

export default TaskListScreen;
