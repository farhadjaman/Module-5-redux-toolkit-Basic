const configureStore = require('@reduxjs/toolkit').configureStore;
const { counterReducer } = require('../features/counter/counterSlice');
const { dynamicCounterReducer } = require('../features/dynamicCounter/dynamicCounterSlice');
const { postReducer } = require('../features/posts/postsSlice');
const { createLogger } = require('redux-logger');



const rootReducer = { //combining all the reducers in one object to pass to configureStore
  counter: counterReducer,
  dynamicCounter: dynamicCounterReducer,
  post: postReducer
};


//middleware
const logger = createLogger({
  // ...options
});

const middleware = [
  logger,

]; //we can add middleware here


const store = configureStore({ //configureStore recieves an object with reducer 
  reducer: rootReducer,

  //this function will return all the middlewares
  //rtk uses some middlewares by default, we can add more middlewares here
  //we have to return the default middlewares, otherwise rtk will not work
  //so we will add custom middleware with the default middlewares and return them
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(middleware);
  }

});

module.exports = store;
