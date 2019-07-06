import React from 'react';
import Button from '../Button';
import { tintColor } from '../../constants/Colors';

const NextButton = ({ onPress, disabled }) => (
  <Button
    icon="keyboard-arrow-right"
    size={32}
    color={tintColor}
    onPress={onPress}
    disabled={disabled}
  />
);

export default NextButton;
