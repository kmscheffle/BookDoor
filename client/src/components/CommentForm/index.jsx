//This component is featured after the user clicks on someones book. The user is given the feature to comment on it.import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';
import { useEffect } from 'react';

const CommentForm = ({ bookId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
const variableData = {bookId,
          commentText,
          commentAuthor: Auth.getProfile().authenticatedPerson.username 
        }
        console.log("variable data", variableData)

          
    try {
      const { data } = await addComment({
        variables: {
          bookId,
          commentText,
          commentAuthor: Auth.getProfile().authenticatedPerson.username // Display the user's username
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What book would you like to trade?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your book..."
                value={commentText}
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

export default CommentForm;
