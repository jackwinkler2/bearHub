import { Link } from 'react-router-dom';
import './HomePost.css';

const formatTimeSince = (timestamp) => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now - postDate) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min${seconds < 120 ? '' : 's'} ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${seconds < 7200 ? '' : 's'} ago`;
  return `${Math.floor(seconds / 86400)} day${seconds < 172800 ? '' : 's'} ago`;
};

const HomePost = ({ title, likes, date, postId }) => {
  return (
    <Link to={`/view-post/${postId}`} className="post-card-link">
      <div className="post-card">
        <div className="post-top-bar">
          <span className="post-date">{formatTimeSince(date)}</span>
          <span className="post-likes">👍 {likes}</span>
        </div>
        <div className="post-content">
          <h3>{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default HomePost;
