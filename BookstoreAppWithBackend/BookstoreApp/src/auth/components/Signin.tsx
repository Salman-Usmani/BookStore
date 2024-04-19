import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Input from '../../componets/Input';

interface SignInProps {
  showAuthScreen: 'SIGNIN' | 'SIGNUP';
  setAuthScreen: React.Dispatch<React.SetStateAction<'SIGNIN' | 'SIGNUP'>>;
}

const SignIn = (props: SignInProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.darkHeading : styles.lightHeading}>
        Login
      </Text>

      <Input setValue={setEmail} label={'Email'} value={email} />
      <Input setValue={setPassword} label={'Password'} value={password} />

      <Text style={isDarkMode ? styles.darkLabel : styles.lightLabel}>
        Don't have an Account{' '}
        <TouchableOpacity style={styles.anchor}>
          <Text style={styles.anchorText}>SignUp</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {padding: '5%', gap: 15},

  darkHeading: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.light,
  },
  lightHeading: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.dark,
  },
  anchor: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  anchorText: {
    color: Colors.primary,
    textAlignVertical: 'center',
  },

  darkLabel: {color: Colors.lighter},
  lightLabel: {color: Colors.darker},
});
