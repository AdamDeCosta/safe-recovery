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
    }
  }

  componentDidMount() {
    this._loadReminders();
  }

  _loadReminders = async () => {
    const { exists } = await FileSystem.getInfoAsync(this.dir);
    if (exists) {
      FileSystem.readAsStringAsync(this.dir).then((reminders) => {
        this.setState({ reminders });
      })
    } else {
      this.setState({ reminders: {
        notifications: []
      } });
    }
  }

  _storeNotification = async (notification) => {
     const { reminders } = this.state;
     reminders.notifications.append(notification)
     this.setState({reminders})
     await this._saveReminders();
  }

  _saveReminders = async () => {
    const { reminders } = this.state;
    await FileSystem.writeAsStringAsync(this.dir, JSON.stringify(reminders));
  }

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
