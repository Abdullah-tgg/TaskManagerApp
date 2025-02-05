import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Header = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
}) => {
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image
            source={require('../../assets/icons/back.png')}
            style={{height: hp(5), width: wp(5), resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        {rightComponent ? rightComponent : <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: hp(8),
    // paddingHorizontal: 16,
    // elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightContainer: {
    padding: 8,
  },
  placeholder: {
    width: 24, // Same as Icon size for proper alignment
  },
});

export default Header;
