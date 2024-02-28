import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_BOOK } from '../utils/queries';

const StyledContainer = styled.div`
  margin-top: 2rem;
`;

const StyledHeader = styled.h3`
  background-color: #343a40;
  color: #fff;
  padding: 1rem 2rem;
  margin: 0;
`;

const StyledQuote = styled.blockquote`
  font-size: 1.5rem;
  font-style: italic;
  border: 2px solid #1a1a1a;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const SingleBook = () => {
  const { bookId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_BOOK, {
    variables: { bookId },
  });

  const book = data?.book || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <StyledContainer>
      <StyledHeader>
        {book.bookAuthor} <br />
        <span style={{ fontSize: '1rem' }}>had this book on {book.createdAt}</span>
      </StyledHeader>
      <div className="bg-light py-4">
        <StyledQuote>{book.bookText}</StyledQuote>
      </div>
      <div className="my-5">
        <CommentList comments={book.comments} />
      </div>
      <div className="m-3 p-4">
        <CommentForm bookId={book._id} />
      </div>
    </StyledContainer>
  );
};

export default SingleBook;