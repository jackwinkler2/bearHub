import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    setLoading(true);

    let imageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase
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

    const { error: insertError } = await supabase.from('Bear-Posts').insert({
      Title: title,
      Description: description,
      Image: imageUrl,
    });

    if (insertError) {
        console.error('Insert error:', insertError);
        alert('Post creation failed: ' + insertError.message);
        } else {
        alert('Post created successfully!');
    }

    setLoading(false);
  };

  return (
    <div className="create-post-container">
      <div className="create-post-box">
        <h2 className="create-post-title">Create Post</h2>

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

        <label htmlFor="image">Image Upload</label>
        <input
          type="file"
          id="image"
          className="file-input"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button className="create-button" onClick={handleCreate} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
