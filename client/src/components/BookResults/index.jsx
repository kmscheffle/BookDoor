import React from 'react';

const BookResults = ({ books }) => (
  <ul>
    {books.map((book) => (
      <li key={book.key}>{book.title} by {book.author_name?.join(', ')}</li> // Adjust based on the API response
    ))}
  </ul>
);

export default BookResults;
