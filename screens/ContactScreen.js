import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { MailComposer } from 'expo';

export default class ContactScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  /*
  componentDidMount() {
    MailComposer.composeAsync({
      recipients: ['adam@decosta.io'],
      subject: 'From App: Question',
      body: 'Hey its adam!'
    });
  }
  */

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text>Contact the Howard Center</Text>
          <Text>(Currently yours as I don't have another) Phone - 343-0614</Text>
          <Text>Address: 45 Clarke Street, Burlington VT 05401</Text>
          <Text>Email: GraceK@howardcenter.org</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 30
  }
});
