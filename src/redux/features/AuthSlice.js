// src/redux/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk('loginUser', async ({ email, password }, { rejectWithValue }) => {
    console.log("login çalıştı")
    try {
      const response = await axios.post('http://localhost:8000/api/login', 
        { email, password },
        {headers: {
          'Content-Type': 'application/json',
        }},
      );

      if (response.status != 200) {
        const errorData = await response.data;
        return rejectWithValue(errorData.message || 'Login failed');
      }

      console.log(response.data)
      const token = await response.data.token;
      
      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', token);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);


      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'logoutUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state?.auth?.token || localStorage.getItem('token');

      // Backend'e logout isteği gönder (opsiyonel)
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // localStorage'ı temizle
      localStorage.removeItem('token');
      
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for checking authentication status
export const checkAuthStatus = createAsyncThunk(
  'checkAuthStatus',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state?.auth?.token || localStorage.getItem('token');

      if (!token) {
        return rejectWithValue('No authentication data found');
      }

      // Token'ı backend'de doğrula
      const response = await axios.post('http://localhost:8000/api/verify', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        localStorage.removeItem('token');
        return rejectWithValue('Token verification failed');
      }

      return { token };
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.message || 'Token verification failed');
    }
  }
);

const initialState = {
  token: localStorage.getItem('token') || null,
  user : null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        console.log(state.user)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.error = typeof action.payload === 'string' ? action.payload : (action.payload?.message || 'Auth check failed');
      });
  },
});

export const { clearError, resetAuthState } = AuthSlice.actions;
export default AuthSlice.reducer;