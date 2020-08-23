import React, { useState, useRef, useMemo } from "react";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, update } from "../actions/userActions";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    width: "41%",
    paddingLeft: "auto",
    order: "2",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    height: "27px",
    padding: "4px",
    fontSize: "16px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch"
    }
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  sectionDesktop: {
    display: "none",
    order: "2",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    order: "2",

    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function NavBar({ onClickNavbar, status, onClickOverLay }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector(state => state.cart);

  const productList = useSelector(state => state.productList);

  const categoryList = [...new Set(productList.products.map(c => c.category))];

  const { cartItems } = cart;

  let drawer = {};
  drawer[status.anchor] = status.open ? true : false;

  const [state, setState] = React.useState(drawer);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/signin");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile">Profile</Link>
      </MenuItem>

      <Divider />

      {userInfo && userInfo.isAdmin && (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/admin/orders">Order Details</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/admin/inventory">Inventory Details</Link>
          </MenuItem>
        </>
      )}

      <MenuItem onClick={handleMenuClose}>
        <Link to="#" onClick={handleLogout}>
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!userInfo && (
        <MenuItem onClick={handleMenuClose}>
          <Link to="/signin">Signin</Link>
        </MenuItem>
      )}

      {userInfo && userInfo.isAdmin && (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/admin/orders">Order Details</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/admin/inventory">Inventory Details</Link>
          </MenuItem>
        </>
      )}

      {userInfo && (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/profile">Profile</Link>
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categoryList.length > 0 &&
          categoryList.map(c => (
            <ListItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText onClick={() => onClickOverLay(false)}>
                <Link to={`/category/${c}`}>{c}</Link>
              </ListItemText>
            </ListItem>
          ))}
        {/* <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText onClick={() => onClickOverLay(false)}>
            <Link to="/category/Pants">Shirts</Link>
          </ListItemText>
        </ListItem> */}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      history.push("/search/" + event.target.value);
    }
  };

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => onClickNavbar(true)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ color: "#fff", fontSize: "25px" }}>
              Online Shop
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onKeyDown={handleKeyDown}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                onClick={() => history.push("/cart")}
                aria-label={`You have ${cartItems.length} items in cart`}
                color="inherit"
              >
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart fontSize="large" />
                </Badge>
              </IconButton>
              {userInfo ? (
                <IconButton
                  edge="end"
                  aria-label={`account of ${userInfo.name}`}
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                  <Button color="inherit" style={{ fontSize: "14px" }}>
                    {userInfo.name}
                  </Button>
                </IconButton>
              ) : (
                <IconButton
                  edge="end"
                  aria-label="Login"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                  <Button
                    color="inherit"
                    style={{ fontSize: "14px" }}
                    onClick={history.push("/signin")}
                  >
                    SignIn
                  </Button>
                </IconButton>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                onClick={() => history.push("/cart")}
                aria-label={`You have ${cartItems.length} items in cart`}
                color="inherit"
              >
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart fontSize="large" />
                </Badge>
              </IconButton>

              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <Drawer
        anchor={status.position}
        open={status.open}
        onClose={() => onClickOverLay(false)}
      >
        {list(status.position)}
      </Drawer>
    </>
  );
}
