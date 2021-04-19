import React, { useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Output(props) {
    const { screen, setScreen } = props;
    return (
        <div className="output">
            <h1> It is a</h1>
            <h1>{screen.flower}</h1>
        </div>
    );
}

export default Output;