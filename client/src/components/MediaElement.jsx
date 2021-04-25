import React from "react";
import { makeStyles } from '@material-ui/core';

const MediaElement = (props) => {


    const useStyles = makeStyles(theme => ({
        mediaElement: {
            width: "-webkit-fill-available",
            margin: "auto",
            display: "flex",
          }
    }));

    const classes = useStyles();

    return (<video className={classes.mediaElement}
        poster={props.src}>
        <source src={props.src} />
    </video>)

}

export default MediaElement;
