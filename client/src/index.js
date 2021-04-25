import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import postsReducer from './reducers/postsReducer.js'
import App from './components/App'

const initialState = {
  posts: [],
  selectedPost: [],
}

const store = createStore(postsReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <>
    <style jsx global>
      {`body {
        margin: 0px;
        padding: 0px;}
        `}
    </style>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
)