import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { MailComposer } from 'expo';
import { Phone, Mail, Address } from '../components/ContactOptions';

export default class ContactScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  composeMail = () => {
    MailComposer.composeAsync({
      recipients: ['GraceK@howardcenter.org'],
      subject: 'From App: Question'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.header}>Contact Us</Text>
          <Phone number="(802) 488-6067" />
          <Address address="45 Clarke Street, Burlington VT 05401" />
          <Mail
            address="GraceK@howardcenter.org"
            subject="From App: Question"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5
  },
  contentContainer: {
    paddingTop: 30
  },
  header: {
    marginBottom: 10,
    fontSize: 36
  }
});
