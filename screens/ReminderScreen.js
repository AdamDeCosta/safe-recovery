import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  DatePickerAndroid,
  Alert
} from 'react-native';
import * as Localization from 'expo-localization';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ReminderList } from '../components/Reminders';

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
    this._loadCalendar();
  }

  _loadEvents = () => {
    console.log('loading');
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
    const { status } = await Permissions.getAsync(Permissions.CALENDAR);
    if (status === 'granted') {
      console.log(status);
      const calendars = await Calendar.getCalendarsAsync();
      let calendar = calendars.find((cal) => cal.name === 'Howard Center');
      if (calendar === undefined) {
        calendar = await this._createCalender(calendars);
      }
      this.setState({ calendar });
      this._loadEvents();
    } else {
      await Permissions.askAsync(Permissions.CALENDAR);
      this._loadCalendar();
    }
  };

  _createCalender = async (calendars) => {
    const details = {
      title: 'Howard Center',
      name: 'Howard Center',
      color: 'red',
      entityType:
        Constants.platform === 'ios'
          ? Calendar.EntityTypes.REMINDER
          : undefined,
      source: {
        isLocalAccount: true,
        name: calendars.find(
          (cal) => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER
        ).ownerAccount
      },
      sourceId:
        Constants.platform === 'ios'
          ? calendars.find((cal) => cal.source && cal.source.name === 'Default')
              .source.id
          : undefined,
      ownerAccount: calendars.find(
        (cal) => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER
      ).ownerAccount,

      accessLevel: Calendar.CalendarAccessLevel.OWNER
    };
    return await Calendar.createCalendarAsync(details).catch((error) => {
      console.log(error);
    });
  };

  _createEvent = () => {
    console.log('create event');
    this._getTimeDate().then((date) => {
      if (date != null && date >= new Date()) {
        console.log(this.state);
        const endDate = new Date(date).setHours(date.getHours() + 5);

        Calendar.createEventAsync(this.state.calendar.id, {
          title: 'Narcan Expires',
          startDate: date,
          endDate: endDate,
          allDay: true,
          timeZone: Localization.timezone
        })
          .then(() => this._loadEvents())
          .catch((error) => console.log(error));
      }
    });
  };

  _getTimeDate = async () => {
    console.log('get time date');
    return new Promise((resolve, reject) => {
      DatePickerAndroid.open({
        date: new Date()
      }).then(({ action, year, month, day }) => {
        if (action == DatePickerAndroid.dateSetAction) {
          resolve(new Date(year, month, day, 12));
        }

        resolve(null);
      });
    });
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
    flex: 1
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
