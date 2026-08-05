import { useMemo, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: 'Design',
    date: '',
    readTime: '5 min read',
    color: '#7ed321',
  });

  const categories = useMemo(() => {
    const values = Array.from(new Set(posts.map((post) => post.category)));
    return ['All', ...values];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const searchValue = search.toLowerCase().trim();
      const matchesCategory = category === 'All' || post.category === category;
      const matchesSearch =
        post.title.toLowerCase().includes(searchValue) ||
        post.excerpt.toLowerCase().includes(searchValue) ||
        post.author.toLowerCase().includes(searchValue);

      return matchesCategory && (!searchValue || matchesSearch);
    });
  }, [search, category, posts]);

  const handleAddPost = (event) => {
    event.preventDefault();
    if (!newPost.title.trim() || !newPost.excerpt.trim() || !newPost.author.trim()) {
      return;
    }

    const nextPost = {
      ...newPost,
      id: String(Date.now()),
      date: newPost.date || new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setPosts((current) => [nextPost, ...current]);
    setNewPost({
      title: '',
      excerpt: '',
      author: '',
      category: 'Design',
      date: '',
      readTime: '5 min read',
      color: '#7ed321',
    });
  };

  const handleRemovePost = (postId) => {
    setPosts((current) => current.filter((post) => post.id !== postId));
  };

  const handleResetPosts = () => {
    setPosts([]);
    setCategory('All');
    setSearch('');
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Featured writing</p>
          <h1>Readable blog cards with search and filters</h1>
          <p className="subtitle">
            Add your own blog cards and then filter or search them instantly.
          </p>
        </div>
      </header>

      <section className="add-card-section">
        <h2>Add a blog card</h2>
        <form className="card-form" onSubmit={handleAddPost}>
          <div className="form-grid">
            <label>
              Title
              <input
                type="text"
                value={newPost.title}
                onChange={(event) => setNewPost({ ...newPost, title: event.target.value })}
                placeholder="Write a card title"
              />
            </label>
            <label>
              Excerpt
              <input
                type="text"
                value={newPost.excerpt}
                onChange={(event) => setNewPost({ ...newPost, excerpt: event.target.value })}
                placeholder="Write a short excerpt"
              />
            </label>
            <label>
              Author
              <input
                type="text"
                value={newPost.author}
                onChange={(event) => setNewPost({ ...newPost, author: event.target.value })}
                placeholder="Author name"
              />
            </label>
            <label>
              Category
              <input
                type="text"
                value={newPost.category}
                onChange={(event) => setNewPost({ ...newPost, category: event.target.value })}
                placeholder="Card category"
              />
            </label>
            <label>
              Date
              <input
                type="date"
                value={newPost.date}
                onChange={(event) => setNewPost({ ...newPost, date: event.target.value })}
              />
            </label>
            <label>
              Read time
              <input
                type="text"
                value={newPost.readTime}
                onChange={(event) => setNewPost({ ...newPost, readTime: event.target.value })}
                placeholder="e.g. 5 min read"
              />
            </label>
            <label>
              Color
              <input
                type="color"
                value={newPost.color}
                onChange={(event) => setNewPost({ ...newPost, color: event.target.value })}
              />
            </label>
          </div>
          <button className="submit-btn" type="submit">
            Add blog card
          </button>
        </form>
      </section>

      <section className="controls">
        <div className="search-control">
          <label htmlFor="search">Search posts</label>
          <input
            id="search"
            type="search"
            placeholder="Search by title, author, or excerpt"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-control">
          <label htmlFor="category">Filter by category</label>
          <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="actions">
          <button type="button" className="secondary-btn" onClick={handleResetPosts}>
            Reset blog cards
          </button>
        </div>
      </section>

      <section className="results">
        <p className="result-meta">
          Showing {filteredPosts.length} of {posts.length} posts
          {category !== 'All' ? ` in ${category}` : ''}
          {search ? ` matching “${search}”` : ''}
        </p>
        <div className="card-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="card-image" style={{ backgroundColor: post.color }}>
                  <span>{post.category}</span>
                </div>
                <div className="card-body">
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </div>
                <footer className="card-footer">
                  <div>
                    <strong>{post.author}</strong>
                    <span>{post.date}</span>
                  </div>
                  <div className="footer-actions">
                    <span className="read-time">{post.readTime}</span>
                    <button type="button" className="remove-btn" onClick={() => handleRemovePost(post.id)}>
                      Remove
                    </button>
                  </div>
                </footer>
              </article>
            ))
          ) : (
            <p className="empty-state">No blog cards yet. Use the form above to add one.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
