import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { selectPost } from "../actions/Actions";
import { TimeAgo } from "@n1ru4l/react-time-ago";
import ReactHashtag from "react-hashtag";
import randomcolor from "randomcolor";
import MediaElement from "./MediaElement";

const Post = ({ dispatch, post, history }) => {
  let { _id, user_name, content, date_published, file_name, tags } = post;
  tags = JSON.parse(tags);

  const [anchorEl, setAnchorEl] = useState(null);

  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth:"750px",
      padding: "15px",
      margin: "15px auto 15px auto",

    },

    avatar: {
      fontSize: "24px",
      color: "white",
      fontWeight: "bold",
      backgroundColor: randomcolor(),
    }
  }));

  const classes = useStyles();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const editPost = () => {
    dispatch(selectPost(post));
    history.push("/edit");
  };


  const deletePost = () => {
    axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/${_id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        handleClose()
      });

  };

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar className={classes.avatar} color="primary">{user_name[0]}</Avatar>}
          titleTypographyProps={{ variant: 'h6' }}
          title={user_name}
          subheader={<TimeAgo date={new Date(date_published)}>{({ value }) => <span>{value}</span>}</TimeAgo>}
          action={
            <div>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                <MenuItem onClick={editPost} component={Link} to="/edit">Edit</MenuItem>
                <MenuItem onClick={deletePost}>Delete</MenuItem>
              </Menu>
            </div>
          } />
        <MediaElement
          src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/media/${file_name}`}/>
        <CardContent>
          <Typography variant="h6" color="textPrimary">
            {`${content}`}
          </Typography>
          <Typography variant="caption" color="primary">
            <ReactHashtag>{tags.map(tag => ` #${tag.text} `).join()}</ReactHashtag>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );

}

export default withRouter(connect()(Post))