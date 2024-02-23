import { useQuery } from '@apollo/client';

import BookList from '../components/BookList';
import BookForm from '../components/CommentForm';

import { QUERY_BOOKS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const books = data?.books || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <BookForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BookList
              books={books}
              title="Some Feed for Book(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
