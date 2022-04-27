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

const StyledHeader = styled.header`
  padding: ${({ theme }) => theme.spacings.small3};
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

const Header = ({ isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

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
        <>
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
            <MenuItem>
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
        </>
      )}
    </StyledHeader>
  );
};

export default Header;
