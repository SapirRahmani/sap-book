import React, { useState, useEffect } from 'react';
import './AddHashTags.css';
import { WithContext as ReactTags } from 'react-tag-input';


const AddHashTags = (props) => {

    const [state, setState] = useState({
        tags: [],
    });
    useEffect(() => {
        props.addToPost("tags", state.tags)
    }, [state])



    const handleDelete = (i) => {
        const { tags } = state;
        setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    const handleAddition = (tag) => {
        setState(state => ({ tags: [...state.tags,tag ] }));
    }
    const handleDrag = (tag, currPos, newPos) => {
        const tags = [...state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setState({ tags: newTags });
    }

    const handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    }

    

    return (
        <div>
            <ReactTags
                tags={state.tags}
                suggestions={state.suggestions}
                delimiters={state.delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
            />
        </div>
    );
}
export default AddHashTags;
