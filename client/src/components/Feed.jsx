import React, { useEffect, useState } from "react";
import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import openSocket from "socket.io-client";
import { connect } from 'react-redux';
import PostList from './PostList';
import AddPost from './AddPost';
import { addPost, removePost, updatePost } from '../actions/Actions'

const socket = openSocket(`http://localhost:${process.env.REACT_APP_SOCKET_IO_PORT}`);

const Feed = ({ dispatch }) => {
    const useStyles = makeStyles(theme => ({
    }));

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        // fetch(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/`)
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res);
        //         dispatch(getAllPosts(res));
        //     })
        //     .catch(() => console.log('error with get all'))

        socket.on("insertPost", data => {
            dispatch(addPost(data));
            setAlertMessage("Insert post successfully")
            handleClick()
        });

        socket.on("removePost", _id => {
            dispatch(removePost(_id));
            setAlertMessage("Removed post successfully")
            handleClick()
        });


        socket.on("updatePost", data => {
            dispatch(updatePost(data));
            setAlertMessage("Post update successfully")
            handleClick()
        });

    }, []);


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div>
            <AddPost />
            <PostList />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )

}

export default connect()(Feed)