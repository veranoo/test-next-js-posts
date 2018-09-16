import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

class ApiService {
  CancelToken = axios.CancelToken;
  cancel;

  request({ url }) {
    return axios.get(url, {
      cancelToken: new this.CancelToken((c) => {
        this.cancel = c;
      })
    })
        .then(response => response.data);
  }

  fetchPosts() {
    return this.request({ url: 'https://jsonplaceholder.typicode.com/posts/' })
  }

  fetchPost({ id }) {
    return this.request({ url: `https://jsonplaceholder.typicode.com/posts/${id}` });
  }

  abort() {
    if (typeof this.cancel !== 'function') {
      return;
    }

    this.cancel();
  }
}

const exampleInitialState = {
  posts: [],
  post: {},
  loading: false
};

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
  FETCH: 'FETCH',
  FETCH_POSTS: 'FETCH_POSTS',
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POST_SUCCESS: 'FETCH_POST_SUCCESS',
  FETCH_POSTS_ERROR: 'FETCH_POSTS_ERROR'
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, { lastUpdate: action.ts, light: !!action.light });
    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload
      };
    case actionTypes.SHOW_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_POST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        post: action.payload
      };
    default:
      return state
  }
};

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD })
};

export const fetchPosts = () => {
  return {
    type: actionTypes.FETCH,
    method: 'fetchPosts',
    params: {}
  }
};

export const getPosts = () => async (dispatch, getState, { apiService }) => {
  try {
    const posts = await apiService.fetchPosts();
    dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: posts })
  } catch (e) {
    console.log(e);
  }
};

export const fetchPost = (id) => async (dispatch, getState, { apiService }) => {
  try {
    const post = await apiService.fetchPost({ id });
    dispatch({ type: actionTypes.FETCH_POST_SUCCESS, payload: post })
  } catch (e) {
    console.log(e);
  }
};

export const abortRequest = () => (dispatch, getState, { apiService }) => {
  apiService.abort();
};

export const initStore = (initialState = exampleInitialState) => {
  const apiService = new ApiService();
  return createStore(
      reducer,
      initialState,
      composeWithDevTools(
          applyMiddleware(
              thunkMiddleware.withExtraArgument({ apiService }),
          )
      )
  )
};
