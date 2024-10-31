import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../data/countrycode.json"

const ContactUsform = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

  const submitContactForm = async (data) => {
    
    
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

    return (
        <form
            className="flex flex-col gap-7 text-richblack-5"
            onSubmit={handleSubmit(submitContactForm)}
            >
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="firstname" className="lable-style">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter first name"
                    className="form-style bg-richblack-600 outline-none text-white p-1 rounded-md"
                    {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your name.
                    </span>
                )}
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastname" className="lable-style">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Enter last name"
                    className="form-style bg-richblack-600 outline-none text-white p-1 rounded-md"

                    {...register("lastname")}
                />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="lable-style">
                Email Address
                </label>
                <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                className="form-style bg-richblack-600 outline-none text-white p-1 rounded-md"

                {...register("email", { required: true })}
                />
                {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your Email address.
                </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber" className="">
                Phone Number
                </label>
              
                    <input
                    type="number"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="12345 67890"
                    className="form-style bg-richblack-600 outline-none text-white p-1 rounded-md"
                    {...register("phoneNo", {
                        required: {
                        value: true,
                        message: "Please enter your Phone Number.",
                        },
                        maxLength: { value: 12, message: "Invalid Phone Number" },
                        minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                    />
      
              
                {errors.phoneNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.phoneNo.message}
                </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="lable-style">
                Message
                </label>
                <textarea
                name="message"
                id="message"
                cols="30"
                rows="7"
                placeholder="Enter your message here"
                className="form-style bg-richblack-600 outline-none text-white p-1 rounded-md"
                {...register("message", { required: true })}
                />
                {errors.message && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your Message.
                </span>
                )}
            </div>

            <button
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 p-1 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${
                !loading &&
                "transition-all duration-200 hover:scale-95 hover:shadow-none "
                }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactUsform