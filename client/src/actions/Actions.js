export const addPost = post => ({
    type: 'ADD_POST',
    post,
});

export const getAllPosts = posts => ({
    type: 'GET_POSTS',
    posts,
});
export const addPosts = posts => ({
    type: 'ADD_POSTS',
    posts,
});

export const selectPost = selectedPost => ({
    type: 'SELECT_POST',
    selectedPost,
});

export const removePost = _id => ({
    type: 'REMOVE_POST',
    _id,
});

export const updatePost = updatedPost => ({
    type: 'UPDATE_POST',
    updatedPost,
});

