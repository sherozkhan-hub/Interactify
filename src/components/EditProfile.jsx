import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import Loading from "./Loading";
import { UpdateProfile } from "../redux/userSlice";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const onSubmit = async (data) => {};

  const handleClose = () => {
    dispatch(UpdateProfile(false));
  };

  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-[#000] opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <div
            className="inline-block align-bottom bg-[#385170] text-left 
          overflow-hidden shadow-xl transform rounded-lg transition-all sm:my-8 
          sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="flex bg-blue justify-between px-6 pt-5 pb-2">
              <label className="text-2xl font-medium text-ascent-1 text-left">
                Edit Profile
              </label>

              <button className="text-ascent-1" onClick={handleClose}>
                <MdClose size={22} />
              </button>
            </div>

            <form
              className="px-4 sm:px- flex flex-col gap-3 2xl:gap-6 bg-ascent-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                placeholder="Enter your First Name?"
                styles="w-full rounded-full py-5"
                name="firstName"
                register={register("firstName", {
                  required: "First Name is required",
                })}
                error={errors?.description ? errors?.description.message : ""}
              />
              <TextInput
                placeholder="Enter your Last Name?"
                styles="w-full rounded-full py-5"
                name="lastName"
                register={register("lastName", {
                  required: "Last Name is required",
                })}
                error={errors?.description ? errors?.description.message : ""}
              />
              <TextInput
                placeholder="Address is Required?"
                styles="w-full rounded-full py-5"
                name="address"
                register={register("address", {
                  required: "Address is Required",
                })}
                error={errors?.description ? errors?.description.message : ""}
              />
              <label
                htmlFor="file"
                className="flex items-center gap-2 text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  onChange={(e) => handleSelect(e)}
                  id="imgUpload"
                  data-max-size="5120"
                  accept=".jpg .png .jpeg"
                  className="hidden"
                />
                No file Chosen
              </label>

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

              <div className="py- sm:flex sm:flex-row-reverse border-t border-[#66666645]">
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type={"submit"}
                    containerStyles="inline-flex justify-center rounded-md 
                  bg-blue px-8 py-3 text-sm font-medium text-white outline-none"
                    title="Submit"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
