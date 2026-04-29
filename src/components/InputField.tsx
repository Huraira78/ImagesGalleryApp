import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor="#999"
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#333333',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1.5,
    borderColor: '#e9ecef',
    borderRadius: 14,
    padding: 16,
    color: '#212529',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4757',
    backgroundColor: 'rgba(255, 71, 87, 0.05)',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
});

export default InputField;
