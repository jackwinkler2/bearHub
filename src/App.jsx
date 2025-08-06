import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import HomePage from './pages/Home';
import ViewPost from './pages/ViewPost';
import DeletePost from './pages/DeletePost';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/view-post/:id" element={<ViewPost />} />
          <Route path="/delete-post/:id" element={<DeletePost />} />
        </Routes>
    </Router>
  );
}

export default App;
