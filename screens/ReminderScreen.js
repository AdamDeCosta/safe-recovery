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
import { Notifications, FileSystem } from 'expo';

export default class ReminderScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  dir = FileSystem.documentDirectory + "sr/reminders.json";

  state = {
    reminders: {
      notifications: []
    },
    remindersJSX: null
  }

  componentDidMount() {
    this._loadReminders();
  }

  _generateReminderJSX = (reminders) => {
    const remindersJSX = reminders.notifications.map((notification) => {
      const date = notification.date.toString();
      return (
        <Text key={notification.id}>{ date }</Text>
      )
    })

    return remindersJSX;
  }

  _loadReminders = async () => {
    const { exists } = await FileSystem.getInfoAsync(this.dir);
    if (exists) {
      FileSystem.readAsStringAsync(this.dir).then((reminders) => {
        reminders = JSON(reminders);
        const remindersJSX = this._generateReminderJSX(reminders);
        this.setState({ reminders, remindersJSX });
      })
    } else {
      this.setState({ reminders: {
        notifications: [], remindersJSX: null
      } });
    }
  }

  _storeNotification = async (notification) => {
     const { reminders } = this.state;
     reminders.notifications.push(notification)
     const remindersJSX = this._generateReminderJSX(reminders);
     this.setState({ reminders, remindersJSX })
     await this._saveReminders();
  }

  _saveReminders = async () => {
    const { reminders } = this.state;
    await FileSystem.writeAsStringAsync(this.dir, JSON.stringify(reminders));
  }

  _scheduleReminder = async () => {
    const notification = {
      title: 'Expiration coming up.',
      body: 'You have an expiration coming up soon.  '
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
        const date = new Date(year, month, day, hour, minute);
        if (date > (new Date()))
        {
          const push = await Notifications.scheduleLocalNotificationAsync(notification, {
            time: new Date(year, month, day, hour, minute)
          });
  
          if (push !== undefined) {
            const noteObj = {
              id: {push},
              date: new Date(year, month, day, hour, minute),
            }
            await this._storeNotification(noteObj);
          }
        }
      }
    }
  };

  render() {
    const { remindersJSX } = this.state;
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
          { remindersJSX }
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
