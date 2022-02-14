import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  addVotes,
  getArticle,
  getArticleLikes,
  addLike,
  deleteLike,
} from "../utils/api";
import CommentDisplay from "./CommentDisplay";
import {
  MdOutlineModeComment,
  MdThumbUpOffAlt,
  MdThumbDownOffAlt,
} from "react-icons/md";
import { HashLink } from "react-router-hash-link";
import Loader from "../Loader";

const SingleArticle = ({ isLoggedIn, user }) => {
  const [selectedArticle, setSelectedArticle] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [likeStatus, setLikeStatus] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    setIsError(false);
    getArticle(article_id)
      .then((res) => {
        setSelectedArticle(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [article_id]);

  useEffect(() => {
    getArticleLikes(article_id).then((res) => {
      if (res[0]) {
        if (Object.values(res[0]).includes(user)) {
          setLikeStatus(res[0].like_status);
        }
      } else {
        setLikeStatus(0);
      }
    });
  }, []);

  console.log(likeStatus);
  console.log(article_id, "ARTICLE ID");

  const incVote = (e) => {
    let num = e.currentTarget.value === "upvote" ? 1 : -1;
    setVoteChange((currVoteChange) => currVoteChange + num);
    addVotes(article_id, num);
    if (e.currentTarget.value === "upvote") {
      if (likeStatus === 0) {
        addLike(article_id, user, num).then((res) => {
          console.log(res, "<<<<<<<<< RES IN COMPONENT");
          setLikeStatus(res);
        });
      } else if (likeStatus === -1) {
        deleteLike(article_id, user).then(() => {
          setLikeStatus(0);
        });
      }
    }

    if (e.currentTarget.value === "downvote") {
      if (likeStatus === 0) {
        addLike(article_id, num).then((res) => {
          console.log(res, "DOWNVOTE RES IN COMPONENT");
          setLikeStatus(res);
        });
      } else if (likeStatus === 1) {
        deleteLike(article_id, user).then(() => {
          setLikeStatus(0);
        });
      }
    }
  };

  const dateAndTime = new Date(selectedArticle.created_at)
    .toString()
    .slice(0, 16);

  if (isLoading) return <Loader></Loader>;

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
            <p className="main__date">{dateAndTime}</p>
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
                className={
                  likeStatus === 1
                    ? "main__interaction_button-selected"
                    : "main__interaction_button"
                }
                disabled={likeStatus === 1 ? true : false}
              >
                <MdThumbUpOffAlt className="main__interaction_icon" />
              </button>
              <button
                onClick={incVote}
                value="downvote"
                className={
                  likeStatus === -1
                    ? "main__interaction_button-selected"
                    : "main__interaction_button"
                }
                disabled={likeStatus === -1 ? true : false}
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
