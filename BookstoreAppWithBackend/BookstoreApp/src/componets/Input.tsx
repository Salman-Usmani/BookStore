import * as React from 'react';
import {Text, View, StyleSheet, TextInput, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface InputProps {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = (props: InputProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.darkLabel : styles.lightLabel}>
        {props.label}
      </Text>
      <TextInput
        style={isDarkMode ? styles.darkInput : styles.lightInput}
        placeholder="Input"
        placeholderTextColor={Colors.primary}
        value={props.value}
        onChangeText={props.setValue}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {},
  darkLabel: {color: Colors.lighter},
  lightLabel: {color: Colors.darker},
  darkInput: {
    borderWidth: 0.6,
    marginTop: 5,
    borderRadius: 5,
    color: Colors.white,
  },
  lightInput: {
    borderWidth: 0.6,
    marginTop: 5,
    borderRadius: 5,
    color: Colors.black,
  },
});
