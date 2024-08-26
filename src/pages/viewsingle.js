import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Nav from "../component/navbar";
import { Button, Card, Container } from "react-bootstrap";

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
      <Nav />

      <Container>
        <div>
          <br />

          <>
            <div>
              <h1 className="text-info">{getObject.name}</h1> <br />
              <Card>info :{getObject.info}</Card>
              <br />
              <Card>{getObject.desc}</Card>
              <br />
              <Card>RATINGS: {getObject.rating}</Card>
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
        <Link to="/">
          <Button variant="dark" type="submit">
            Go back
          </Button>
        </Link>
      </Container>
    </>
  );
};
export default Viewsingle;
