import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './ViewPost.css';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch post
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

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('Comments')
        .select('*')
        .eq('user', id) // 'user' holds the post ID
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error.message);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  // Submit new comment
  const handleAddComment = async () => {
    if (!commentInput.trim()) {
      alert('Comment cannot be empty.');
      return;
    }

    const { error } = await supabase.from('Comments').insert([
      {
        user: id,           // associate with this post
        comment: commentInput.trim(),
      }
    ]);

    if (error) {
      console.error('Error adding comment:', error.message);
      alert('Failed to add comment.');
    } else {
      setCommentInput('');
      // Refresh comment list
      const { data, error: fetchError } = await supabase
        .from('Comments')
        .select('*')
        .eq('user', id)
        .order('created_at', { ascending: true });

      if (fetchError) {
        console.error('Error refreshing comments:', fetchError.message);
      } else {
        setComments(data);
      }
    }
  };

  // Handle like
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
      setPost(data);
    }
  };
  
  if (!post) return <div className="view-post-loading">Loading...</div>;

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

      {/* Comment section */}
      <div className="comment-section">
        <h3>Add Comment:</h3>
        <textarea
          className="comment-box"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          rows={3}
          placeholder="Write your comment here..."
        />
        <button className="submit-comment-button" onClick={handleAddComment}>
          Submit
        </button>
        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <p className="text-black">{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
