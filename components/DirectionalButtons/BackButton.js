import React from 'react';
import Button from '../Button';
import { tintColor } from '../../constants/Colors';

const BackButton = ({ onPress, disabled }) => (
  <Button
    icon="keyboard-arrow-left"
    size={32}
    color={tintColor}
    onPress={onPress}
    disabled={disabled}
  />
);

export default BackButton;
