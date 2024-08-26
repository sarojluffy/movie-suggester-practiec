import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Nav from "../component/navbar";
import { Container, Button, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [medata, getmedata] = useState({});

  const [modalshown, setmodalshown] = useState(false);
  const [modaltext, setmodaltext] = useState("");

  const [logout, setlogout] = useState(false);

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
          // alert(error.response.data.errors[0].message);
          setmodalshown(true);
          setmodaltext(error.response.data.errors[0].message);
        } else {
          // alert("somethingwent wrong please try again later");
          setmodalshown(true);
          setmodaltext("somethingwent wrong please try again later");
        }
      } catch {
        setmodalshown(true);
        setmodaltext("somethingwent wrong please try again later");
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
      <Container className="mt-5">
        {medata.name}
        <br />
        <br />
        {medata.email}
        <br />
        <br />
        {medata.country}
        <br />
        <br />
        <Button
          variant="danger"
          onClick={() => {
            setlogout(true);
          }}
        >
          Logout
        </Button>
      </Container>

      <Modal
        show={logout}
        onHide={() => {
          setlogout(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>are you sure you want to logout</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={Logout}>
            LOGOUT
          </Button>
          <Button
            className="bg-secondary"
            onClick={() => {
              setlogout(false);
            }}
          >
            CANCEL
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
