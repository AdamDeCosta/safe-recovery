import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

const components = {
    ionicons: Icon.Ionicons,
    feather:  Icon.Feather,
    fontAwesome: Icon.FontAwesome,
}

export default function TabBarIcon(props) {
  const IconType = components[props.type];
  
  return (
    <IconType
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}