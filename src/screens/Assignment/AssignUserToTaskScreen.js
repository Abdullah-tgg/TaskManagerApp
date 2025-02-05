import React, { useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { assignUserToTask } from '../../redux/slices/assignmentSlice';
import { saveData } from '../../storage/asyncStorage';
import Header from '../../components/Headers/Header';

const AssignUserToTaskScreen = () => {
  const users = useSelector(state => state.users);
  const tasks = useSelector(state => state.tasks);
  const assignments = useSelector(state => state.assignments);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAssign = async (userId) => {
    if (!selectedTask) {
      alert('Select a task first!');
      return;
    }

    dispatch(assignUserToTask({ userId, taskId: selectedTask }));

    const updatedAssignments = [...assignments, { userId, taskId: selectedTask }];
    await saveData('assignments', updatedAssignments);
    console.log('updatedAssignments',assignments);
    Alert.alert("Task assigned succesfully")
  };

  return (
    <View style={styles.container}>
      <Header title={"Assign Task to a user"}/>
      <View style={styles.content}>
      <Text>Select Task:</Text>
      {tasks.map(task => (
        <TouchableOpacity key={task.id} onPress={() => setSelectedTask(task.id)} style={[styles.listItem, { backgroundColor: selectedTask === task.id ? 'gray' : 'white' }]}>
          <Text>{task.title}</Text>
        </TouchableOpacity>
      ))}
        <Text>Select User</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAssign(item.id)} style={styles.selectionItem}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  content:{
    flex:1,
    paddingHorizontal:10
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
  },
  selectionItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'red',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    marginTop: 10,
    padding: 10
  }
})
export default AssignUserToTaskScreen;
