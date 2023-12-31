import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { QUERY_ME } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [deleteBook] = useMutation(DELETE_BOOK)

  const userData = data?.me || {};
  // console.log(userData)

  if (loading) {
    return <div>Loading...</div>;
  }
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (book) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteBook({
        variables: { 
          bookData: {
            bookId: book.bookId,
            authors: book.authors,
            title: book.title,
            image: book.image,
            description: book.description,
          }
         }
      });
      // upon success, remove book's id from localStorage
      removeBookId(book.bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
