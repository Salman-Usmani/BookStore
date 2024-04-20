import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../../componets/Button';
import Input from '../../componets/Input';

interface ViewBooksProps {
  title: string;
  author: string;
  publishYear: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}

interface AddUpdateBookProps {
  modalVisible: boolean;
  setModalVisible: () => void;
  setBooks: (item: ViewBooksProps) => void;
  token: string;
  bookSelected?: ViewBooksProps;
}

const AddUpdateBook = (props: AddUpdateBookProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [title, setTitle] = React.useState(props.bookSelected?.title || '');
  const [publishYear, setPublishYear] = React.useState(
    props.bookSelected?.publishYear || '',
  );
  const [author, setAuthor] = React.useState(props.bookSelected?.author || '');

  const addUpdateBook = async () => {
    try {
      const options = {
        method: props.bookSelected?._id ? 'PUT' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          title,
          author,
          publishYear,
        }),
      };
      const postResponse = await fetch(
        `http://localhost:3000/books/${props.bookSelected?._id || ''}`,
        options,
      ).then(async value => await value.json());
      if (postResponse?.books?._id) {
        props.setBooks(postResponse?.books);
      }
      props.setModalVisible();
    } catch (error) {}
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.row}>
            <Text style={isDarkMode ? styles.darkHeading : styles.lightHeading}>
              Add | Update Book
            </Text>
            <TouchableOpacity
              onPress={props.setModalVisible}
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                // padding: 5,
                paddingHorizontal: 5,
                backgroundColor: 'salmon',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  textAlignVertical: 'center',
                }}>
                X
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={props.setModalVisible}
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                padding: 5,
                backgroundColor: 'salmon',
              }}>
              <Text style={{color: Colors.white}}>X</Text>
            </TouchableOpacity> */}
          </View>

          <Input
            setValue={setTitle}
            label={'Title'}
            value={title}
            placeholder={'Title'}
            keyboardType="default"
          />
          <Input
            setValue={setAuthor}
            label={'Author'}
            value={author}
            placeholder={'Author'}
            keyboardType="default"
          />
          <Input
            setValue={setPublishYear}
            label={'Publish Year'}
            value={publishYear}
            placeholder={'Publish Year'}
            keyboardType="default"
          />

          <Button
            label={props.bookSelected?._id ? 'Update' : 'Add'}
            onPress={addUpdateBook}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddUpdateBook;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 15,
  },

  darkHeading: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.light,
  },
  lightHeading: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.dark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
