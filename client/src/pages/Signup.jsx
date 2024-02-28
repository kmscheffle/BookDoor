import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 4rem;
`;

const StyledCard = styled.div`
  width: 100%;
  max-width: 40rem;
  background-color: #f4f4f4;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledHeader = styled.h4`
  background-color: #343a40;
  color: #fff;
  padding: 1rem 2rem;
  margin: 0;
`;

const StyledCardBody = styled.div`
  padding: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledError = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #dc3545;
  color: #fff;
`;

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledMain>
      <StyledCard>
        <StyledHeader>Sign Up</StyledHeader>
        <StyledCardBody>
          {data ? (
            <p>
              Success! You may now head{" "}
              <StyledLink to="/">back to the homepage.</StyledLink>
            </p>
          ) : (
            <StyledForm onSubmit={handleFormSubmit}>
              <StyledInput
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
              <StyledInput
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <StyledInput
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <StyledButton type="submit">Submit</StyledButton>
            </StyledForm>
          )}

          {error && <StyledError>{error.message}</StyledError>}
        </StyledCardBody>
      </StyledCard>
    </StyledMain>
  );
};

export default Signup;
