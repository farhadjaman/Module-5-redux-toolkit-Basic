const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const axios = require('axios');
const initalState = {
  loading: false,
  posts: [],
  error: ''
}

const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (thunkAPI) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=2');
    return response.data;
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState: initalState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
    }
    ,
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    }
    ,
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  }
})


const postReducer = postSlice.reducer;
module.exports = { postReducer, fetchPosts }