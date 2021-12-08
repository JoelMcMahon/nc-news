import React, { useState, useEffect } from "react";
import { postComment, getComments } from "../utils/api";
import { MdThumbUpOffAlt, MdThumbDownOffAlt } from "react-icons/md";

const CommentDisplay = ({ article_id, isLoggedIn, user }) => {
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    getComments(article_id)
      .then((res) => {
        setComments(res);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [article_id]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const optimisticComment = {
      author: user,
      body: commentBody,
      created_at: new Date().toISOString(),
      votes: 0,
    };
    setComments((currentComments) => [optimisticComment, ...currentComments]);
    postComment(article_id, user, commentBody).then((res) => {});
    setCommentBody("");
  };

  const handleOnChange = (e) => {
    setCommentBody(e.target.value);
  };

  return (
    <div>
      <h2 className="main__comments_title">Comments ({comments.length})</h2>
      {isLoggedIn && (
        <form className="main__comments_form" onSubmit={handleOnSubmit}>
          <label htmlFor="commentBody">
            Comment as{" "}
            <span className="main__comments_author-name">{user}</span>:{" "}
          </label>
          <textarea
            id="commentBody"
            className="main__comments_text-input"
            rows="5"
            type="text"
            required
            value={commentBody}
            onChange={handleOnChange}
          />
          <button className="main__comments_button">Post Comment</button>
        </form>
      )}

      <ul>
        {comments.map((comment) => {
          return (
            <li className="main__comments_comment-li">
              <h3 className="main__comments_author-name">{comment.author}</h3>
              <p className="main__comments_date">
                {comment.created_at.slice(0, 10)}
              </p>
              <p className="main__comments_comment-body">{comment.body}</p>

              {isLoggedIn && (
                <div className="main__singleArticle_voteContainer">
                  <button
                    // onClick={incVote}
                    // value="upvote"
                    className="main__interaction_button"
                  >
                    <MdThumbUpOffAlt className="main__interaction_icon" />
                  </button>
                  <p className="main__comments_author-name">{comment.votes}</p>
                  <button
                    // onClick={incVote}
                    // value="downvote"
                    className="main__interaction_button"
                  >
                    <MdThumbDownOffAlt className="main__interaction_icon" />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentDisplay;
