import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Auth from "../../utils/auth";

// Styled header component
const StyledHeader = styled.header`
  background-color: #222;
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// Container for logo and slogan
const LogoContainer = styled.div`
  text-align: center;
`;

// Logo text styled with styled-components
const Logo = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #fff;
`;

// Slogan text styled with styled-components
const Slogan = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #ccc;
`;

// Container for buttons
const ButtonContainer = styled.div`
  text-align: center;
`;

// Button styled with styled-components
const Button = styled(Link)`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  color: ${(props) => (props.primary ? "#222" : "#fff")};
  background-color: ${(props) => (props.primary ? "#fff" : "transparent")};
  border: 2px solid #fff;

  &:hover {
    background-color: ${(props) => (props.primary ? "#f8f9fa" : "#444")};
    color: ${(props) => (props.primary ? "#222" : "#fff")};
  }
`;

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <StyledHeader>
      <LogoContainer>
        <Link to="/" className="text-light">
          <Logo>Book Door</Logo>
        </Link>
        <Slogan>Share your books with the world.</Slogan>
      </LogoContainer>
      <ButtonContainer>
        {Auth.loggedIn() ? (
          <>
            <Button to="/me" primary>
              {Auth.getProfile().authenticatedPerson.username + "'s profile"}
            </Button>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Button to="/login">Login</Button>
            <Button to="/signup" primary>
              Signup
            </Button>
          </>
        )}
      </ButtonContainer>
    </StyledHeader>
  );
};

export default Header;
