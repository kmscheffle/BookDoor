import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled footer component
const StyledFooter = styled.footer`
  width: 100%;
  background-color: #222;
  color: #fff;
  padding: 2rem 0;
`;

// Container for footer content
const FooterContainer = styled.div`
  text-align: center;
`;

// Button styled with styled-components
const Button = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  color: #fff;
  background-color: transparent;
  border: 2px solid #fff;

  &:hover {
    background-color: #fff;
    color: #222;
  }
`;

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <StyledFooter>
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <Button onClick={() => navigate(-1)}>&larr; Go Back</Button>
        )}
        <h4>
          Made with{" "}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{" "}
          by the Book Door team.
        </h4>
      </div>
    </StyledFooter>
  );
};

export default Footer;
