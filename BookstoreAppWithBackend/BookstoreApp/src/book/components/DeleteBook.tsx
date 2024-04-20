import React from 'react';
import {Text, View, StyleSheet, Modal, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Input from '../../componets/Input';
import Button from '../../componets/Button';

interface ViewBooksProps {
  title: string;
  author: string;
  publishYear: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}

interface DeleteBookProps {
  setModalVisible: () => void;
  modalVisible: boolean;
  bookSelected: ViewBooksProps;
  postDelete: (item: ViewBooksProps) => void;
  token: string;
}

const DeleteBook = ({
  setModalVisible,
  modalVisible,
  bookSelected,
  postDelete,
  token,
}: DeleteBookProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const onPressDelete = async () => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const postResponse = await fetch(
        `http://localhost:3000/books/${bookSelected._id}`,
        options,
      ).then(async value => await value.json());
      if (postResponse?.books?._id) {
        postDelete(postResponse?.books);
      }
      setModalVisible();
    } catch (error) {}
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={isDarkMode ? styles.darkHeading : styles.lightHeading}>
            Delete Book
          </Text>

          <Text>
            Are you sure you want to delete the book '{bookSelected.title}'
          </Text>
          <View style={styles.row}>
            <Button label={'Delete'} onPress={onPressDelete} />
            <Button label={'Cancel'} onPress={setModalVisible} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteBook;

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
    justifyContent: 'space-evenly',
  },
});
