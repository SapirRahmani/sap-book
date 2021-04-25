

const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case 'ADD_POST':
      {
        const data = [action.post, ...state.posts]
        return {
          ...state,
          posts: data
        }
      }
    case 'GET_POSTS': {
      return {
        ...state, posts: action.posts
      }
    }
    case 'ADD_POSTS': {
      let data  = [...state.posts, ...action.posts]

      debugger
      return {
        ...state,
        posts: data
      }
    }
    case 'REMOVE_POST': {
      const posts = state.posts.filter(post => post._id !== action._id);
      return { ...state, posts: posts };
    }

    case 'UPDATE_POST': {
      debugger
      const postsWithoutUpdatedPost = state.posts.filter(post => post._id !== action.updatedPost._id);
      const data = [action.updatedPost, ...postsWithoutUpdatedPost]

      return { ...state, posts: data };
    }
    case 'SELECT_POST': {
      return {
        ...state, selectedPost: action.selectedPost
      }
    }
    default:
      return state
  }
}

export default postsReducer