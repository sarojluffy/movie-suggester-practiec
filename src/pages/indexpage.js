import axios from "axios"; //axios is used for communication with apis and database
import { useEffect, useState } from "react";

import Nav from "../component/navbar";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Displaymovie from "../component/displaymovie";

const Indexpage = () => {
  const [arr, setval] = useState([]);

  const [inputt, setinput] = useState("");

  const [iserror, seterror] = useState(false); //api ma error ayo vane trigger hune state

  const [errorText, settext] = useState(""); // just text matra ho

  const [lessthan2, setlessthan2] = useState("");
  const [loading, setloading] = useState(false);
  const abc = async () => {
    try {
      //chalyo vane try ko code execute huncha , chalena vane catch trigger huncha
      const axi = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${inputt}`
      ); // this might take time to get data via api
      setval(axi.data.moviesData);
      seterror(false);
    } catch {
      //chalena vane catch trigger huncha
      seterror(true);
      settext("something is wrong");
    }
  };

  // useEffect(() => {
  //   if (inputt.length > 2) {
  //     console.log("upper");

  //     return () => {
  //       console.log("lower");
  //     };
  //   }
  // }, [inputt]);

  // useEffect(() => {
  //   // this code snippet reuns at the initial stage ehn main component mounts
  //   setloading(true);
  //   console.log(loading);
  // }, [inputt]);
  // console.log(loading);

  useEffect(() => {
    abc();
  }, []);

  // useEffect(() => {
  //   setloading(false);
  //   console.log(loading);

  //   return () => {
  //     setloading(true);
  //     console.log(loading);
  //   };
  // }, [inputt]);

  useEffect(() => {
    console.log(loading);
    const timeout = setTimeout(() => {
      // aru code chalcha yo code chai 2 sec pachi chalcha // asyn ho
      if (inputt.length > 2 || inputt.length < 1) {
        abc(); //this function runs when the main compo is mounted
        setlessthan2("");
      } else {
        setlessthan2("enter 3 digits");
      }
      setloading(false);
    }, 500);

    return () => {
      //debouncing
      clearTimeout(timeout); //cleanupfunction , while the dependency is updated/state is
      //changed then this executes first and the the code snippet up will execute
      setloading(true);
      console.log(loading);
    };
  }, [inputt]); //

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (inputt.length > 2 || inputt.length < 1) {
  //       abc(); //this function runs when the main compo is mounted

  //       setlessthan2("");
  //     } else {
  //       setlessthan2("enter 3 digits");
  //     }
  //     setloading(false);

  //     console.log(loading);
  //   }, 800);

  //   return () => {
  //     //debouncing
  //     clearTimeout(timeout); //cleanupfunction , while the dependency is updated/state is
  //     //changed then this executes first and the the code snippet up will execute
  //     setloading(true);
  //     console.log(loading);
  //   };
  // }, [inputt]); //

  // in this scenario the function timeout will execute on only after 2 secs of the key stroke
  //meaning that the abc() api will be called only after 2 secs of the keystroke
  //if the new keystroke(new state trigger) is done before the last stroke execution
  // or the new stroke is done less than 2 sec the return will be executed first
  // resulting into termination of the timeout and hence the function abc() to not execute
  // (the API wont be called)

  // //summary ma vanna parda naya keystroke le agadi ko keystroke ko time pura huna didaina
  // ra function chaldaina bich mai terminate huncha 2 sec  napugera
  return (
    <>
      <Nav />
      <Container className="mt-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Search movie"
            value={inputt}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
        </Form.Group>
      </Container>

      {/* <FloatingLabel
        controlId="floatingTextarea"
        label="search movie"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value={inputt}
          onChange={(e) => {
            setinput(e.target.value);
          }}
        />
      </FloatingLabel> */}

      {/* <FloatingLabel controlId="floatingTextarea2" label="description">
        <Form.Control
          type="text"
          value={inputt}
          placeholder="search movie"
          style={{ height: "100px" }}
          onChange={(e) => {
            setinput(e.target.value);
          }}
        />
      </FloatingLabel> */}

      {/* <input
        type="text"
        value={inputt}
        placeholder="search movie"
        style={{ margin: "5px" }}
        onChange={(e) => {
          setinput(e.target.value);
        }}
      ></input> */}
      <span style={{ color: "red" }}>{lessthan2}</span>
      <span>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" />
          </>
        ) : (
          <></>
        )}
      </span>
      {iserror ? (
        <>
          <div style={{ background: "red" }}>{errorText}</div>
        </>
      ) : (
        <>
          <div className="bg-secondary  bg-opacity-10">
            {arr.length < 1 ? (
              <>
                <center>NO MOVIES FOUND</center>
              </>
            ) : (
              <>
                <Row>
                  {arr.map((abc) => (
                    <Col>
                      <Container>
                        <Displaymovie sentasprops={abc} />
                      </Container>
                    </Col>
                  ))}
                </Row>
              </>

              // <div key={abc.id}>
              //   <img
              //     src={abc.image}
              //     style={{
              //       display: "flex",
              //       justifyContent: "space-evenly",
              //     }}
              //     alt="abcv"
              //   ></img>
              //   <br />
              //   {/* in react  for img tag , alt is compulsary*/}
              //   <Link to={`/viewsingle/${abc.id}`}>
              //     {" "}
              //     {/* PARAMS KO FORMAT HO YO , QUERY KO ARKAI HUNCHA */}
              //     <center style={{ fontWeight: "bold" }}>{abc.name}</center>
              //   </Link>
              //   <br />
              //   {abc.info}
              //   <br />
              //   {abc.rating}
              // </div>

              // <></> represents the child , so we are not using it here ,because using
              //   unique id inside child components wont work
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Indexpage;
