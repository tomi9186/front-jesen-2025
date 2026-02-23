import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const AuthorsTable = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllAuthors = async (url = 'https://front2.edukacija.online/backend/wp-json/wp/v2/users?per_page=100') => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Greška: ${response.status}`);
      const data = await response.json();
      setAuthors((prev) => [...prev, ...data]);
      
      const nextLink = response.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
      if (nextLink) {
        await fetchAllAuthors(nextLink);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAllAuthors();
    setLoading(false);
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="alert alert-info">Učitavanje autora...</div>
    </div>
  );
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger">Greška pri dohvaćanju: {error}</div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Korisničko ime</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>
                  <Link
                    to={`/autor/${author.slug}`} 
                    className="text-decoration-none fw-bold"
                  >
                    {author.slug}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {authors.length === 0 && (
        <div className="alert alert-warning">Nema autora.</div>
      )}
    </div>
  );
};

export default AuthorsTable;
