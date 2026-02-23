import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "./Blog.css";

const BASE_URL = process.env.REACT_APP_API_URL

const Lokali = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [djelatnosti, setDjelatnosti] = useState([]);
  const [izabranaDjelatnost, setIzabranaDjelatnost] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}v2/djelatnost`)
      .then((response) => response.json())
      .then((data) => setDjelatnosti(data));
  }, []);

  useEffect(() => {
    setLoading(true);

    let url = `${BASE_URL}v2/lokal?_embed`;
    if (izabranaDjelatnost) url += "&djelatnost=" + izabranaDjelatnost;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, [izabranaDjelatnost]);

  return (
    <>
      {loading && <Loader />}
      <div className="blog-page">
        <div className="container">
          <h1>Lokali</h1>
          <div className="row mb-4">
            <div className="col-6">
              <select className="form-select" value={izabranaDjelatnost} onChange={(e) => setIzabranaDjelatnost(e.target.value)}>
                <option value="">Sve djelatnosti</option>
                {djelatnosti.map((djelatnost) => (
                  <option key={djelatnost.id} value={djelatnost.id}>{djelatnost.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            {posts.map((post) => {
              const image =
                post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
                  ?.full?.source_url;

              return (
                <div key={post.id} className="col-md-4 mb-4 blog-post">
                  {image && (
                    <Link to={'/lokal/' + post.slug}>
                    <img
                      src={image}
                      className="mb-3"
                      alt={post.title.rendered}
                    />
                    </Link>
                   )}
                  <Link to={'/lokal/' + post.slug}>   
                    <h2>{post.title.rendered}</h2>
                  </Link>

                  <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />

                  <p>
                    {post._embedded?.author?.[0]?.name} |{" "}
                    {new Date(post.date).toLocaleDateString("hr-HR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lokali;
