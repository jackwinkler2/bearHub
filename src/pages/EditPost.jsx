import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './EditPost.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Bear-Posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error.message);
        return;
      }

      setTitle(data.Title);
      setDescription(data.Description);
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    setLoading(true);
    let imageUrl = null;

    // If new image uploaded, replace image
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase
        .storage
        .from('post-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error(uploadError);
        alert('Image upload failed');
        setLoading(false);
        return;
      }

      imageUrl = `https://kfgatwgjsjmivvxmwbpp.supabase.co/storage/v1/object/public/post-images/${fileName}`;
    }

    const updatePayload = {
      Title: title,
      Description: description,
    };

    if (imageUrl) {
      updatePayload.Image = imageUrl;
    }

    const { error: updateError } = await supabase
      .from('Bear-Posts')
      .update(updatePayload)
      .eq('id', id);

    if (updateError) {
      console.error(updateError);
      alert('Failed to update post');
    } else {
      alert('Post updated!');
      navigate(`/view-post/${id}`);
    }

    setLoading(false);
  };

  return (
    <div className="edit-post-container">
      <div className="edit-post-box">
        <h2 className="edit-post-title">Edit Post</h2>

        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          className="input-box"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="input-box"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="image">Upload New Image</label>
        <input
          type="file"
          id="image"
          className="file-input"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <div className="edit-post-buttons">
          <Link to={`/delete-post/${id}`} className="delete-button">
            Delete
          </Link>
          <button
            className="submit-button"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
