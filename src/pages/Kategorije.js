import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";
import ScrollToTop from "../components/ScrollToTop";
import BlogPost from "../components/BlogPost";

const BASE_URL = process.env.REACT_APP_API_URL

const Kategorije = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}v2/categories`)
      .then((response) => response.json())
      .then((data) => setCategory(data));
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);

    const per_page = 3;

    fetch(
      `${BASE_URL}v2/posts?categories=${selectedCategory}&per_page=${per_page}&current_page=${currentPage + 1}&_embed`,
    )
      .then((response) => {
        const totalPages = response.headers.get("X-WP-TotalPages");
        setPageCount(Number(totalPages));
        return response.json();
      })
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(Number(e.target.value));
    setPosts([]);
  };

  console.log(selectedCategory)

  return (
    <>
      {loading && <Loader />}
      <div className="container blog-page">
        <div className="row mb-5">
          <div className="col-12 d-flex justify-content-center mt-5">
            <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="" disabled>
                Odaberite kategoriju
              </option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          {posts.map((post) => {
        
            return (
              <BlogPost key={post.id} post={post} />
            );
          })}
        </div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={(e) => {
            setCurrentPage(e.selected);
            setPosts([]);
            ScrollToTop();
          }}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default Kategorije;
