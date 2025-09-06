import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    token : "",
    posts : [],
    language : false,
    dark : false
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setToken : (state, action) => {
      state.token = action.payload;
    },
    setPosts : (state, action) => {
      state.posts = action.payload;
    },
    setLanguage : (state, action) => {
      state.language = action.payload;
    },
    setDarkMode : (state, action) => {
      state.dark = action.payload;
    },
  },
});

export const {setUser , setToken ,setPosts , setLanguage , setDarkMode } = authSlice.actions;
export default authSlice.reducer;
