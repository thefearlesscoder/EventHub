import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";
import { toast } from "react-hot-toast";

function ContactUsForm() {
  const { token } = useSelector((state) => state.auth);
  console.log(token);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResponseMessage("");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);
    form.append("token", JSON.parse(token)); 

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/contact-us",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      if (response.data.success) {
        toast.success("Your message has been sent successfully.");
      } else {
        toast.error("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // setResponseMessage("Error sending message. Please try again.");
      toast.error("You need to login before sending mail")
    } finally {
      setLoading(false);
    }
  };

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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-richblue-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full text-black border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Subject"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-richblue-400">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="5"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-richblue-500 text-richblue-50 font-semibold px-6 py-2 rounded-lg hover:bg-richblue-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {responseMessage && (
          <p className="mt-4 text-center text-lg text-gray-500">
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactUsForm;
