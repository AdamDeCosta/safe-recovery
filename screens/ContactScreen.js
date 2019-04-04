import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { MailComposer } from 'expo';

export default class ContactScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    MailComposer.composeAsync({
      recipients: ['adam@decosta.io'],
      subject: 'Howard Center test',
      body: 'Hey its adam!'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text>Contact Screen</Text>
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
