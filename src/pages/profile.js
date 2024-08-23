import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const history = useHistory();
  const [medata, getmedata] = useState({});
  const Logout = () => {
    history.push("/");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    meAPI();
  }, []);

  const meAPI = async () => {
    try {
      const localdata = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${localdata}`, // backtik is used , also follow format
            //bearer was suggested in the API we used
            //bearer ra $ ko space maintain garnu else ERROR falcha
          },
        }
      );
      console.log(response.data.data);
      getmedata(response.data.data);
    } catch (error) {
      console.log(error);
      try {
        if (error.response) {
          alert(error.response.data.errors[0].message);
        } else {
          alert("somethingwent wrong please try again later");
        }
      } catch {
        alert("somethingwent wrong please try again later");
      }
    }
  };

  return (
    <>
      <Link to="/">home</Link>
      <br />
      <br />
      {medata.name}
      <br />
      <br />
      {medata.email}
      <br />
      <br />
      {medata.country}
      <br />
      <br />

      <button onClick={Logout}>logout</button>
    </>
  );
};
export default Profile;
