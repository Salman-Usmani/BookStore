import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ViewBooks from './components/ViewBooks';
import AddUpdateBook from './components/AddUpdateBooks';
import DeleteBook from './components/DeleteBook';
import BookDetails from './components/BookDetails';

interface IBook {
  // visibleScreen: 'AUTH' | 'BOOK';
  token: string;
  // setVisibleScreen: React.Dispatch<React.SetStateAction<'AUTH' | 'BOOK'>>;
}
interface IBookProps {
  title: string;
  author: string;
  publishYear: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}
const Book = (props: IBook) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = React.useState(false);
  const [books, setBooks] = React.useState<IBookProps[]>([]);
  const [bookSelected, setBookSelected] = React.useState<IBookProps>();
  const [showBookModal, setShowBookModal] = React.useState<
    'DELETE' | 'UPDATE' | 'VIEW' | ''
  >('');

  const getAllBooks = async () => {
    try {
      const options = {
        methods: 'GET',
        headers: {
          'Content-Type': 'applicaton/json',
          Authorization: `Bearer ${props.token}`,
        },
      };
      const postResponse = await fetch(
        'http://localhost:3000/books',
        options,
      ).then(value => value.json());
      if (postResponse) {
        setBooks(postResponse?.books);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <Text style={styles.heading}>Books</Text>

        <TouchableOpacity
          onPress={() => {
            setShowBookModal('UPDATE');
          }}
          style={{
            borderWidth: 0.5,
            borderRadius: 5,
            paddingHorizontal: 5,
            backgroundColor: 'dodgerblue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 20,
              textAlignVertical: 'center',
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        renderItem={({item}) => (
          <ViewBooks
            item={item}
            onUpdate={(item: IBookProps) => {
              setBookSelected(item);
              setShowBookModal('UPDATE');
            }}
            onDelete={(item: IBookProps) => {
              setBookSelected(item);
              setShowBookModal('DELETE');
            }}
            onView={(item: IBookProps) => {
              setBookSelected(item);
              setShowBookModal('VIEW');
            }}
          />
        )}
        style={styles.listStyle}
        ListEmptyComponent={<Text>No Books Found</Text>}
      />
      {showBookModal === 'UPDATE' && (
        <AddUpdateBook
          modalVisible={showBookModal === 'UPDATE' ? true : false}
          setModalVisible={() => {
            setBookSelected(undefined);
            setShowBookModal('');
          }}
          setBooks={item => {
            setBookSelected(undefined);
            const index = books.findIndex(book => book._id === item._id);
            if (index !== -1) {
              let tempBooks = [...books];
              tempBooks[index] = item;
              setBooks([...tempBooks]);
            } else {
              setBooks([item, ...books]);
            }
          }}
          token={props.token}
          bookSelected={bookSelected}
        />
      )}
      {showBookModal === 'DELETE' && bookSelected && (
        <DeleteBook
          setModalVisible={() => {
            setBookSelected(undefined);
            setShowBookModal('');
          }}
          modalVisible={showBookModal === 'DELETE' ? true : false}
          bookSelected={bookSelected}
          postDelete={item => {
            setBookSelected(undefined);

            let tempBooks = books.filter(book => book._id !== item._id);
            setBooks(tempBooks);
          }}
          token={props.token}
        />
      )}
      {showBookModal === 'VIEW' && (
        <BookDetails
          setModalVisible={() => {
            setBookSelected(undefined);
            setShowBookModal('');
          }}
          modalVisible={showBookModal === 'VIEW' ? true : false}
          token={props.token}
          _id={bookSelected?._id || ''}
        />
      )}
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, padding: '5%', gap: 15},
  listStyle: {
    gap: 10,
  },
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
