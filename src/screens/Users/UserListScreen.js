import React, { useEffect } from 'react';
import { View, FlatList, Button, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUser } from '../../redux/slices/userSlice';
import { loadData, saveData } from '../../storage/asyncStorage';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../util/color';
import Header from '../../components/Headers/Header';
import { MyButton } from '../../components/atoms/InputFields/MyButton';

const UserListScreen = ({ navigation }) => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const savedUsers = await loadData('users');
      if (savedUsers) {
        dispatch(setUsers(savedUsers)); 
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      saveData('users', users);
    }
  }, [users]);

  const handleDeleteUser = async (userId) => {
    dispatch(deleteUser(userId));
    Alert.alert('Deleted', 'User has been removed.');
  };

  return (
    <View style={styles.container}>
      <Header title={'All users'} />
      <View style={styles.content}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('AssignedTasksScreen', { userId: item.id })}>
              <Text>{item.name}</Text>
              <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                <Entypo name='trash' size={18} color={colors.red} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        <MyButton title={"Add User"} onPress={() => navigation.navigate('AddUser')} />
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

export default UserListScreen;
