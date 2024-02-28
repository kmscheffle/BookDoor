//This component is featured on the home page. This is displaying everyones post and the date they were posted.
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const StyledBookList = styled.div`
  margin-top: 2rem;
`;

const StyledCard = styled.div`
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
`;

const StyledCardHeader = styled.div`
  background-color: #343a40;
  color: #fff;
  padding: 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const StyledCardBody = styled.div`
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
`;

const StyledButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #1b89bc;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007299;
`;

const BookList = ({
  books,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!books) {
    return <h3>No Books Yet</h3>;
  }
    // console.log('bookLength',books.length)

  return (
    <StyledBookList>
    {showTitle && <h3>{title}</h3>}
    {books.map((book) => (
      <StyledCard key={book._id}>
        <StyledCardHeader>
          {showUsername ? (
            <StyledLink to={`/profiles/${book.bookAuthor}`}>
              {book.bookAuthor} <br />
              <span style={{ fontSize: '0.8rem' }}>
                had this book on {book.createdAt}
              </span>
            </StyledLink>
          ) : (
            <span style={{ fontSize: '0.8rem' }}>
              You had this book on {book.createdAt}
            </span>
          )}
        </StyledCardHeader>
        <StyledCardBody>
          <p>{book.bookText}</p>
        </StyledCardBody>
        <StyledButton to={`/books/${book._id}`}>
          Join the discussion on this book.
        </StyledButton>
      </StyledCard>
    ))}
  </StyledBookList>
);
};

export default BookList;
