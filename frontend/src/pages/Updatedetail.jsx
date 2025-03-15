import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import UpdateProfilebar from "../components/profile/UpdateProfilebar";
import Profilebar from "../components/profile/Profilebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateprofile } from "../services/operations/updateProfile";
import { updateImage } from "../services/operations/updateProfile";
import Spinner from "../components/Spinner";

// how to remove red line
const Updatedetail = () => {
  
  const user = useSelector((state) => state.auth.user);
  const dummydata = user  ;
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: dummydata.firstName,
    lastName: dummydata.lastName,
    email: dummydata.email,
    role: dummydata.role,
    username: dummydata.username,
    image: dummydata.image ? dummydata.image : "",
    phone: dummydata.phone,
    address: `${dummydata.address == undefined ? "" : dummydata.address}`,
  });

  const HandleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log("sahjcjdsjkdbk");

    const droppedFile = e.dataTransfer.files[0];
    setFormData({ ...formData, image: droppedFile });

    console.log(formData.image);
  };



const handleFileChange = (e) => {
  const file = e.target.files[0]; // file at index 0
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setImage(file); // Set image file to state
  };
  console.log("sdsagchvjhmnx vjkx");
};

const { token } = useSelector((state) => state.auth);

const HandleOnSumbit = (e) => {
  e.preventDefault();
  console.log("Submitting form");

  if (image) {
    let formSubmitData = new FormData();
    formSubmitData.append("image", image); // Append image file from state
    // formSubmitData.append("token", JSON.parse(token));
    console.log("image ->>>>> ", image);

    // Dispatch the update image action with form data
    dispatch(updateImage(formSubmitData,formData , navigate));
    
  }else {

    dispatch(
      updateprofile(
        formData.firstName,
        formData.lastName,
        formData.username,
        formData.address,
        formData.phone,
        navigate
      )
    );
  }

};


  return (
    <div>
      {
         loading ? <Spinner/> : 
        <div className=" min-h-screen text-richblack-25 p-10">
          <div>
            <div className=" font-bold text-2xl md:ml-[10%] text-black">
              Home / UpdateProfile
            </div>
            {loading ? (
              <div className="text-black">Loading...</div>
            ) : (
              <form className=" mt-10" onSubmit={HandleOnSumbit}>
                <div className=" flex w-full text-black justify-around md:flex-row md:gap gap-y-5 flex-col  items-center">
                  <img
                    src={dummydata.image ? dummydata.image.url : ""}
                    alt=""
                    className="md:w-[20%] w-[50%] rounded-full"
                  />
                  {/* <button className=' bg-yellow-50 text-black p-2 font-bold rounded-lg text-xl'>
                                        Edit image
                                    </button> */}

                  <div className="flex items-center justify-center md:min-w-[40%] p-3 gap-3 flex-col">
                    <label
                      htmlFor="dropzone-file"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      className="flex flex-col items-center justify-center md:p p-4 w-full h-64 border-2 
                                                border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800
                                                dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500
                                                dark:hover:bg-gray-600 min-w-[40%] "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="logo"
                        onChange={handleFileChange}
                      />
                    </label>
                    {formData.image && (
                      <p className="mt-2 text-sm text-gray-500">
                        Selected file: {formData.image.name}{" "}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" md:w-[70%] w-full mx-auto bg-white text-black mt-10 rounded-lg md:p-24 md:pb-12 p-12 flex flex-col gap-5">
                  <div className=" flex gap-5 md:flex-row flex-col ">
                    <label>
                      <p className=" font-bold text-2xl text-black flex gap-2">
                        FirstName <span className=" text-pink-400">*</span>
                      </p>
                      <input
                        className="  bg-richblack-25 outline-none 
                                                    focus:outline-none cursor-default text-2xl rounded-lg
                                                    placeholder:text-richblack-900 p-2 mt-2 
                                                    w-full  "
                        type="text"
                        defaultValue={`${
                          dummydata.firstName ? dummydata.firstName : ""
                        }`}
                        name="firstName"
                        // value={formData.firstName}
                        onChange={HandleOnChange}
                      ></input>
                    </label>
                    <label>
                      <p className=" font-bold text-2xl text-black flex gap-2">
                        LastName <span className=" text-pink-400">*</span>
                      </p>
                      <input
                        className="  bg-richblack-25 outline-none 
                                                    focus:outline-none cursor-default text-2xl rounded-lg
                                                    placeholder:text-richblack-900 p-2 mt-2 
                                                    w-full  "
                        type="text"
                        defaultValue={`${
                          dummydata.lastName ? dummydata.lastName : ""
                        }`}
                        name="lastName"
                        // value={formData.lastName}
                        onChange={HandleOnChange}
                      ></input>
                    </label>
                  </div>

                  <div className=" flex gap-5 md:flex-row flex-col ">
                    <label>
                      <p className=" font-bold text-2xl text-black flex gap-2">
                        UserName <span className=" text-pink-400">*</span>
                      </p>
                      <input
                        className="  bg-richblack-25 outline-none 
                                                    focus:outline-none cursor-default text-2xl rounded-lg
                                                    placeholder:text-richblack-900 p-2 mt-2 
                                                    w-full  "
                        type="text"
                        defaultValue={`${
                          dummydata.username ? dummydata.username : ""
                        }`}
                        name="username"
                        // value={formData.username}
                        onChange={HandleOnChange}
                      ></input>
                    </label>
                    <label>
                      <p className=" font-bold text-2xl text-black flex gap-2">
                        PhoneNo. <span className=" text-pink-400">*</span>
                      </p>
                      <input
                        className="  bg-richblack-25 outline-none 
                                                    focus:outline-none cursor-default text-2xl rounded-lg
                                                    placeholder:text-richblack-900 p-2 mt-2 
                                                    w-full  "
                        type="number"
                        defaultValue={`${dummydata.phone ? dummydata.phone : ""}`}
                        name="phone"
                        // value={formData.phone}
                        onChange={HandleOnChange}
                      ></input>
                    </label>
                  </div>

                  <div>
                    <label>
                      <p className=" font-bold text-2xl text-black flex gap-2">
                        Email <span className=" text-pink-400">*</span>
                      </p>
                      <input
                        className="  bg-richblack-25 outline-none 
                                                    focus:outline-none cursor-default text-2xl rounded-lg
                                                    placeholder:text-richblack-900 p-2 mt-2 
                                                    w-full  "
                        type="email"
                        defaultValue={`${dummydata.email ? dummydata.email : ""}`}
                        name="email"
                        readOnly
                        // value={formData.email}
                        onChange={HandleOnChange}
                      ></input>
                    </label>
                  </div>

                  <div>
                    <label>
                      <p className=" font-bold text-2xl text-black flex gap-2">
                        Address <span className=" text-pink-400">*</span>
                      </p>
                      <input
                        className="  bg-richblack-25 outline-none 
                                                    focus:outline-none cursor-default text-2xl rounded-lg
                                                    placeholder:text-richblack-900 p-2 mt-2 
                                                    w-full  "
                        type="text"
                        defaultValue={`${
                          dummydata.address ? dummydata.address : ""
                        }`}
                        name="address"
                        // value={formData.address}
                        onChange={HandleOnChange}
                      ></input>
                    </label>
                  </div>

                  <div className=" mx-auto mt-5 " type="submit">
                    <button className=" bg-yellow-50 text-black p-2 font-bold rounded-lg text-xl ">
                      Submit Detail
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

      }
    </div>

  );
};

export default Updatedetail;
