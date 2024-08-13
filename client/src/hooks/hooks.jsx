import { useEffect } from "react";

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    // here Object.entries(handlers) --> 
    // is converted an object into an array of arrays of key - value pair
    Object.entries(handlers).forEach(([eventName, hadler]) => {
      socket.on(eventName, hadler)
    });

    return () => {
        Object.entries(handlers).forEach(([eventName, hadler])=>{
            socket.off(eventName, hadler
              // (data) => {
              //   console.log(data);
              //   const newMessages = [...messages, data];
              //   setMessages
              // };
            )
        })
    }
  }, [socket, handlers]);
};

export { useSocketEvents };
