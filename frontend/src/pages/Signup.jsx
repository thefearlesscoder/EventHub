import { useSelector } from "react-redux"
import signupImg from "../assets/Images/signup.webp"
import Template from "../components/Login/Template"
// import Template from "../"


const Signup = () => {

  const { loading } = useSelector( (state) => state.auth )

  return (
    loading ? ( <div>Loading...</div>) : (

      <Template
        title="Join the millions meeting together with MusicMate"
        description1="Discover places for today, explore destinations for tomorrow, and uncover journeys that last a lifetime."
        description2=" Travel to future-proof your wanderlust."
        image={signupImg}
        formType="signup"
      />
    )

  )
}

export default Signup