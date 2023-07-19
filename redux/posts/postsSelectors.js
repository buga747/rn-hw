export const selectAllPosts = (state) => state.posts.posts;

export const selectCurrentUserPosts = (state) => {
  return state.posts.posts.filter(
    (item) => item.uid === state.authorization.userId
  );
};

export const selectComments = (state, postId) => {
  const post = state.posts.posts.find((item) => item.id === postId);
  return post ? post.comments : [];
};
