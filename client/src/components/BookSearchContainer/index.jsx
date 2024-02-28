import React, { useState } from 'react';
import SearchBooks from './SearchBooks'; // Adjust the import path as necessary
import BookResults from './BookResults'; // Component to display search results

const BookSearchContainer = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setBooks(data.docs); // Adjust according to the API response structure
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBooks onSearch={onSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <BookResults books={books} /> {/* Display the search results */}
    </div>
  );
};

export default BookSearchContainer;
