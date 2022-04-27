import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserIsLogged } from "./actions/auth";
import styled from "styled-components";

import SignInContainer from "./containers/SignInContainer";
import Campaigns from "./containers/Campaigns";
import Campaign from "./containers/Campaign";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoMatch from "./components/NoMatch";
import PATHS from "./paths";

const StyledContainer = styled.div`
  background-color: #f2f2f2;
  height: calc(100vh - 137px);
  padding: ${({ theme }) => theme.spacings.small3};
  overflow: auto;
`;

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserIsLogged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <StyledContainer>
        <Routes>
          <Route path={`${PATHS.CAMPAIGN}/:id`} element={<Campaign />} />
          <Route path={`${PATHS.CAMPAIGNS}`} element={<Campaigns />} />
          <Route path={`${PATHS.SIGNIN}`} element={<SignInContainer />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default App;
