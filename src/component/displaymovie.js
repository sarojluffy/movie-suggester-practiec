import { Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Displaymovie = (props) => {
  return (
    <>
      <Card
        class="container-fluid"
        style={{ minHeight: "760px", maxWidth: "300px" }}
        className="m-2"
      >
        <Card.Img
          variant="top"
          src={props.sentasprops.image}
          style={{ maxWidth: "320px" }}
        />
        <Card.Body>
          <Card.Title style={{ minHeight: "50px" }}>
            {" "}
            {props.sentasprops.name}
          </Card.Title>
          <Card.Text style={{ minHeight: "250px" }}>
            {props.sentasprops.info}
          </Card.Text>

          <Card.Text>ratings: {props.sentasprops.rating}</Card.Text>
          <Link to={`/viewsingle/${props.sentasprops.id}`}>
            <Button variant="dark">View details</Button>
          </Link>
        </Card.Body>
      </Card>
      {/* <div key={props.sentasprops.id}>
        <img src={props.sentasprops.image} alt="abcv"></img>
        <br />
        {/* in react  for img tag , alt is compulsary*/}
      {/* <Link to={`/viewsingle/${props.sentasprops.id}`}> */}
      {/* PARAMS KO FORMAT HO YO , QUERY KO ARKAI HUNCHA */}
      {/* <center style={{ fontWeight: "bold" }}>
            {props.sentasprops.name}
          </center> */}
      {/* </Link>
        <br />
        {props.sentasprops.info}
        <br />
        {props.sentasprops.rating}
      </div> */}
    </>
  );
};
export default Displaymovie;
