import styled from "styled-components";
import cuca from "../assets/images/cuca.png";
import { IconButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AccountCircle from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import { useTheme } from "styled-components";
import { signOut } from "../actions/auth";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PATHS from "../paths";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const StyledHeader = styled.header`
  padding: ${({ theme }) => theme.spacings.small3};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledContainer = styled.div`
  gap: ${({ theme }) => theme.spacings.small3};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.small3};
  font-size: 18px;
  > img {
    max-width: 60px;
    display: block;
  }
  > h3 {
    margin: 0;
    white-space: nowrap;
    color: ${({ theme }) => theme.color.charcoal600};
  }
`;

const StyledLink = styled((props) => <NavLink {...props} />)`
  color: ${({ theme }) => theme.color.charcoal600};

  &.active {
    font-weight: bold;
  }
`;

const Header = ({ isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <StyledHeader>
      <StyledAnchor href="/">
        <img src={cuca} alt="Som Energia" />
        <h3>SOM SOLET</h3>
      </StyledAnchor>
      {isAuthenticated && (
        <StyledContainer>
          <StyledLink
            to={PATHS.CAMPAIGNS}
            isActive={(isActive) => (isActive ? "active" : "")}
          >
            {t("CAMPAIGNS")}
          </StyledLink>
          <StyledLink
            to={PATHS.PROJECTS}
            isActive={(isActive) => (isActive ? "active" : "")}
          >
            Projects
          </StyledLink>
          <StyledLink
            to={PATHS.CALENDAR}
            isActive={(isActive) => (isActive ? "active" : "")}
          >
            Calendar
          </StyledLink>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle
              fontSize="large"
              sx={{ color: theme.color.charcoal600 }}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate(PATHS.PROFILE)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </StyledContainer>
      )}
    </StyledHeader>
  );
};

export default Header;
