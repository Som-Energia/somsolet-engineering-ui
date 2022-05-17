import styled from "styled-components";
import loading from "../assets/images/loading.svg";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <StyledContainer>
      <img alt="Loading..." src={loading} />
    </StyledContainer>
  );
};

export default Loading;
