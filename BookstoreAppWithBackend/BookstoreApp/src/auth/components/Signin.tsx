import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../../componets/Button';
import Input from '../../componets/Input';

interface SignInProps {
  showAuthScreen: 'SIGNIN' | 'SIGNUP';
  setAuthScreen: React.Dispatch<React.SetStateAction<'SIGNIN' | 'SIGNUP'>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const SignIn = (props: SignInProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = React.useState('salman090898@gmail.com');
  const [password, setPassword] = React.useState('encryptpassword');
  const [loading, setLoading] = React.useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };
      const postResponse = await fetch(
        'http://localhost:3000/auth/login',
        options,
      ).then(async value => await value.json());

      if (postResponse) {
        props.setToken(postResponse.token || '');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.darkHeading : styles.lightHeading}>
        Login
      </Text>

      <Input
        setValue={setEmail}
        label={'Email'}
        value={email}
        placeholder={'Email'}
        keyboardType="email-address"
      />
      <Input
        setValue={setPassword}
        label={'Password'}
        value={password}
        placeholder={'Password'}
        keyboardType="default"
      />

      <Text style={isDarkMode ? styles.darkLabel : styles.lightLabel}>
        Don't have an Account{' '}
        <TouchableOpacity
          onPress={() => props.setAuthScreen('SIGNUP')}
          style={styles.anchor}>
          <Text style={styles.anchorText}>SignUp</Text>
        </TouchableOpacity>
      </Text>

      <Button label={'Login'} onPress={login} />
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
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  anchorText: {
    color: Colors.primary,
    textAlignVertical: 'center',
  },

  darkLabel: {color: Colors.lighter},
  lightLabel: {color: Colors.darker},
});
