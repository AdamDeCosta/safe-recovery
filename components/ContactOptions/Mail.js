import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { Icon, MailComposer } from 'expo';

const Mail = ({ address, subject }) => {
  const handlePress = () => {
    MailComposer.composeAsync({
      recipients: [address],
      subject: subject
    });
  };

  return (
    <View style={styles.container}>
      <Icon.Ionicons
        name={Platform.OS === 'android' ? 'md-mail' : 'ios-mail'}
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

export default Mail;
