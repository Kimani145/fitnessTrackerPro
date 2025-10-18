import React, { useEffect, useState } from 'react';
import Alert from '../ui/Alert';
import { handleFetchResponse } from '../services/api';

type Post = {
  _id: string;
  content: string;
  createdAt: string;
  user: { _id?: string; name?: string } | string;
};

const Social: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [posting, setPosting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      setErrorMsg('Please login to post.');
      return;
    }
    setErrorMsg('');
    setSuccessMsg('');
    setPosting(true);
    try {
      const token = JSON.parse(userInfo).token;
      await handleFetchResponse(
        await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newPost }),
        })
      );
      setNewPost('');
      setSuccessMsg('Post created');
      fetchPosts();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to create post');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Social</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Create Post</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {errorMsg && <div className="mb-3"><Alert type="error">{errorMsg}</Alert></div>}
          {successMsg && <div className="mb-3"><Alert type="success">{successMsg}</Alert></div>}
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            rows={3}
            placeholder="Share something with the community"
          />
          <div>
            <button
              onClick={handleCreatePost}
              disabled={posting}
              className={`px-4 py-2 ${posting ? 'bg-blue-300' : 'bg-blue-600'} text-white rounded`}
            >
              Post
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Community Feed</h2>
        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map((p) => (
              <div key={p._id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{typeof p.user === 'string' ? 'User' : p.user?.name ?? 'User'}</p>
                    <p className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-800">{p.content}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Social;
