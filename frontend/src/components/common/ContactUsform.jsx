import React from "react";

function ContactUsform() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-3xl w-full bg-richblue-25 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-richblue-500 text-center mb-8">
          Contact Us
        </h1>

        <p className="text-lg text-richblue-400 text-center mb-8">
          Have questions or feedback? We'd love to hear from you! Fill out the
          form below, and our team will get back to you as soon as possible.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-richblue-400">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-richblue-400">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-richblue-400">
              Subject
            </label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Subject"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-richblue-400">
              Message
            </label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="5"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-richblue-500 text-richblue-50 font-semibold px-6 py-2 rounded-lg hover:bg-richblue-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUsform;
