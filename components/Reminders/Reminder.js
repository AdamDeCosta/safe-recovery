import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'expo-core';

export default class Reminder extends React.Component {
  state = {
    formattedDate: undefined
  };

  componentDidMount() {
    console.log(this.props);
    const date = new Date(this.props.startDate);
    this.setState({
      formattedDate: new Date(date.setDate(date.getDate() + 1)).toDateString()
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dateString}>{this.state.formattedDate}</Text>
        <TouchableOpacity
          onPress={() => this.props.handleDelete(this.props.id)}
          style={styles.delete}
        >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={26}
            color="red"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingRight: 5
  },
  dateString: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'stretch'
  },
  delete: {
    alignSelf: 'center'
  }
});
