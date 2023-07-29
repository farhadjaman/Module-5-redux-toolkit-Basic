
const store = require('./app/store');
const { increment, decrement } = require('./features/counter/counterSlice');
const { increment: dynamicIncrement, decrement: dynamicDecrement } = require('./features/dynamicCounter/dynamicCounterSlice');
const { fetchPosts } = require('./features/posts/postsSlice');
//subscribe to state changes
// store.subscribe(() => console.log(store.getState()));


//dispatch actions of counterSlice
//this action will bring changes to both counterSlice and dynamicCounterSlice  because of the extraReducers property of dynamicCounterSlice
store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(decrement());

//dispatch actions of dynamicCounterSlice
store.dispatch(dynamicIncrement(5));
store.dispatch(dynamicDecrement(2));
store.dispatch(fetchPosts())
