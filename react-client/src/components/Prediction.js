import React, { useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Output from './Output';

function Prediction() {
  //
  const [userInputValue, setUserInputValue] = useState({ sepalLength: "", sepalWidth: "", petalLength: "", petalWidth: "", epochs: "", learningRate: "" });
  const [showLoading, setShowLoading] = useState(false);
  const [screen, setScreen] = useState({});
  const [output, setOutput] = useState(false);
  //
  const apiUrl = "http://localhost:3000/run";
  //
  const runModel = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { sepalLength: userInputValue.sepalLength, sepalWidth: userInputValue.sepalWidth, petalLength: userInputValue.petalLength, petalWidth: userInputValue.petalWidth, 
      epochs: userInputValue.epochs, learningRate: userInputValue.learningRate};
    console.log(data);
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        console.log("results from Model:", result.data);
        setScreen(result.data);
        setOutput(true);
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUserInputValue({ ...userInputValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="input">
      <Jumbotron className="form">
        <div >
        <Form onSubmit={runModel} >
          <Form.Group >
            <div className="fromGroup"> 
            <Form.Label>Sepal Length: </Form.Label>
            <Form.Control className="formCell" type="number"  step=".01" id="sepalLength" name="sepalLength" placeholder="Please enter Sepal Length" value={userInputValue.sepalLength} onChange={onChange} required/>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="fromGroup">
            <Form.Label>Sepal Width: </Form.Label>
            <Form.Control className="formCell" type="number" step=".01" id="sepalWidth" name="sepalWidth" placeholder="Please enter Sepal Width" value={userInputValue.sepalWidth} onChange={onChange} required/>
          </div>
          </Form.Group>
          <Form.Group>
          <div className="fromGroup">
            <Form.Label>Petal Length: </Form.Label>
            <Form.Control className="formCell" type="number" step=".01" id="petalLength"name="petalLength" placeholder="Please enter Petal Length" value={userInputValue.petalLength} onChange={onChange} required/>
          </div>
          </Form.Group>
          <Form.Group>
          <div className="fromGroup">
            <Form.Label>Petal Width: </Form.Label>
            <Form.Control className="formCell" type="number" step=".01" id="petalWidth" name="petalWidth" placeholder="Please enter Petal Width" value={userInputValue.petalWidth} onChange={onChange} required/>
          </div>
          </Form.Group>
          <Form.Group>
          <div className="fromGroup">
            <Form.Label>Epochs: </Form.Label>
            <Form.Control className="formCell" type="number" min="50" max="500" id="epochs" name="epochs" placeholder="Please enter Epochs from 50-500" value={userInputValue.epochs} onChange={onChange} required/>
          </div>
          </Form.Group>
          <Form.Group>
          <div className="fromGroup">
            <Form.Label>Learning Rate:    </Form.Label>
            <Form.Control className="formCell" type="number" step=".01" max="5.0" id="learningRate" name="learningRate" placeholder="Enter the learning rate from 1-5" value={userInputValue.learningRate}onChange={onChange} required/>
         </div>
          </Form.Group>
          <div className="fromGroup">
          <Button variant="primary" type="submit">
            Get Predictions
          </Button>
          </div>
        </Form>
        </div>
      </Jumbotron>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {output && (
        <Output screen={screen} setScreen={setScreen} />
      )}
      
    </div>
  );
}

export default Prediction;