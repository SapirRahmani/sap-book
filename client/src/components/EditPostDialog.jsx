import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import AddHashTags from "./AddHashTags/AddHashTags";
import { withRouter } from "react-router-dom";
import MediaElement from "./MediaElement";
import { makeStyles } from '@material-ui/core';

const mapStateToProps = (state) => {
    return {
        selectedPost: state.selectedPost,
    };
}

const EditPostDialog = ({ selectedPost, history }) => {
    const [open, setOpen] = useState(true);
    const [postToEdit, setPostToEdit] = useState(selectedPost);

    let { _id, user_name, content, date_published, file_name, tags } = postToEdit;


    const useStyles = makeStyles(theme => ({
        // textArea: {
        //     minHeight: "100px",
        //     width: "-webkit-fill-available",
        //     backgroundColor: "#424242",
        //     color: "#e0e0e0",
        // },
    }));

    const classes = useStyles();


    const handleClose = () => {
        setOpen(false);
        history.push("/");
    };

    const handleSubmit = () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/${_id}`, postToEdit)
            .then((response) => {
                console.log(response);
                history.push("/");
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                handleClose()
                history.push("/");
            });
    }

    const addDataToPost = (name, value) => {
        setPostToEdit({
            ...selectedPost,
            [name]: value
        });
    }

    const handleTextFieldChange = (e) => {
        const { name, value } = e.target;
        setPostToEdit({
            ...selectedPost,
            [name]: value
        });
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}
                maxWidth={'md'} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="user_name"
                            onChange={handleTextFieldChange}
                            value={user_name}
                            label="User Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            autoComplete="User Name"
                            autoFocus
                            required />

                        <TextareaAutosize
                            name="content"
                            className={classes.textArea}
                            onChange={handleTextFieldChange}
                            value={content}
                            label="What are you thinking about?"
                            className="text-area"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            autoFocus
                            required />
                        <AddHashTags addToPost={addDataToPost} tags={tags[0]} />
                        <MediaElement src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/media/${file_name}`} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default withRouter(connect(mapStateToProps)(EditPostDialog))

