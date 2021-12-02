import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { addVotes, getArticle } from "../utils/api";
import CommentDisplay from "./CommentDisplay";
import {
  MdOutlineModeComment,
  MdThumbUpOffAlt,
  MdThumbDownOffAlt,
} from "react-icons/md";
import { HashLink } from "react-router-hash-link";

const SingleArticle = ({ isLoggedIn, user }) => {
  const [selectedArticle, setSelectedArticle] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [isError, setIsError] = useState(false);

  const { article_id } = useParams();

  useEffect(() => {
    setIsError(false);
    getArticle(article_id)
      .then((res) => {
        setSelectedArticle(res);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [article_id]);

  const incVote = (e) => {
    let num = e.currentTarget.value === "upvote" ? 1 : -1;
    setVoteChange((currVoteChange) => currVoteChange + num);
    addVotes(article_id, num);
  };
  console.log(voteChange);

  return (
    <div>
      {isError ? (
        <p>Sorry, that article doesn't exist</p>
      ) : (
        <>
          <h2 className="main__singleArticle_title">{selectedArticle.title}</h2>
          <div className="main__article_tags">
            <h3 className="main__author_name">{selectedArticle.author}</h3>
            <Link
              className="main__topic_tag-link"
              to={`/articles/topics/${selectedArticle.topic}`}
            >
              <button className="main__topic_tag">
                {selectedArticle.topic}
              </button>
            </Link>
            <p className="main__date">{selectedArticle.created_at}</p>
            <div className="main__article_interactions--dropdown">
              <HashLink smooth to={`${selectedArticle.article_id}#comments`}>
                <p className="main__interaction_indicator">
                  <MdOutlineModeComment className="main__interaction_icon" />
                  {selectedArticle.comment_count}
                </p>
              </HashLink>

              <p className="main__interaction_indicator noHover">
                <MdThumbUpOffAlt className="main__interaction_icon" />
                {selectedArticle.votes + voteChange}
              </p>
            </div>
          </div>
          <p className="main__singleArticle_body">{selectedArticle.body}</p>

          {isLoggedIn && (
            <div className="main__singleArticle_voteContainer">
              <button
                onClick={incVote}
                value="upvote"
                className="main__interaction_button"
              >
                <MdThumbUpOffAlt className="main__interaction_icon" />
              </button>
              <button
                onClick={incVote}
                value="downvote"
                className="main__interaction_button"
              >
                <MdThumbDownOffAlt className="main__interaction_icon" />
              </button>
            </div>
          )}

          <hr className="main__singleArticle_lineBreak"></hr>

          <section id="comments">
            <CommentDisplay
              article_id={article_id}
              isLoggedIn={isLoggedIn}
              user={user}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default SingleArticle;
