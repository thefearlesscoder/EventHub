import axios from "axios";

const testApi = async () => {
  try {
    const loginRes = await axios.post("http://localhost:4000/api/v1/users/login", {
      email: "admin@dummy.com",
      password: "password123",
    });

    const cookies = loginRes.headers["set-cookie"];

    const formData = {
      artist: 'Kunal Sonkar',
      description: 'aefgegtger',
      pincode: '226022',
      date: '2026-06-19',
      ticketPrice: '234',
      seatingCapacity: '2345',
      genre: 'Rock',
      place: 'Lucknow, India'
    };

    const res = await axios.post("http://localhost:4000/api/v1/concert/add-concert", formData, {
      headers: {
        Cookie: cookies ? cookies.join("; ") : "",
      },
    });

    console.log("Success:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("Error Status:", err.response.status);
      console.error("Error Data:", err.response.data);
    } else {
      console.error("Network Error:", err.message);
    }
  }
};

testApi();
