module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '51.210.15.66',
      username: 'ubuntu',
      // pem: './path/to/pem'
      password: 'rGjPK8hEAnUf'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'devinamique',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://devinamique.com',
      MONGO_URL: 'mongodb://mongodb/meteor',
      //MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: "zodern/meteor:root",//'abernix/meteord:base',//'abernix/meteord:node-8.4.0-base',
    },

    deployCheckWaitTime: 60,
    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  proxy: {
    domains: 'devinamique.com,www.devinamique.com',

    ssl: {
      // Enable Let's Encrypt
      letsEncryptEmail: 'adrien.gatinois@lgatl.fr',
      forceSSL: true
    }
  }
};
