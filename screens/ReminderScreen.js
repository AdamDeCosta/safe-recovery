import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  DatePickerAndroid,
  Alert,
  FlatList
} from 'react-native';
import { Calendar, Permissions, Localization } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'expo-core';
import { ReminderList } from '../components/Reminders';
import { tintColor } from '../constants/Colors';

export default class ReminderScreen extends React.Component {
  constructor(props) {
    super(props);
    this._deleteEvent = this._deleteEvent.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  state = {
    calendar: null,
    events: null
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.CALENDAR).then((res) => {
      if (res.status === 'granted') {
        this._loadCalendar().then(() => this._loadEvents());
      }
    });
  }

  _loadEvents = async () => {
    const currentDate = new Date();
    Calendar.getEventsAsync(
      [this.state.calendar.id],
      new Date(currentDate.getDate() - 1),
      new Date(currentDate).setFullYear(currentDate.getFullYear() + 5)
    ).then((events) => {
      this.setState({ events });
    });
  };

  _loadCalendar = async () => {
    const calendars = await Calendar.getCalendarsAsync();
    let calendar = calendars.find((cal) => cal.name === 'Howard Center');
    if (calendar == undefined) {
      calendar = await this._createCalender(calendars);
    }
    this.setState({ calendar });
  };

  _createCalender = async (calendars) => {
    return await Calendar.createCalendarAsync({
      title: 'Howard Center',
      name: 'Howard Center',
      color: 'red',
      entityType:
        Platform.OS === 'ios' ? Calendar.EntityTypes.REMINDER : undefined,
      source:
        Platform.OS === 'android'
          ? {
              isLocalAccount: true,
              name: calendars.find(
                (cal) => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER
              ).ownerAccount
            }
          : undefined,
      sourceId:
        Platform.OS === 'ios'
          ? calendars.find((cal) => cal.source && cal.source.name === 'Default')
              .source.id
          : undefined,
      ownerAccount:
        Platform.OS === 'android'
          ? calendars.find(
              (cal) => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER
            ).ownerAccount
          : undefined,
      accessLevel: Calendar.CalendarAccessLevel.OWNER
    }).catch((error) => {
      Alert.alert('Unable to create calendar', error);
    });
  };

  _createEvent = async (calendar) => {
    const date = await this._getTimeDate();
    if (date != null && date >= new Date()) {
      await Calendar.createEventAsync(calendar.calendar.id, {
        title: 'Narcan Expires',
        startDate: date,
        endDate: new Date(date).setHours(date.getHours() + 5),
        allDay: true,
        timeZone:
          Platform.OS === 'android'
            ? await Localization.getLocalizationAsync()
                .then((res) => res.timezone)
                .catch((error) => Localization.timezone)
            : Localization.timezone,
        alarms: [
          {
            relativeOffset: -43800,
            method: Calendar.AlarmMethod.DEFAULT
          },
          {
            relativeOffset: -10080,
            method: Calendar.AlarmMethod.DEFAULT
          }
        ]
      });

      this._loadEvents();
    }
  };

  _getTimeDate = async () => {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date()
    });

    if (action == DatePickerAndroid.dateSetAction) {
      const date = new Date(year, month, day, 12);
      return date;
    }

    return null;
  };

  _deleteEvent = async (id) => {
    await Calendar.deleteEventAsync(id);
    await this._loadEvents();
  };

  render() {
    const { calendar } = this.state;
    return (
      <View style={styles.contentContainer}>
        <ReminderList
          reminders={this.state.events}
          handleDelete={this._deleteEvent}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => this._createEvent({ calendar })}
        >
          <MaterialCommunityIcons
            style={{ position: 'absolute', top: 11, right: 12 }}
            name="plus"
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 30
  },
  fab: {
    position: 'absolute',
    flex: 1,
    bottom: 20,
    right: 20,
    height: 56,
    width: 56,
    backgroundColor: `#063a47`,
    elevation: 6,
    borderRadius: 500
  }
});
