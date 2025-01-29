import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/UI/Header';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
    
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
