import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../components/Headers/Header';

const AssignedUsersScreen = ({ route }) => {
    const { taskId } = route.params;
    const users = useSelector(state => state.users);
    const assignments = useSelector(state => state.assignments);

    const taskUsers = assignments
        .filter(assignment => assignment.taskId === taskId)
        .map(assignment => users.find(user => user.id === assignment.userId));

    return (
        <View style={styles.container}>
            <Header title={`User assigned tasks`} />
            <Text>Users assigned to the selected task are:</Text>
            <FlatList
                data={taskUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={styles.listItem}>
                        <Text>{item.name}</Text>
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
export default AssignedUsersScreen;
