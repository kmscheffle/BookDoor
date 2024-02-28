//This component is featured after the user clicks on someones book. The user is given the feature to comment on it.import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_COMMENT } from '../../utils/mutations';
import styled from 'styled-components'
import Auth from '../../utils/auth';
import { useEffect } from 'react';

const StyledContainer = styled.div`
  margin-top: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 1.5rem;
`;

const StyledHeader = styled.h4`
  background-color: #343a40;
  color: #fff;
  padding: 1rem;
  margin: 0;
  border-top-left-radius: 0.5rem; 
  border-top-right-radius: 0.5rem;
`;

const StyledTextarea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  line-height: 1.5;
  resize: vertical;
`;

const StyledButton = styled.button`
  padding: 1rem;
  background-color: #1b89bc;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom-left-radius: 0.5rem; 
  border-bottom-right-radius: 0.5rem;

  &:hover {
    background-color: #126e8f;
  }
`;

const StyledError = styled.span`
  color: #dc3545;
`;


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
    <StyledContainer>
    <StyledHeader>Add a Comment</StyledHeader>
    {Auth.loggedIn() ? (
      <StyledForm onSubmit={handleFormSubmit}>
        <p className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''}`}>
          Character Count: {characterCount}/280
          {error && <StyledError className="ml-2">{error.message}</StyledError>}
        </p>
        <StyledTextarea
          name="commentText"
          placeholder="Write your comment here..."
          value={commentText}
          className="form-input w-100"
          onChange={handleChange}
        ></StyledTextarea>
        <StyledButton type="submit">Submit Comment</StyledButton>
      </StyledForm>
    ) : (
      <p>
        You need to be logged in to share your books. Please{' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>
    )}
  </StyledContainer>
);
};

export default CommentForm;
