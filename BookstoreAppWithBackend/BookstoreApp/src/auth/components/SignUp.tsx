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

interface SignUpProps {
  showAuthScreen: 'SIGNIN' | 'SIGNUP';
  setAuthScreen: React.Dispatch<React.SetStateAction<'SIGNIN' | 'SIGNUP'>>;
}

const SignUp = (props: SignUpProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const register = async () => {
    try {
      setLoading(true);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      };
      const postResponse = await fetch(
        'http://localhost:3000/auth/register',
        options,
      ).then(async value => await value.json());

      if (postResponse) {
        props.setAuthScreen('SIGNIN');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.darkHeading : styles.lightHeading}>
        Register
      </Text>

      <Input
        setValue={setFirstName}
        label={'First Name'}
        placeholder={'First Name'}
        value={firstName}
        keyboardType="default"
      />
      <Input
        setValue={setLastName}
        label={'Last Name'}
        placeholder={'Last Name'}
        value={lastName}
        keyboardType="default"
      />
      <Input
        setValue={setEmail}
        label={'Email'}
        placeholder={'Email'}
        value={email}
        keyboardType="email-address"
      />
      <Input
        setValue={setPassword}
        label={'Password'}
        placeholder={'Password'}
        value={password}
        keyboardType="default"
      />

      {/* firstName, lastName, email, password, picturePath */}

      <Text style={isDarkMode ? styles.darkLabel : styles.lightLabel}>
        Already have an Account{' '}
        <TouchableOpacity
          onPress={() => props.setAuthScreen('SIGNIN')}
          style={styles.anchor}>
          <Text style={styles.anchorText}>SignIn</Text>
        </TouchableOpacity>
      </Text>

      <Button label={'Register'} onPress={register} />
    </View>
  );
};

export default SignUp;

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
    // justifyContent: 'center',
    alignItems: 'flex-end',
    // alignSelf: 'center',
  },
  anchorText: {
    color: Colors.primary,
    textAlignVertical: 'center',
  },

  darkLabel: {color: Colors.lighter},
  lightLabel: {color: Colors.darker},
});
