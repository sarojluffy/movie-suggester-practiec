import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Nav from "../component/navbar";
import { Container, Button, Form, FloatingLabel, Modal } from "react-bootstrap";

const Addmovie = () => {
  const [modalshown, setmodalshown] = useState(false);
  const [modaltext, setmodaltext] = useState("");
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
      await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        sendmovieobject,
        { timeout: 5000 } //5 sec vanda badi time layo vane error faldiney

        // this is the post format of APi through axios+*
      );
      // alert("movie has been added");
      setmodalshown(true);
      setmodaltext("movie has been added");
      histry.replace("/");
    } catch (error) {
      //error means object error
      console.log(error);

      if (error.response) {
        // we look out for response
        // alert(error.response.data.errors[0].message); // if the errorr is received from error object
        // we usually see the object or errors inside the response
        setmodaltext(error.response.data.errors[0].message);

        setmodalshown(true);
      } else {
        // alert("something went wrong please try again later"); //error from unknown
        setmodalshown(true);
        setmodaltext("something went wrong please try again later");
      }
    }
  };

  return (
    <>
      <Nav />

      <Modal
        show={modalshown}
        onHide={() => {
          setmodalshown(false);
        }}
      >
        <Modal.Body> {modaltext}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setmodalshown(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <form>
        <Container className="mt-5">
          moviename: <br />
          <input
            type="text"
            placeholder="movie_name"
            ref={movienametext}
          ></input>
          <br />
          <br />
          ratings:
          <br />
          <input type="number" placeholder="rating" ref={rating}></input>
          <br />
          <br />
          <FloatingLabel controlId="floatingTextarea2" label="description">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              ref={textarea}
            />
          </FloatingLabel>
          <Button variant="dark" type="submit" onClick={POST}>
            Add movie
          </Button>
        </Container>
      </form>
    </>
  );
};
export default Addmovie;
