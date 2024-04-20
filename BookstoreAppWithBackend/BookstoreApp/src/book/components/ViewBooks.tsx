import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
interface IBookProps {
  title: string;
  author: string;
  publishYear: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}

interface ViewBooksProps {
  item: IBookProps;
  onUpdate: (item: IBookProps) => void;
  onDelete: (item: IBookProps) => void;
  onView: (item: IBookProps) => void;
}

const ViewBooks = ({item, onUpdate, onDelete, onView}: ViewBooksProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text>
        Title:{'\t\t'}
        {item.title}
      </Text>
      <Text>
        Author:{'\t\t'}
        {item.author}
      </Text>
      <Text>
        PublishYear:{'\t\t'}
        {item.publishYear}
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            onUpdate(item);
          }}>
          <Text style={styles.update}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onView(item);
          }}>
          <Text style={styles.view}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onDelete(item);
          }}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewBooks;

const styles = StyleSheet.create({
  container: {},

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
    margin: 5,
    padding: '5%',
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
    margin: 5,
    padding: '5%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  update: {
    textDecorationLine: 'underline',
    color: 'dodgerblue',
  },
  view: {
    textDecorationLine: 'underline',
    color: 'mediumspringgreen',
  },
  delete: {
    textDecorationLine: 'line-through',
    color: 'salmon',
  },
});
