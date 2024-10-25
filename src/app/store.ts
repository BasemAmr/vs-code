import { configureStore } from '@reduxjs/toolkit'
import fileTreeSlice from './features/fileTreeSlice'

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `fileTree`, handled by `fileTreeSlice`
    fileTree: fileTreeSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch