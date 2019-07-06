import React from 'react';

import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Button = ({ icon, onPress, size, color, style, disabled }) => (
  <TouchableOpacity onPress={disabled ? null : onPress}>
    <MaterialIcons
      name={icon}
      size={size || 24}
      color={disabled ? '#999999' : color || 'black'}
      style={style || null}
    />
  </TouchableOpacity>
);

export default Button;
