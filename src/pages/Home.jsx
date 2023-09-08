import { useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import ProfileCard from "../components/ProfileCard";
import FriendsCard from "../components/FriendsCard";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { requests, friends, posts } from "../assets/data.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { suggest } from "../assets/data.js";
import NoProfile from "../assets/userprofile.png";
import CustomButton from "../components/CustomButton";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import EditProfile from "../components/EditProfile";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(friends);
  const [suggestedFriend, setSuggestedFriend] = useState(suggest);
  const { register, handleSubmit, errors } = useForm();
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const handlePostSubmit = (data) => {
    console.log(data);
  };
  // console.log(friends);
  return (
    <>
      <div
        className="home w-full px-0 lg:px-10 
pb-20 2xl:px-40 bg-bgColor lg:rounded-lg 
h-screen overflow-hidden"
      >
        <TopBar />

        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div
            className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6
          overflow-y-auto"
          >
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* CENTER */}
          <div
            className="flex-1 h-full bg-primary px-4 flex flex-col 
      gap-6 overflow-y-auto"
          >
            <form
              onSubmit={handleSubmit(handlePostSubmit)}
              className="bg-primary px-4 rounded-lg"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl || NoProfile}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <TextInput
                  placeholder="What's on your mind?"
                  styles="w-full rounded-full py-5"
                  name="description"
                  register={register("description", {
                    required: "Write Something about post",
                  })}
                  error={errors?.description ? errors?.description.message : ""}
                />
              </div>
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-red-500"
                      : "text-green-500"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className="w-full flex items-center justify-between py-2">
                <label
                  htmlFor="file"
                  className="flex items-center gap-2 text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg .png .jpeg"
                    className="hidden"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  htmlFor="videoUpload"
                  className="flex items-center gap-2 text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="videoUpload"
                    data-max-size="5120"
                    accept=".mp4 .wav"
                    className="hidden"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  htmlFor="vgifUpload"
                  className="flex items-center gap-2 text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".gif"
                    className="hidden"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
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
              posts?.map((post) => (
                <PostCard
                  key={post._id}
                  user={user}
                  post={post}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-4 py-10">
                <p className="text-lg text-ascent-2">No Posts available</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div
                className="flex items-center justify-between 
            text-xl text-ascent-2 pb-2 border-b border-[e666E6645]"
              >
                <span> Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 pt-4">
              {friendRequest?.map((from) => (
                <div
                  key={from._id}
                  className="flex items-center justify-between"
                >
                  <Link
                    to={"/profile/" + from._id}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={from?.profileUrl || NoProfile} // Use the profileUrl or NoProfile if not available
                      alt={from?.firstName}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {from?.firstName} {from?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {from?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex gap-1">
                    <CustomButton
                      title="Accept"
                      containerStyles="bg-[#0444a4] text-xs text-white px-1.5
                    py-1 rounded-full"
                    />
                    <CustomButton
                      title="Deny"
                      containerStyles="l border border-[#666] text-xs
                  text-ascent-1 px-1.5 py-1 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* {/ SUGGESTED FRIENDS */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 ру-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Friend Suggestion</span>
              </div>

              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriend?.map((friend) => {
                  return (
                    <div
                      className="flex items-center justify-between "
                      key={friend._id}
                    >
                      <Link
                        to={"/profile/" + friend._id}
                        className="w-full flex gap-4 items-center cursor-pointer"
                      >
                        <img
                          src={friend?.profileUrl || NoProfile}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
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
