import { useDispatch, useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import ProfileCard from "../components/ProfileCard";
import FriendsCard from "../components/FriendsCard";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { requests, friends } from "../assets/data.js";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { suggest } from "../assets/data.js";
import NoProfile from "../assets/userprofile.png";
import CustomButton from "../components/CustomButton";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import EditProfile from "../components/EditProfile";
import axios from "axios";
import { axiosInstance } from "../services/api-client";
import {
  setAcceptButton,
  setButtonValue,
  setDenyButton,
  setDisable,
  setPosts,
  setValue,
} from "../redux/postSlice";
import { handleFileUpload } from "../utils";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriend, setSuggestedFriend] = useState(suggest);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const dispatch = useDispatch();
  const { acceptButton, posts } = useSelector((state) => state.posts);

  const fetchPost = async () => {
    const res = await axiosInstance.get("/posts");
    dispatch(setPosts(res.data.data));
    console.log(res.data.data, "Posts fetch");
  };

  useEffect(() => {
    // setLoading(true);
    // getUser();
    fetchPost();
    // fetchFriendRequest();
    // fetchSuggestedFriend();
    // setLoading(false);
  }, []);

  const handlePostSubmit = async (data) => {
    try {
      console.log("Worrr");
      setPosting(true);
      const uri = file && (await handleFileUpload(file));

      const newData = uri ? { ...data, image: uri } : data;

      const res = await axios.post("/posts/create-post", newData);
      setPosting(false);

      if (res.data.status === "failed") {
        setErrMsg(res.data);
        return;
      }

      setFile(null);
      await fetchPost();
    } catch (error) {
      setPosting(false);
      console.log(error);
    }
    // console.log(data.imageUpload[0].name)
  };

  const deletePost = (id) => {
    const newPosts = posts.filter((post) => post._id !== id);
    // dispatch(setPosts(res.data));
  };
  // const onError = (errors, e) => {
  //   console.log(errors.description.message);
  // };
  // console.log(friends);

  // const umarFunc = (id) => {
  //   const newarr = friendRequest.filter((fil) => fil._id === id);

  //   // console.log(newarr[0]._id)

  //   dispatch(setButtonValue(newarr[0]._id));
  // };

  const handleLikePost = async (id) => {};
  const fetchFriendRequest = async () => {};
  const fetchSuggestedFriend = async () => {};
  const handleFriendRequest = async (id) => {};
  const acceptFriendRequest = async (id) => {};
  const getUser = async () => {};

  return (
    <>
      <div className="w-full h-screen px-0 pb-20 overflow-hidden border-r-0 home lg:px-10 2xl:px-40 bg-bgColor">
        <TopBar />

        <div className="flex w-full h-full gap-2 pt-5 pb-10 lg:gap-4">
          {/* LEFT */}
          <div
            className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6
          overflow-y-auto border-r border-[#66666645]"
          >
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* CENTER */}
          <div
            className="flex-1 h-full bg-primary px-4 flex flex-col 
      gap-6 overflow-y-auto border-r border-[#66666645]"
          >
            {/* onSubmit={handleSubmit((data) => console.log(data.imageUpload[0].name))} */}
            <form
              onSubmit={handleSubmit((data) => handlePostSubmit(data))}
              className="px-4 rounded-lg bg-primary"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl || NoProfile}
                  alt=""
                  className="object-cover w-10 h-10 rounded-full"
                />
                <TextInput
                  placeholder="What's on your mind?"
                  styles="w-full rounded-full py-5"
                  name="description"
                  register={register("description", {
                    required: "Write Something about post",
                  })}
                  error={errors?.description?.message}
                />
              </div>
              {/* {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-red-500"
                      : "text-green-500"
                  } mt-0.5`}
                >
                  {errMsg?.message}hbjhbhj
                </span>
              )} */}

              <div className="flex items-center justify-between w-full py-2">
                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-2 cursor-pointer text-ascent-2 hover:text-ascent-1"
                >
                  {/* <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="imageUpload"
                    data-max-size="5120"
                    accept=".mp4 .wav"
                    className="hidden"

                    {...register("imageUpload")}
                  /> */}
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="imageUpload"
                    data-max-size="5120"
                    accept=".jpg, .jpeg, .png"
                    className="hidden"
                    {...register("imageUpload")}
                  />
                  <BiImages />
                  <span>Image</span>
                </label>
                <label
                  htmlFor="videoUpload"
                  className="flex items-center gap-2 cursor-pointer text-ascent-2 hover:text-ascent-1"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="videoUpload"
                    data-max-size="5120"
                    accept="*/*"
                    className="hidden"
                    {...register("videoUpload")}
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-2 cursor-pointer text-ascent-2 hover:text-ascent-1"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="gifUpload"
                    data-max-size="5120"
                    accept=".gif"
                    className="hidden"
                    {...register("gifUpload")}
                  />
                  <BiImages />
                  <span>Gif</span>
                </label>
                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      // onClick={handlePostSubmit}
                      containerStyles="bg-[#0444a4] text-white rounded-full font-semibold 
                  text-sm py-1 px-6"
                    />
                  )}
                </div>
              </div>
            </form>
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post, index) => (
                <PostCard
                  key={post._id}
                  user={user}
                  post={post}
                  deletePost={deletePost}
                  likePost={() => {}}
                />
                /* <p key={index}>{post._id}</p> */
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full gap-4 py-10">
                <p className="text-lg text-ascent-2">No Posts available</p>
              </div>
            )}
          </div>
          {/* RIGHT */}
          <div className="flex-col hidden w-1/4 h-full gap-8 overflow-y-auto lg:flex">
            <div className="w-full px-6 py-5 rounded-lg shadow-sm bg-primary">
              <div
                className="flex items-center justify-between 
            text-xl text-ascent-2 pb-2 border-b border-[e666E6645]"
              >
                <span> Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>
            </div>
            {/* {/ FRIEND REQUEST */}
            <div className="flex flex-col w-full gap-4 pt-4">
              {friendRequest?.map((from) => (
                <div
                  key={from._id}
                  className="flex items-center justify-between"
                >
                  <Link
                    to={"/profile/" + from._id}
                    className="flex items-center w-full gap-4 cursor-pointer"
                  >
                    <img
                      src={from?.requestFrom.profileUrl || NoProfile}
                      alt={from?.requestFrom.firstName}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {from?.requestFrom.firstName}{" "}
                        {from?.requestFrom.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {from?.requestFrom.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>
                  <div className="flex gap-1">
                    <CustomButton
                      title="Accept"
                      containerStyles="bg-[#0444a4] text-xs text-white px-1.5
                      py-1 rounded-full"
                      onClick={() => {
                        dispatch(setAcceptButton("Accept"));
                        dispatch(setDisable(true));
                        dispatch(setValue("Deny"));
                        // umarFunc(from._id);
                      }}
                      friendrequest={friendRequest}
                      buttonID={from._id}
                    />
                    <CustomButton
                      title="Deny"
                      containerStyles="l border border-[#666] text-xs
                      text-ascent-1 px-1.5 py-1 rounded-full"
                      onClick={() => {
                        dispatch(setDenyButton("Deny"));
                        dispatch(setDisable(true));
                        dispatch(setValue("Accept"));
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* {/ SUGGESTED FRIENDS */}
            <div className="w-full px-5 py-5 rounded-lg shadow-sm bg-primary">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Friend Suggestion</span>
              </div>

              <div className="flex flex-col w-full gap-4 pt-4">
                {suggestedFriend?.map((friend) => {
                  return (
                    <div
                      className="flex items-center justify-between "
                      key={friend._id}
                    >
                      <Link
                        to={"/profile/" + friend._id}
                        className="flex items-center w-full gap-4 cursor-pointer"
                      >
                        <img
                          src={friend?.profileUrl || NoProfile}
                          alt=""
                          className="object-cover w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-base font-medium text-ascent-1">
                            {friend.firstName} {friend.lastName}
                          </p>
                          <span className="text-sm text-ascent-2">
                            {friend.profession ?? "No Profession"}
                          </span>
                        </div>
                      </Link>

                      <div className="flex gap-1">
                        <button
                          className="bg-[#0444a430] text-sm text-white p-1 rounded"
                          onClick={() => {}}
                        >
                          <BsPersonFillAdd
                            size={20}
                            className="text-[#0f52b6]"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default Home;
