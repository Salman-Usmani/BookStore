/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Auth from './src/auth/Auth';
import Book from './src/book/Book';

function App(): React.JSX.Element {
  const [token, setToken] = React.useState('');
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      {token ? <Book token={token} /> : <Auth setToken={setToken} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: Colors.darker,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
});

export default App;

// export default {
//   primary: '#1292B4',
//   white: '#FFF',
//   lighter: '#F3F3F3',
//   light: '#DAE1E7',
//   dark: '#444',
//   darker: '#222',
//   black: '#000',
// };
