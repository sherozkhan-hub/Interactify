import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/theme";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { Userlogout } from "../redux/userSlice";

const TopBar = () => {
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(setTheme(themeValue));
  };

  const handleSearch = (data) => {
    console.log(data);
  };
  return (
    <div className="topbar w-full flex items-center justify-between md:py-6 px-4 py-3 bg-primary">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg- [#065ad8] rounded text-white">
          Fixinggggg
        </div>
        <span className="text-x1 md:text-2x1 text-[#065ad8] font-semibold">
          SOCIAL
        </span>
      </Link>

      {/* Search Bar */}
      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search..."
          styles="w-[18rem] lg:w-[38rem] rounded-1-full py-3"
          register={register("search")}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 
          rounded r-full"
        />
      </form>

      {/*  */}
      <div
        className="flex items-center gap-4 
      text-ascent-1 text-md md:test-xl"
      >
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>
      </div>

      <CustomButton
        onClick={() => dispatch(Userlogout())}
        title="Logout"
        type="submit"
        containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 
          rounded r-full"
      />
    </div>
  );
};

export default TopBar;
