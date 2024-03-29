import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import BookForm from "../components/CommentForm";
import BookList from "../components/BookList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() &&
    /* TODO: Check if the user's username is strictly equal to the userParam variable's value */
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <BookList
            books={user.books}
            title={`${user.username}'s books...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div className="col-12 col-md-10 mb-3 p-3">
            <BookForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
