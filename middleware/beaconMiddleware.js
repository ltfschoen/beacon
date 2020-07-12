const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
const base64 = require('base-64');

const {
  REACT_APP_INFURA_PROJECT_ID,
  REACT_APP_INFURA_PROJECT_SECRET,
  REACT_APP_INFURA_ENDPOINT_ETH2
} = require('../constants');

const getChainHead = async (req, res, next) => {
  try {
    console.log('getChainHead');
    // const url = new URL(`${REACT_APP_INFURA_ENDPOINT_ETH2}/v3/${REACT_APP_INFURA_PROJECT_ID}/beacon/chainhead`);
    const url = new URL(`${REACT_APP_INFURA_ENDPOINT_ETH2}/beacon/chainhead`);
    const username = REACT_APP_INFURA_PROJECT_ID;
    const password = REACT_APP_INFURA_PROJECT_SECRET;

    // const params = { key: 'value' };
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // https://github.com/node-fetch/node-fetch#class-headers
    const meta = {
      // 'Content-Type': 'application/json',
      'Authorization': 'Basic ' + base64.encode(username + ":" + password)
    }
    const headers = new Headers(meta);
    
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    if (response.status !== 200) {
      console.log('Unable to fetch chain head', response);
      return;
    };
    const json = await response.json();
    console.log('Response from handling request for chain head in json: ', json);

    res.locals.chainHead = json;
  } catch (error) {
    if (error) {
      console.error('Error getChainHead: ', error);
      next(error);
      return;
    }
  }
  next();
}

module.exports = {
  getChainHead: getChainHead,
}
