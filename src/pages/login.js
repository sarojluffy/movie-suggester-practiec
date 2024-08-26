import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Nav from "../component/navbar";
import { Form, Button, Container, Modal } from "react-bootstrap";

const Login = () => {
  const history = useHistory();
  const email = useRef();
  const pw = useRef();

  const [modalshown, setmodalshown] = useState(false);
  const [modaltext, setmodaltext] = useState("");

  const loginHandler = async (e) => {
    console.log("triggered");
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
        // alert("redirecting........");
        setmodalshown(true);

        setmodaltext("logged in");
        setTimeout(() => {
          history.replace("/");
        }, 2000);
      }
      localStorage.setItem("token", getAuth.data.accessToken);
    } catch (error) {
      try {
        if (error.response) {
          // alert(error.response.data.errors[0].message);
          setmodalshown(true);
          setmodaltext(error.response.data.errors[0].message);
        } else {
          // alert("notfound, please try again later");
          setmodalshown(true);
          setmodaltext("notfound, please try again later");
        }
      } catch {
        // alert("notfound, please try again later");
        setmodaltext("notfound, please try again later");

        setmodalshown(true);
      }
    }
  };

  return (
    <>
      {/* gmail:
        <br />
        <input type="text" placeholder="gmail" ref={email}></input> */}
      <Nav />
      {/* password:
        <br />
        <input type="password" ref={pw}></input> */}
      {/* <button>login</button> */}

      <Modal
        show={modalshown}
        onHide={() => {
          setmodalshown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
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

      {/* <Modal
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
      </Modal> */}

      <Container>
        <form onSubmit={loginHandler} className="mt-5" autoComplete="false">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={email} />
          </Form.Group>
          <br />
          <br />

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={pw} />
          </Form.Group>
          <br />
          <Button variant="dark" type="submit">
            Add moviee
          </Button>
        </form>
      </Container>
    </>
  );
};
export default Login;
