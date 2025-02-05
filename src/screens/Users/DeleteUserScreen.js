import { deleteUser } from '../../redux/slices/userSlice';
import { saveData } from '../../storage/asyncStorage';

const handleDeleteUser = async (userId) => {
  dispatch(deleteUser(userId));

  // Update AsyncStorage
  const updatedUsers = users.filter(user => user.id !== userId);
  await saveData('users', updatedUsers);

  Alert.alert('Deleted', 'User has been removed.');
};
