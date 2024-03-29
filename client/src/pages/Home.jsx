import { useQuery } from '@apollo/client';

import BookList from '../components/BookList';
import BookForm from '../components/BookForm';

import { QUERY_BOOKS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const books = data?.books || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
        >
          <BookForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BookList
              books={books}
              title="Books"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
