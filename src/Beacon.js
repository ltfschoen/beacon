import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import ReactJson from 'react-json-view';
import { Alert, Container, Col, Row, Spinner } from "react-bootstrap";
import pkg from '../package.json';

class Beacon extends Component {
  state = {
    chainHead: {},
    isLoading: false,
    response: {},
    responseMessage: '',
  };

  async componentDidMount() {
    console.log(`Beacon v${pkg.version}`);

    const url = new URL(`${window.location.href}api/beacon/chainhead`);
    // const params = { key: 'value' };
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    this.setState({ isLoading: true });
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.setState({ isLoading: false });
    if (response.status !== 200) {
      console.log('Unable to fetch chain head');
      this.setState({
        responseMsg: response.statusText,
      });
      return;
    };
    const json = await response.json();
    console.log('Response from handling request for chain head in json: ', json);
    this.setState({
      responseMsg: json.message,
      response: json.chainHead,
      chainHead: json.chainHead,
    });
  }

  render() {
    const { chainHead, isLoading, response, responseMsg } = this.state;

    return (
      <Container fluid className="App">
        <Row className="justify-content-md-center">
          <Col xs={12} md={12} className="mt-4">
            <h2>Beacon Chain Visualization</h2><br />
            <p className="media-body-description">
              Visualization of Infura's Beta version of Ethereum 2.0 Phase 0 multi-client testnet (Beacon Chain API) in preparation for the
              launch (teku v0.12.0-dev-5dd16956).
            </p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            { responseMsg ? (
                <Row className="justify-content-md-center">
                  <Col xs={12} md={12}>
                    <Alert variant="info">
                      { responseMsg }
                    </Alert>
                  </Col>
                </Row>
              ) : null
            }
            { response ? (
                <Row className="justify-content-md-center">
                  <Col xs={12} md={12}>
                    <Alert variant="info">
                      <ReactJson src={response} theme="monokai" />
                    </Alert>
                  </Col>
                </Row>
              ) : null
            }
            {
              isLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : null
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Beacon;
