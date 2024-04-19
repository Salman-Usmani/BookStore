import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IBook {
  visibleScreen: 'AUTH' | 'BOOK';
  setVisibleScreen: React.Dispatch<React.SetStateAction<'AUTH' | 'BOOK'>>;
}

const Book = (props: IBook) => {
  return (
    <View>
      <Text>Book</Text>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({});
