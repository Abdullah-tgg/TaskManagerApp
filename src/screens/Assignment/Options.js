import React, { useEffect } from 'react';
import { View, FlatList, Button, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Header from '../../components/Headers/Header';
import { MyButton } from '../../components/atoms/InputFields/MyButton';

const Options = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Header title={'Options'} />
      <View style={styles.content}>
        <MyButton title={"Assign User to task"} onPress={() => navigation.navigate('AssignUserToTaskScreen')} />
        <MyButton title={"Assign task to User"} onPress={() => navigation.navigate('AssignTaskToUserScreen')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    marginHorizontal:10
  }

})
export default Options;
