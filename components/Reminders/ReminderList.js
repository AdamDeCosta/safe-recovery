import React from 'react';
import { FlatList, Text, Image, Dimensions, View } from 'react-native';
import Reminder from './Reminder';

const { width, height } = Dimensions.get('window');

const ReminderList = ({ reminders, handleDelete }) => {
  const renderReminder = ({ item }) => {
    return (
      <Reminder
        id={item.id}
        startDate={item.startDate}
        calendarID={item.calendarID}
        handleDelete={handleDelete}
      />
    );
  };

  const keyExtractor = (item, index) => item.id;

  return (
    <FlatList
      data={reminders}
      ListEmptyComponent={
        /* -1 fix off by one pixel errors which appear for some reason */
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              resizeMode: 'contain',
              justifyContent: 'center',
              width: width * 0.8 - 1,
              height: (820 / 1076) * (width * 0.8) - 1
            }}
            source={require('../../assets/images/calendar.png')}
          />
          <Text style={{ fontSize: 20, color: '#4C4C4C' }}>
            You do not have any reminders saved.
          </Text>
        </View>
      }
      keyExtractor={keyExtractor}
      renderItem={renderReminder}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    />
  );
};

export default ReminderList;
