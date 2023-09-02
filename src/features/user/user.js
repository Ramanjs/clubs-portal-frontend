import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../utils/baseUrl';
import Cookies from 'js-cookie';

const initialState = {
  loggedIn: false,
  profileLoaded: false,
  token: Cookies.get('club_token'),
  handle: Cookies.get('club_handle'),
};

if (initialState.token && initialState.handle) {
  initialState.loggedIn = true;
}

export const login = createAsyncThunk('user', async (data, thunkAPI) => {
  fetch(apiBaseUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      handle: data.username,
      password: data.password
    })
  })
    .then(async res => {
      if (!res.ok) {
        res = await res.json()
        throw new Error(res.message)
      }
      return res.json()
    })
    .then(res=> {
      thunkAPI.dispatch(loadToken(res.token))
      thunkAPI.dispatch(loggedIn(true))
      thunkAPI.dispatch(setHandle(res.handle))
    })
    .catch(err => {
      data.setError(err.message)
    })
    .finally(() => {
      data.setLoading(false)
    })
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    loadToken: (state, action) => {
      state.token = action.payload;
      Cookies.set('club_token', action.payload);
    },
    setHandle: (state, action) => {
      state.handle = action.payload;
      Cookies.set('club_handle', action.payload);
    },
    logout: (state) => {
      state.loggedIn= false
      state.token = undefined
      state.handle = undefined
    }
  },
})

export const { loggedIn, loadToken, setHandle, logout } = userSlice.actions;

export default userSlice.reducer;
