import React, { useState, useEffect } from "react";
import { Fab } from '@material-ui/core';
import { AddAPhotoRounded } from '@material-ui/icons';
import "./AddMediaFile.css";
import MediaElement from "../MediaElement";

const AddMediaFile = (props) => {

  const [state, setState] = useState({ file: null });

  useEffect(() => {
    props.addToPost("file", state.file)
  }, [state]);


  const handleChange = (event) => {
    setState({
      file: event.target.files[0],
      file_url: URL.createObjectURL(event.target.files[0])
    })
  }

  return (
    <div className="upload-div">
      <label htmlFor="upload-input" className="upload-button" >
        {state.file ?
          (
            <MediaElement src={state.file_url} />

          ) :
          (
            <>
              <Fab component="span">
                <AddAPhotoRounded />
              </Fab>
            </>
          )}
      </label>
      <input
        type="file"
        accept="image/*,video/*"
        id="upload-input"
        onChange={handleChange}
      />
    </div>
  );

}
export default AddMediaFile