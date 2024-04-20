import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SignIn from './components/Signin';
import SignUp from './components/SignUp';
interface IAuth {
  // visibleScreen: 'AUTH' | 'BOOK';
  // setVisibleScreen: React.Dispatch<React.SetStateAction<'AUTH' | 'BOOK'>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Auth = (props: IAuth) => {
  const [showAuthScreen, setAuthScreen] = useState<'SIGNIN' | 'SIGNUP'>(
    'SIGNIN',
  );
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>{showAuthScreen}</Text>
      <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
        {showAuthScreen === 'SIGNIN' ? (
          <SignIn
            showAuthScreen={showAuthScreen}
            setAuthScreen={setAuthScreen}
            setToken={props.setToken}
          />
        ) : (
          <SignUp
            showAuthScreen={showAuthScreen}
            setAuthScreen={setAuthScreen}
          />
        )}
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, padding: '5%', gap: 15},
  heading: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: 20,
    color: Colors.primary,
  },
  darkContainer: {
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    //====================
    backgroundColor: Colors.dark,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
  lightContainer: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    //====================
    backgroundColor: Colors.lighter,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
});
