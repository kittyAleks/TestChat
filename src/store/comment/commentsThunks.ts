import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {addComment, deleteCommentFromDB, getComments} from '../../db/sqlite.ts';
import {Comments, Comment} from './types';

// Actions
const commentsAction = createAction('comments/addComment');
const deleteAction = createAction('comments/deleteComment');

// Thunks
export const fetchComments = createAsyncThunk<Comments, void>(
  'comments/fetchComments',
  async () => {
    const comments = await getComments();
    return comments || [];
  },
);
export const createComment = createAsyncThunk<Comment | null, Comment>(
  commentsAction.type,
  async comment => {
    return addComment(comment);
  },
);

export const deleteComment = createAsyncThunk<string | null, string>(
  deleteAction.type,
  async (commentId: string) => await deleteCommentFromDB(commentId),
);
