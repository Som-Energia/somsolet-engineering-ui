import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: ${({ theme }) => theme.spacings.small3};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.charcoal700};
  color: white;
`;
const Footer = () => {
  return (
    <StyledFooter>
      <p>Som Energia © 2022 | Made with 💚 and open source</p>
    </StyledFooter>
  );
};

export default Footer;
