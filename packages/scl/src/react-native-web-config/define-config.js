//Updates from https://github.com/tanhauhau/react-web-config

const dotenv = require('dotenv');

module.exports = function ReactWebConfig(path) {
  const env = (0, dotenv.config)({path}).parsed;
  return {
    __REACT_WEB_CONFIG__: JSON.stringify(env),
  }
};