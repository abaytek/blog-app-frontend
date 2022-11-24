import "./post.scss";
import { Link } from "react-router-dom";
function Post({ post }) {
  const PublicFolder = process.env.REACT_APP_SERVER_URL + "/images/";
  return (
    <Link className="link" to={`/post/${post._id}`}>
      <div className="post">
        {post.photo ? (
          <img className="post__img" src={PublicFolder + post.photo} alt="" />
        ) : (
          <img
            className="post__img"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        )}
        <div className="post__info">
          <div className="post__cats">
            {post.categories.map((p) => (
              <span key={p._id} className="post_cat">
                {p.name}
              </span>
            ))}
          </div>
          <span className="post__title">{post.title}</span>
          <hr />
          <span className="post__date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="post__desc">{post.desc}</p>
      </div>
    </Link>
  );
}
export default Post;
