import styled from "styled-components";

const StyledContainer = styled.div`
  padding: ${({ theme }) => theme.spacings.small3};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NoMatch = () => {
  return (
    <StyledContainer>
      <p>404</p>
    </StyledContainer>
  );
};

export default NoMatch;
