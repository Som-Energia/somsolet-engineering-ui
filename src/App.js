import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserIsLogged } from "./actions/auth";
import styled from "styled-components";

import "./i18n/i18n";

import SignInContainer from "./containers/SignInContainer";
import Campaigns from "./containers/Campaigns";
import Profile from "./containers/Profile";
import Campaign from "./containers/Campaign";
import Projects from "./containers/Projects";
import Project from "./containers/Project";
import Calendar from "./containers/Calendar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoMatch from "./components/NoMatch";
import PATHS from "./paths";
import { useTranslation } from "react-i18next";

const StyledContainer = styled.div`
  background-color: #f2f2f2;
  height: calc(100vh - 138px);
  padding: ${({ theme }) => theme.spacings.small3};
  overflow: auto;
`;

const App = () => {
  const { isAuthenticated, language } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(checkUserIsLogged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    language && i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <StyledContainer>
        <Routes>
          <Route path={`${PATHS.SIGNIN}`} element={<SignInContainer />} />
          <Route path={`${PATHS.CAMPAIGNS}`} element={<Campaigns />} />
          <Route path={`${PATHS.CAMPAIGN}/:id`} element={<Campaign />} />
          <Route path={`${PATHS.PROJECTS}/`} element={<Projects />} />
          <Route path={`${PATHS.PROJECT}/:id`} element={<Project />} />
          <Route path={`${PATHS.CALENDAR}/`} element={<Calendar />} />
          <Route path={`${PATHS.PROFILE}`} element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default App;
