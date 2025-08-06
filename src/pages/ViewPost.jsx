import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './ViewPost.css';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Bear-Posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error.message);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div className="view-post-loading">Loading...</div>;

  const handleLike = async () => {
    const { data, error } = await supabase
      .from('Bear-Posts')
      .update({ LikeCount: post.LikeCount + 1 })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error liking post:', error.message);
    } else {
      setPost(data); // update local state with new LikeCount
    }
  };

  return (
    <div className="view-post-container">
      <div className="view-post-card">
        {/* Top right button container */}
        <div className="post-actions">
          <Link to={`/delete-post/${id}`} className="post-action">
            <div>❌</div>
            <span>Remove</span>
          </Link>
          <Link to={`/edit-post/${id}`} className="post-action">
            <div>✏️</div>
            <span>Edit</span>
          </Link>
          <span className="post-action" onClick={handleLike}>
            <div>👍 {post.LikeCount}</div>
            <span>Like</span>
          </span>
        </div>

        <h2 className="view-post-title">{post.Title}</h2>
        <p className="view-post-description">
          <strong>Description:</strong> {post.Description}
        </p>
        {post.Image && (
          <img src={post.Image} alt="Post" className="view-post-image" />
        )}
      </div>
    </div>
  );
};

export default ViewPost;
