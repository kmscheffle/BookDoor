//This component is featured when the user is creating a new book to trade

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import styled from "styled-components";

import { ADD_BOOK } from "../../utils/mutations";
import { QUERY_BOOKS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const StyledFormContainer = styled.div`
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

const StyledHeader = styled.h3`
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

  &:hover {
    background-color: #126e8f;
  }
`;

const StyledError = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #dc3545;
  color: #fff;
`;

const BookForm = () => {
  const [bookText, setBookText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addBook, { error }] = useMutation(ADD_BOOK, {
    refetchQueries: [QUERY_BOOKS, "getBooks", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addBook({
        variables: {
          bookText,
          bookAuthor: Auth.getProfile().authenticatedPerson.username, // TODO: Display the user's username
        },
      });

      setBookText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "bookText" && value.length <= 280) {
      setBookText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <StyledFormContainer>
      <StyledHeader>Add Book</StyledHeader>
      {Auth.loggedIn() ? (
        <StyledForm onSubmit={handleFormSubmit}>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <StyledTextarea
            name="bookText"
            placeholder="Here's a new book..."
            value={bookText}
            className="form-input w-100"
            onChange={handleChange}
          ></StyledTextarea>
          <StyledButton type="submit">Add Book</StyledButton>
          {error && <StyledError>{error.message}</StyledError>}
        </StyledForm>
      ) : (
        <p>
          You need to be logged in to share your books. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      )}
    </StyledFormContainer>
  );
};

export default BookForm;
