import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa";
import frameImg from "../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useSelector } from "react-redux"

function Template({ title, description1, description2, image, formType }) {
  
  const { loading } = useSelector((state) => state.auth)
  // let loading = true ;
  // min-h-[calc(100vh-3.5rem)]
  return (
    <div className="grid  place-items-center">
      {loading ? (
        <div className="">
          Loading....
        </div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 
                        md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto md:max-w-[50%] max-w-[80%]  md:mx-0">
            <h1 className="text-[1.875rem] font-bold  leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>

            <div className=" border-2 border-richblack-100 flex flex-col items-center mt-10">

                {formType === "signup" ? <SignupForm /> : <LoginForm />}
                <div className=" text-richblack-50 text-center text-lg font-bold">
                  OR
                </div>

                <div className=" flex gap-5 md:text-4xl text-2xl font-bold p-4 ">
                    <FcGoogle/>
                    <FaFacebook className="text-blue-400"/>
                </div>
            </div>

            

          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 my-auto">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template