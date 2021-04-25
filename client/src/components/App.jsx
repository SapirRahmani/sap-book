import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core';

import EditPostDialog from './EditPostDialog';
import Feed from './Feed';

const App = () => {

  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: "#303030",
    },
  }));

  const classes = useStyles();

  return (

    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static" className="app-bar" color="default">
            <Toolbar>
              <IconButton edge="start" className="" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className="">
                SapBook
            </Typography>
            </Toolbar>
          </AppBar>

          <Feed />
          <Route exact path="/edit" component={EditPostDialog} />
        </div>
      </ThemeProvider >
    </Router>


  );
}

export default (App);
