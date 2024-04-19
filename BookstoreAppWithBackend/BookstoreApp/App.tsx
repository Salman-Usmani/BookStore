/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import type {PropsWithChildren} from 'react';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Auth from './src/auth/Auth';
import Book from './src/book/Book';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// const fetchApi = async () => {
//   try {
//     const fetchResponse = await axios.get('http://localhost:3000/');
//     console.log(fetchResponse.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const postApi = async () => {
//   try {
//     const postResponse = await axios.post('http://localhost:3000/books', {
//       title: 'GK',
//       author: 'Ma',
//       publishYear: '2024',
//     });
//     console.log(postResponse.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getAllBooks = async () => {
//   try {
//     const postResponse = await axios.get('http://localhost:3000/books');
//     console.log(postResponse.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getBookById = async () => {
//   try {
//     const postResponse = await axios.get(
//       'http://localhost:3000/books/661d894f7d870a4aa7734ef4',
//     );
//     console.log(postResponse.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const updateBook = async () => {
//   try {
//     setLoading(true);
//     const postResponse = await axios.put(
//       'http://localhost:3000/books/661d894f7d870a4aa7734ef4',
//       {
//         title: 'Book',
//         author: 'writer',
//         publishYear: '2024',
//       },
//     );
//     console.log(postResponse);
//     setLoading(false);
//   } catch (error) {
//     console.log(error.response.data);
//     setLoading(false);
//   }
// };

// const deleteBook = async () => {
//   try {
//     setLoading(true);
//     const postResponse = await axios.delete(
//       'http://localhost:3000/books/661d8bb7fbd5e302d4875e76',
//     );
//     console.log(postResponse.data);
//     setLoading(false);
//   } catch (error: any) {
//     console.log(error?.response?.data);
//     setLoading(false);
//   }
// };

function App(): React.JSX.Element {
  const [loading, setLoading] = React.useState(false);
  const [visibleScreen, setVisibleScreen] = React.useState<'AUTH' | 'BOOK'>(
    'AUTH',
  );

  // const register = async () => {
  //   try {
  //     setLoading(true);
  //     const postResponse = await axios.post(
  //       'http://localhost:3000/auth/register',
  //       {
  //         firstName: 'salman',
  //         lastName: 'usmani',
  //         email: 'salman090898@gmail.com',
  //         password: 'encryptpassword',
  //       },
  //     );
  //     console.log('vhjkljl', postResponse.data);
  //     setLoading(false);
  //   } catch (error: any) {
  //     console.log({error});
  //     setLoading(false);
  //   }
  // };
  const login = async () => {
    try {
      setLoading(true);
      const postResponse = await axios.post(
        'http://localhost:3000/auth/login',
        {
          email: 'salman090898@gmail.com',
          password: 'encryptpassword',
        },
      );
      console.log('vhjkljl', {postResponse});
      setLoading(false);
    } catch (error: any) {
      console.log({error: error.response});
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchApi();
    // postApi();
    // getAllBooks();
    // getBookById();
    // updateBook();
    // deleteBook();
    // register();
    // login();
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      {visibleScreen === 'AUTH' ? (
        <Auth
          visibleScreen={visibleScreen}
          setVisibleScreen={setVisibleScreen}
        />
      ) : (
        <Book
          visibleScreen={visibleScreen}
          setVisibleScreen={setVisibleScreen}
        />
      )}
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
