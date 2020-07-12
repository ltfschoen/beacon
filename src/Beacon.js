import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import { } from "react-bootstrap";
import pkg from '../package.json';

class Beacon extends Component {
  constructor(){
    super();
    this.state = {};
  }

  async componentDidMount() {
    console.log(`Beacon v${pkg.version}`);
  }

  render() {
    return (
      <div>
        <div className="brandname">Beacon</div>
      </div>
    );
  }
}

export default Beacon;
