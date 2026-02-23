import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const AuthorSingle = () => {
  const { nickname } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        
        // Dohvati autora po slug-u (nickname-u)
        const authorResponse = await fetch(
          `https://front2.edukacija.online/backend/wp-json/wp/v2/users?slug=${nickname}&per_page=1`
        );
        const authors = await authorResponse.json();
        
        if (authors.length === 0) {
          throw new Error('Autor nije pronađen');
        }
        
        const foundAuthor = authors[0];
        setAuthor(foundAuthor);

        // Dohvati članke autora
        const postsResponse = await fetch(
          `https://front2.edukacija.online/backend/wp-json/wp/v2/posts?author=${foundAuthor.id}&per_page=9&_embed`
        );
        const authorPosts = await postsResponse.json();
        setPosts(authorPosts);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (nickname) {
      fetchAuthorData();
    }
  }, [nickname]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">Učitavanje profila autora...</div>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error || 'Autor nije pronađen'}</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('hr-HR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container my-5">
      {/* Profil autora - CV sekcija */}
      <div className="row mb-5">
        <div className="col-lg-4 text-center text-lg-start mb-4 mb-lg-0">
          <img
            className="img-fluid rounded-circle mb-3"
            src={`https://secure.gravatar.com/avatar/${author.id}?s=200&d=mp&r=g`}
            alt={author.name}
            style={{ width: '200px', height: '200px' }}
          />
        </div>
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold mb-3">{author.name}</h1>
          <p className="lead mb-4">
            {author.description || `${author.name} - WordPress autor`}
          </p>
          <div className="row">
            <div className="col-md-6">
              <h5 className="text-primary">Username</h5>
              <p className="fs-5">{author.slug}</p>
            </div>
            {author.url && (
              <div className="col-md-6">
                <h5 className="text-primary">Web stranica</h5>
                <p className="fs-5">
                  <a href={author.url} target="_blank" rel="noopener noreferrer">
                    {author.url}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lista članaka */}
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Članci od {author.name}</h2>
          {posts.length === 0 ? (
            <div className="alert alert-info">
              Ovaj autor još nema objavljenih članaka.
            </div>
          ) : (
            <div className="row g-4">
              {posts.map((post) => (
                <BlogPost post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorSingle;
