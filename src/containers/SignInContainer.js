import { useDispatch } from "react-redux";
import { signIn } from "../actions/auth";
import SignInForm from "../components/SignInForm";
import styled from "styled-components";
import { useNavigate } from "react-router";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SignInContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (data) => dispatch(signIn(data, navigate));

  return (
    <StyledContainer>
      <SignInForm handleSignIn={handleSignIn} />
    </StyledContainer>
  );
};

export default SignInContainer;
