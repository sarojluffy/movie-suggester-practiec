import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Addmovie = () => {
  const histry = useHistory();
  const movienametext = useRef();
  const textarea = useRef();
  const rating = useRef();
  const POST = async (e) => {
    console.log(movienametext.current.value);
    console.log(textarea.current.value);
    e.preventDefault();
    const sendmovieobject = {
      movie_name: movienametext.current.value,
      rating: rating.current.value,
      description: textarea.current.value,
    }; // the object form and JSOn are not same
    try {
      const postAPI = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        sendmovieobject,
        { timeout: 5000 } //5 sec vanda badi time layo vane error faldiney

        // this is the post format of APi through axios
      );

      histry.replace("/");
    } catch (error) {
      //error means object error
      console.log(error);

      if (error.response) {
        // we look out for response
        alert(error.response.data.errors[0].message); // if the errorr is received from error object
        // we usually see the object or errors inside the response
      } else {
        alert("something went wrong please try again later"); //error from unknown
      }
    }
  };

  return (
    <>
      <form>
        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
        <input type="text" placeholder="movie_name" ref={movienametext}></input>
        <br />
        <br />
        <input type="text" placeholder="rating" ref={rating}></input>
        <br />
        <br />
        <textarea ref={textarea}></textarea>
        <br />
        <br />
        <button onClick={POST}>submit</button>
      </form>
    </>
  );
};
export default Addmovie;
