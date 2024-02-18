import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface InputProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions;
  placeholder?: string;
  required?: boolean;
}

const Input = <T extends FieldValues>({
  label,
  name,
  control,
  rules = {},
  placeholder,
  required,
  ...rest
}: InputProps<T>) => {
  if (required) rules.required = 'This field is required';

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && (
            <Text style={styles.label}>
              {label}
              {required && <Text style={styles.labelRequired}> *</Text>}
            </Text>
          )}
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            {...rest}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 32,
    borderRadius: 12,
  },
  label: {
    color: '#E6E7E9',
    fontFamily: 'Rubic-Regular',
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.8,
    marginBottom: 13,
  },
  labelRequired: {
    color: '#FF0000',
  },
  input: {
    color: '#FFFFFF',
    fontFamily: 'Rubic-Regular',
    fontSize: 18,
    borderWidth: 1,
    padding: 22,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Input;
