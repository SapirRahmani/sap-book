import React, { useState } from "react";
import { Card, TextField, TextareaAutosize, Button, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import AddMediaFile from './AddMediaFile/AddMediaFile.jsx';
import AddHashTags from './AddHashTags/AddHashTags.jsx';

const AddPost = ({ dispatch }) => {

    const useStyles = makeStyles(theme => ({
        
        newPost: {
            margin: "auto",
            display: "block",
            justifyContent: "center",
            maxWidth:"750px",
            padding: "15px",
            border: " 0px solid black",
            marginTop:"15px",
        },

        textArea: {
            minHeight: "100px",
            width: "-webkit-fill-available",
            backgroundColor:"#424242",
            color:"#e0e0e0",
        },
        cardMedia: {
            width: "100%",
            height: "auto",
        },
        submitBtn:{
            fontWeight:"bold"
            
        }

    }));

    const classes = useStyles();

    const [state, setState] = useState({
        post: {
            user_name: null,
            content: null,
            date_published: null,
            tags: [],
            file: null,
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!state.post.user_name && !state.post.content && !state.post.tags) {
            return
        }

        const formData = new FormData();
        formData.append('file', state.post.file);
        formData.append('user_name', state.post.user_name);
        formData.append('content', state.post.content);
        formData.append('date_published', Date.now());
        formData.append('tags', JSON.stringify(state.post.tags));


        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/`, formData, config).then((response) => {
            console.log(response);
        })
            .catch((error) => {
                console.log(error);
            });


    }

    const handleTextFieldChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            post: {
                ...prevState.post,
                [name]: value,
                date_published: Date.now()
            }
        }));
    }

    const addDataToPost = (name, value) => {
        setState(prevState => ({
            post: {
                ...prevState.post,
                [name]: value
            }
        }));
    }

    return (
        <Card className={classes.newPost}>
            <form onSubmit={handleSubmit} name="form">

                <TextField
                    name="user_name"
                    onChange={handleTextFieldChange}
                    value={state.post.user_name}
                    label="User Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoComplete="User Name"
                    autoFocus
                    required />

                <TextareaAutosize
                    name="content"
                    onChange={handleTextFieldChange}
                    value={state.post.content}
                    placeholder="What are you thinking about?"
                    className={classes.textArea}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoFocus
                    required />
                <AddHashTags addToPost={addDataToPost} />
                <AddMediaFile addToPost={addDataToPost} />
                <Button
                className={classes.submitBtn}
                    type="submit"
                    fullWidth variant="contained"
                    color="default">
                    Post </Button>
            </form>
        </Card>
    )
}
export default connect()(AddPost)