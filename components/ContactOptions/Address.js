import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking
} from 'react-native';
import { Icon } from 'expo';
import { Platform } from 'expo-core';

const Address = ({ address }) => {
  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        // Not really modular but whatever
        `https://maps.apple.com/?daddr=${encodeURI(address)}`
      );
    } else {
      Linking.openURL(
        `http://www.google.com/maps/dir/?api=1&destination=${encodeURI(
          address
        )}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Icon.Ionicons
        name={Platform.OS === 'android' ? 'md-business' : 'ios-business'}
        style={styles.icon}
        size={26}
      />
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.address}>{address}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    marginRight: 10
  },
  address: {
    fontSize: 20
  }
});

export default Address;
