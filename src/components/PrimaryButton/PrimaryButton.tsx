import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

const PrimaryButton = ({ title, onPress }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#9A41EA',
    borderRadius: 8,
    width: 174,
    height: 48,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Rubic-Regular',
    fontWeight: '700',
  },
});
