const { createSlice } = require('@reduxjs/toolkit');


//initial state
const initialState = {
  count: 0
}

//reducer
const counterSlice = createSlice({ //createSlice recieves an object with name, initialState and reducers
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action) {
      state.count++
    },
    decrement(state, action) {
      state.count--
    }
  }
})

//actions
const { increment, decrement } = counterSlice.actions

//reducer
const counterReducer = counterSlice.reducer

module.exports = {
  counterReducer,
  increment,
  decrement,
}
