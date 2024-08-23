import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Viewsingle = () => {
  //   const [getObject, setobject] = useState("");
  const [getObject, setobject] = useState({}); //object ako cha yesma
  const getparams = useParams();

  const getID = getparams.id;

  const Getsinglemov = async () => {
    try {
      const axio = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}` //backtick is used for adding dynamic value in between string
      );
      setobject(axio.data.singleMovieData);

      console.log(axio.data.singleMovieData.desc);
    } catch {
      alert("error");
    }

    // Getsinglemov (); // this will cause infinite render as the whole page gets rerendered when we use
    // use state
  };
  useEffect(() => {
    // such useeffect with no dependency renders initially and once when the main component is mounted to teh DOM
    Getsinglemov();
  }, []);
  return (
    <>
      {/* <button onClick={Getsinglemov}>get movie info</button> */}
      <div>
        <br />

        <>
          <div>
            name: {getObject.name} <br />
            info :{getObject.info}
            <br />
            desc :{getObject.desc}
            <br />
            rating:{getObject.rating}
            <br />
            <img
              src={getObject.image}
              style={{ display: "flex", justifyContent: "space-evenly" }}
              alt="abcv"
            ></img>
            <br />
          </div>
        </>
      </div>
    </>
  );
};
export default Viewsingle;
