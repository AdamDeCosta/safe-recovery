import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ContactScreen from '../screens/ContactScreen';
import ReminderScreen from '../screens/ReminderScreen';

import IconType from '../constants/IconType';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={IconType.Ionicons}
      focused={focused}
      name={
        Constants.platform === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon type={IconType.Feather} focused={focused} name="map-pin" />
  )
};

const ContactStack = createStackNavigator({
  Contact: ContactScreen
});

ContactStack.navigationOptions = {
  tabBarLabel: 'Contact',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={IconType.FontAwesome}
      focused={focused}
      name="question-circle"
    />
  )
};

const ReminderStack = createStackNavigator({
  Reminder: ReminderScreen
});

ReminderStack.navigationOptions = {
  tabBarLabel: 'Reminders',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={IconType.Ionicons}
      focused={focused}
      name={Constants.platform === 'ios' ? 'ios-calendar' : 'md-calendar'}
    />
  )
};

export default createBottomTabNavigator(
  {
    HomeStack,
    MapStack,
    ContactStack,
    ReminderStack
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected
    }
  }
);
