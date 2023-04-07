
import React from 'react';
import socketClient from 'socket.io-client';
const SERVER = "https://www.google.com/?client=safari";

function ChatApp() {
 let socket_io = socketClient(SERVER);
 console.log('socket_io', socket_io);
   return (
      < div >
        <p>Just checking if this is working!</p >
      </div >
    );
}
export default ChatApp