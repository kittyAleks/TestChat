import {createSlice} from '@reduxjs/toolkit';
import {createComment, deleteComment, fetchComments} from './commentsThunks.ts';
import {CommentState} from './types.ts';

export const commentsSlice = createSlice<CommentState, {}, 'comments', any>({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== null) {
          if (state.comments === null) {
            state.comments = [];
          }
          state.comments.unshift(action.payload);
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(deleteComment.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.comments =
      //     state.comments?.filter(comment => comment.id !== action.payload) ??
      //     null;
      // })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== null) {
          state.comments =
            state.comments?.filter(comment => comment.id !== action.payload) ??
            null;
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const sliceName = commentsSlice.name;
export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
