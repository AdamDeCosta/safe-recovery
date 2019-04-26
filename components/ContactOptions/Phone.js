import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking
} from 'react-native';
import { Icon } from 'expo';

const Phone = ({ number }) => {
  const makeCall = () => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <Icon.FontAwesome name="phone" style={styles.icon} size={26} />
      <TouchableOpacity onPress={makeCall}>
        <Text style={styles.number}>{number}</Text>
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
  number: {
    fontSize: 20
  }
});

export default Phone;
