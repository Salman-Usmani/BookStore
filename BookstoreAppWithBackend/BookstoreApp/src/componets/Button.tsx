import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

const Button = (props: ButtonProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text style={isDarkMode ? styles.darkLabel : styles.lightLabel}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  darkLabel: {color: Colors.lighter},
  lightLabel: {color: Colors.darker},
});
