import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const history = useHistory();
  const email = useRef();
  const pw = useRef();

  const loginHandler = async (e) => {
    const loginarray = {
      email: email.current.value,
      password: pw.current.value,
    };
    e.preventDefault();

    try {
      const getAuth = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginarray,
        { timeout: 5000 }
      );
      //   console.log(getAuth.data.status);
      if (getAuth.data.status === "success") {
        alert("logged in");
        history.replace("/");
      }
      localStorage.setItem("token", getAuth.data.accessToken);
    } catch (error) {
      try {
        if (error.response) {
          alert(error.response.data.errors[0].message);
        } else {
          alert("notfound, please try again later");
        }
      } catch {
        alert("notfound, please try again later");
      }
    }
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        gmail:
        <input type="text" placeholder="gmail" ref={email}></input>
        <br />
        <br />
        password:
        <input type="password" ref={pw}></input>
        <button>login</button>
      </form>
    </>
  );
};
export default Login;
