/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";

const PostCard = ({ post, user, deleteUser, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setloading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async (postId) => {};

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
    </div>
  );
};

export default PostCard;
