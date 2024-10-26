const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'CIS480_Project',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

