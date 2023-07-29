const { createSlice } = require('@reduxjs/toolkit')
const { increment: counterIncrement } = require('../counter/counterSlice')
const initialState = {
  count: 0
}
const counterSlice = createSlice({
  name: 'DynamicCounter',
  initialState,
  reducers: {
    increment(state, action) {
      state.count += action.payload;
    },
    decrement(state, action) {
      state.count -= action.payload;;
    }
  },
  extraReducers: {
    // 'counter/increment': (state, action) => {
    //   state.count += 1; //using the counterSlice action we can change the state of dynamicCounterSlice
    // }
    // [counterIncrement]: (state, action) => {
    //   state.count += 1; //using the counterSlice action we can change the state of dynamicCounterSlice
    // }
  }
})

const { increment, decrement } = counterSlice.actions;
const dynamicCounterReducer = counterSlice.reducer;

module.exports = { dynamicCounterReducer, increment, decrement }