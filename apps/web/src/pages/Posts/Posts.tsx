import { usePosts } from '@api/post/query';
import { Loader, Message } from '@components/base';

import './Posts.scss';

const Posts = () => {
  const { data: posts = [], isLoading: isPostsLoading, isFetching: isPostsFetching } = usePosts();

  const showLoader = isPostsLoading || isPostsFetching;
  const showNoData = !showLoader && posts.length === 0;

  return (
    <div className="posts">
      <header className="posts__header">
        <h3 className="posts__title">Posts</h3>
      </header>

      <div className="posts__content">
        {showNoData ? (
          <Message
            className="posts__no-data"
            variant="warning"
            message="No posts found"
            subtitle="Once you generate a post, it will appear here."
          />
        ) : (
          <ul className="posts__list">
            {posts.map((post) => (
              <li key={post._id} className="posts__list-item">
                <h5 className="post__title">{post.title}</h5>
                <p className="post__content">{post.article}</p>
                <p className="post__tags">{post.tags.join(', ')}</p>
              </li>
            ))}
          </ul>
        )}
        {showLoader && <Loader message="Fetching posts" />}
      </div>
    </div>
  );
};

export default Posts;
