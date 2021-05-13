# Vatcher is vatching U

the new file/graph explorer generation

- vatcher is a server that listen for change in your system through chokidar and send it through socket.io to the client


# vatcher parts
- vatch server : https://github.com/scenaristeur/vatch
- vatch-vite : a Vuejs client app for vatch server : https://github.com/scenaristeur/vatch-vite

First launch the server on port 3000

To install the server :
```
git clone https://github.com/scenaristeur/vatch.git
cd vatch
git submodule update --init --recursive // git submodule update --recursive --remote for later updates
npm install
node .
// explore on http://localhost:3000
```
Next launch the client on port 3001


To install the client :
```
git clone https://github.com/scenaristeur/vatch-vite.git
cd vatch-vite
npm install
npm run dev
// explore on http://localhost:3001
```
you can change the port of the server at the bottom on the index.js file, but you have to put the same on the client in index.html.

index.js on vatch
```
server.listen(3000, () => { // ok for local network on linux
  console.log('listening on *:3000');
  });
```

index.html on vatch-vite
```
  var socket = io(':3000');
```

# vue2 to vue3 migration

# chat socket.io vuejs

https://medium.com/js-dojo/build-a-real-time-chat-app-with-vuejs-socket-io-and-nodejs-714c8eefa54e
