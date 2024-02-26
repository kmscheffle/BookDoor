//This component is featured when the user is creating a new book to trade

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BOOK } from '../../utils/mutations';
import { QUERY_BOOKS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const BookForm = () => {
  const [bookText, setBookText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addBook, { error }] = useMutation
  (ADD_BOOK, {
    refetchQueries: [
      QUERY_BOOKS,
      'getBooks',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addBook({
        variables: {
          bookText,
          bookAuthor: Auth.getProfile().authenticatedPerson.username// TODO: Display the user's username
        },
      });

      setBookText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'bookText' && value.length <= 280) {
      setBookText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="bookText"
                placeholder="Here's a new book..."
                value={bookText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Book
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your books. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default BookForm;
