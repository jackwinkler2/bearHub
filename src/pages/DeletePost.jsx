import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const DeletePost = () => {
  const { id } = useParams(); // grabs :id from the route
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deletePost = async () => {
      // Fetch the post so we can show title in confirmation
      const { data: fetchedPost, error: fetchError } = await supabase
        .from('Bear-Posts')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching post:', fetchError.message);
        setLoading(false);
        return;
      }

      setPost(fetchedPost); // for displaying title later

      // Now delete the post
      const { error: deleteError } = await supabase
        .from('Bear-Posts')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting post:', deleteError.message);
      }

      setLoading(false);
    };

    deletePost();
  }, [id]);

  if (loading) return <p>Deleting post...</p>;

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <p>
        You deleted post <strong>{post?.id}</strong>: <strong>{post?.Title}</strong>
      </p>
      <Link to="/">Return to Home Screen</Link>
    </div>
  );
};

export default DeletePost;
