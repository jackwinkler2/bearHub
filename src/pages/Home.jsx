import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import HomePost from '../components/HomePost';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('Bear-Posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        console.log('Fetched posts:', data);
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <HomePost
          date={post.created_at}
          likes={post.LikeCount}
          title={post.Title}
          postId={post.id}
        />
      ))}
    </div>
  );
};

export default HomePage;
