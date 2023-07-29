const axios = require('axios')
const { createStore, applyMiddleware } = require('redux')
const thunkMiddleware = require('redux-thunk').default
const { createLogger } = require('redux-logger');
//middleware
const logger = createLogger({
  // ...options
});


//initial state
const initialState = {
  loading: false,
  posts: [],
  error: ''
}

const fetchPostsRequested = () => {
  return {
    type: 'post/fetchPostsRequested'
  }
}

const fetchPostsSucceeded = (posts) => {
  return {
    type: 'post/fetchPostsSucceeded',
    payload: posts
  }
}

const fetchPostsFailed = (error) => {
  return {
    type: 'post/fetchPostsFailed',
    payload: {
      message: error
    }
  }
}

//reducer
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'post/fetchPostsRequested':
      return {
        ...state,
        loading: true
      }
    case 'post/fetchPostsSucceeded':
      return {
        ...state,
        loading: false,
        posts: action.payload
      }
    case 'post/fetchPostsFailed':
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        posts: []
      }
    default:
      return state
  }
}

//from where the thunk function is receieving dispatch as an argument?
//we are passing the thunk function to the dispatch function
//dispatch(fetchPosts()) //this will dispatch the thunk function which will dispatch the other actions
//so the thunk function is receieving dispatch as an argument from the dispatch function
//so the thunk function is receieving dispatch as an argument from the dispatch function
//thunk function
const fetchPosts = () => { //
  return async (dispatch) => { //thunk function returns a function which recieves dispatch as an argument & dispatches actions 
    try {
      dispatch(fetchPostsRequested())
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      const posts = await response.data
      dispatch(fetchPostsSucceeded(posts))
    }
    catch (error) {
      dispatch(fetchPostsFailed(error.message))
    }

  }
}


//create store
//we can add multiple middlewares here
const store = createStore(postReducer, applyMiddleware(thunkMiddleware, logger))


//subscribe to state changes
// store.subscribe(() => console.log(store.getState()))


//dispatch actions
store.dispatch(fetchPosts()) //this will dispatch the thunk function which will dispatch the other actions