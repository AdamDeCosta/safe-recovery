import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  TimePickerAndroid,
  DatePickerAndroid
} from 'react-native';
import { Notifications } from 'expo';

export default class ReminderScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _scheduleReminder = async () => {
    const notification = {
      title: 'Test',
      body: 'Here is the body text'
    };

    const { dateAction, year, month, day } = await DatePickerAndroid.open({
      date: new Date()
    });
    if (dateAction !== DatePickerAndroid.dismissedAction) {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        await Notifications.scheduleLocalNotificationAsync(notification, {
          time: new Date(year, month, day, hour, minute)
        });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text>Reminder Screen</Text>
          <Button
            title="Set Reminder"
            onPress={() => this._scheduleReminder()}
          />
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
