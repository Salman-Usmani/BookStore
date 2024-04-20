import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ViewBooksProps {
  title: string;
  author: string;
  publishYear: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}
interface BookDetailsProps {
  token: string;
  _id: string;
  setModalVisible: () => void;
  modalVisible: boolean;
}

const BookDetails = ({
  token,
  _id,
  setModalVisible,
  modalVisible,
}: BookDetailsProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [loading, setLoading] = React.useState(false);
  const [bookInfo, setBookInfo] = React.useState<ViewBooksProps>();
  const fetchBookInfo = async () => {
    try {
      setLoading(true);
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const postResponse = await fetch(
        `http://localhost:3000/books/${_id}`,
        options,
      ).then(async value => await value.json());

      setBookInfo(postResponse?.books);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBookInfo();
  }, [_id]);
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
          <View style={styles.row}>
            <Text style={styles.heading}>Book Details</Text>
            <TouchableOpacity
              onPress={setModalVisible}
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
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View
              style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
              <Text>Author: {bookInfo?.author}</Text>
              <Text>Title: {bookInfo?.title}</Text>
              <Text>Publish Year: {bookInfo?.publishYear}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BookDetails;

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
    padding: '5%',
  },
});
