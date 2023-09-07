/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
import CommentForm from "./CommentForm";
import Loading from "./Loading";
import { postComments } from "../assets/data";
import ReplyCard from "./ReplyCard";

const PostCard = ({ post, user, deleteUser, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setloading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async (postId) => {
    setReplyComments(0);
    setComments(postComments);

    setloading(false);
  };

  const deletePost = async (postId) => {};
  // console.log({ replyComments });

  const handleLike = async (url) => {};

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      <div className="flex gap-3 items-center mb-2">
        <Link to={"/profile/" + post?.userId?._dd}>
          <img
            src={post?.userId?.profileUr1 ?? NoProfile}
            alt={post?.userId?.firstName}
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>
        <div className="w-full flex justify-between">
          <div className="text-ascent-1">
            <Link to={"/profile/" + post?.userId?._id}>
              {post?.userId?.firstName} {post?.userId?.lastName}
            </Link>
            <span className="text-ascent-2 text-sm flex flex-col">
              {post.userId.location}
            </span>
          </div>

          <span className="text-ascent-2">
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      <div className="text-ascent-2">
        {showAll === post.id
          ? post.description
          : post.description.slice(0, 200)}
        {post.description.length > 200 &&
          (showAll === post.id ? (
            <span
              className="text-blue ml-2 font-medium cursor-pointer"
              onClick={() => setShowAll(0)}
            >
              Show less
            </span>
          ) : (
            <span
              className="text-blue ml-2 font-medium cursor-pointer"
              onClick={() => setShowAll(post.id)}
            >
              Show more
            </span>
          ))}
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="w-full h-96 object-cover rounded-xl mt-4"
          />
        )}

        <div className="mt-4 border-t border-[#66666645] flex justify-between items-center px-3 py-2 text-ascent-2">
          <p className="flex gap-2 items-center text-base cursor-pointer">
            {post?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color="blue" />
            ) : (
              <BiLike size={20} />
            )}
            {post?.likes?.length} likes
          </p>

          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => {
              setShowComments(showComments === post._id ? null : post._id);
              getComments(post._id);
            }}
          >
            <BiComment size={20} />
            {post?.likes?.length} Comments
          </p>

          {user._id === post.userId._id && (
            <div
              className="flex gap-1 items-center text-base text-ascent-1 cursor-pointer"
              onClick={() => deletePost(post._id)}
            >
              <MdOutlineDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          )}
        </div>
      </div>

      {showComments === post._id && (
        <div className="mt-4 w-full border-t">
          <CommentForm
            user={user}
            id={post.id}
            getComments={() => getComments(post.id)}
          />
        </div>
      )}

      {loading ? (
        <Loading />
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <div className="w-full py-2" key={comment._id}>
            <div className="flex gap-3 items-center mb-2">
              <Link to={"/profile/" + comment?.userId?._id}>
                <img
                  src={comment.userId.profileUr1 || NoProfile}
                  alt={comment.userId.firstName}
                  className="w-14 h-14 object-cover rounded-full"
                />
              </Link>
              <div>
                <Link to={"/profile/" + comment.userId._id}>
                  <p className="text-ascent-1 font-medium text base">
                    {comment.userId.firstName} {comment.userId.lastName}
                  </p>
                </Link>
                <span className="text-ascent-2 text-sm flex flex-col">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <div className="ml-12">
              <p className="text-ascent-2">{comment.comment}</p>
              <div className="mt-2 flex gap-6">
                <p className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer">
                  {comment.likes?.includes(user._id) ? (
                    <BiSolidLike size={20} color="blue" />
                  ) : (
                    <BiLike size={20} />
                  )}
                  {comment.likes?.length} likes
                </p>
                <span
                  className="text-blue cursor-pointer"
                  onClick={() => setReplyComments(comment._id)}
                >
                  Reply
                </span>
              </div>
              {replyComments === comment._id && (
                <CommentForm
                  user={user}
                  id={post.id}
                  replyAt={comment.userId}
                  getComments={() => getComments(post.id)}
                />
              )}
            </div>

            <div className="py-2 px-8 mt-6">
              {comment.replies.length > 0 && (
                <p
                  className="text-ascent-1 text-base"
                  onClick={() => {
                    setShowReply(
                      showReply === comment.replies._id
                        ? 0
                        : comment.replies._id
                    );
                  }}
                >
                  Show Replies {comment.replies.length}
                </p>
              )}
              {showReply === comment.replies._id &&
                comment.replies.map((reply) => (
                  <ReplyCard
                    reply={reply}
                    user={user}
                    key={reply._id}
                    handleLike={() =>
                      handleLike(
                        "/posts/like-comment/" + comment._id + "/" + reply._id
                      )
                    }
                  />
                ))}
            </div>
          </div>
        ))
      ) : (
        <span className="text-sm text-ascent-2 mt-2">
          No comments available
        </span>
      )}
    </div>
  );
};

export default PostCard;
