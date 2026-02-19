const net = require("net");

const LOCAL_PORT = 3307;
const DEST_PORT = 3306;
const DEST_HOST = "localhost";

const server = net.createServer((socket) => {
  const client = net.createConnection({ port: DEST_PORT, host: DEST_HOST });

  client.on("connect", () => {
    console.log(
      `Connection proxied: ${socket.remoteAddress}:${socket.remotePort} -> ${DEST_HOST}:${DEST_PORT}`,
    );
    socket.pipe(client);
    client.pipe(socket);
  });

  client.on("error", (err) => {
    console.error(`Destination error: ${err.message}`);
    socket.end();
  });

  socket.on("error", (err) => {
    console.error(`Source error: ${err.message}`);
    client.end();
  });

  socket.on("close", () => {
    client.end();
  });

  client.on("close", () => {
    socket.end();
  });
});

server.listen(LOCAL_PORT, "127.0.0.1", () => {
  console.log(
    `TCP Proxy listening on ${LOCAL_PORT}, forwarding to ${DEST_HOST}:${DEST_PORT}`,
  );
});

server.on("error", (err) => {
  console.error(`Server error: ${err.message}`);
});
