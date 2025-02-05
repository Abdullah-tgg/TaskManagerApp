import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { assignUserToTask } from '../../redux/slices/assignmentSlice';
import { loadData, saveData } from '../../storage/asyncStorage';
import { store } from '../../redux/store';
import Header from '../../components/Headers/Header';

const AssignTaskToUserScreen = () => {
  const users = useSelector(state => state.users);
  const tasks = useSelector(state => state.tasks);
  const assignments = useSelector(state => state.assignments || []);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Load assignments from AsyncStorage when the component mounts
    const fetchAssignments = async () => {
      const savedAssignments = await loadData('assignments');
      if (savedAssignments) {
        console.log('Loaded  Assignments:', savedAssignments);
      }
    };
    fetchAssignments();
  }, []);

  const handleAssign = async (taskId) => {
    if (!selectedUser) {
      Alert.alert('Select a user first!');
      return;
    }
    dispatch(assignUserToTask({ userId: selectedUser, taskId }));
    saveData('assignments', assignments).then(() => {
      loadData('assignments').then((storedData) => {
        Alert.alert('Success', 'Task assigned successfully!');
      });
    });
  }

  return (
    <View style={styles.container}>
      <Header title={"Assign Task to a user"} />
      <View style={styles.content}>
        <Text>Select User:</Text>
        {users.map(user => (
          <TouchableOpacity key={user.id} onPress={() => setSelectedUser(user.id)} style={[styles.listItem, { backgroundColor: selectedUser === user.id ? 'gray' : 'white' }]}>
            <Text>
              {user.name}
            </Text>
          </TouchableOpacity>
        ))}
        <Text>Select Task</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.selectionItem} onPress={() => handleAssign(item.id)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
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
export default AssignTaskToUserScreen;
