import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../components/Headers/Header';

const AssignedTasksScreen = ({ route,navigation}) => {
  const { userId } = route.params;
  console.log('userId',userId);
  
  const tasks = useSelector(state => state.tasks);
  const assignments = useSelector(state => state.assignments);

  const userTasks = assignments
    .filter(assignment => assignment.userId === userId)
    .map(assignment => tasks.find(task => task.id === assignment.taskId));

  return (
    <View style={styles.container}>
      <Header title={`User assigned tasks`} />
      <Text>Tasks assigned to the selected user are:</Text>
      <FlatList
        data={userTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <View style={styles.listItem}>          
          <Text>{item.title}</Text>
          </View>
          }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
flex:1
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#000',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius:15,
    borderWidth: 0.5,
    marginTop: 10,
    padding: 10
  }
})
export default AssignedTasksScreen;
