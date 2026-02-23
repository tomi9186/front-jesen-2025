import {Link} from 'react-router-dom';

const Author = ({ post, author = true }) => {
  return (
    <span class="meta d-block mb-3">
      {author ? "Autor:" : ""}
      <Link to={"/autor/" + post._embedded.author[0].slug}>{post._embedded.author[0].name}</Link>
      {author ? ", " : " | "}
      {new Date(post.date).toLocaleDateString("hr-HR")}
    </span>
  );
};

export default Author;
