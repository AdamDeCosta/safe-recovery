import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SafeMap from '../components/SafeMap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>Map Screen</Text>
          <SafeMap />
        </ScrollView>
      </View>
    );
  }
}
