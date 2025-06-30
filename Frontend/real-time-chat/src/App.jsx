import React, { use, useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const socketRef = useRef(null);

  // // // Connect to WebSocket when component mounts
  // // useEffect(() => {
  // //   socketRef.current = new WebSocket("ws://localhost:3000");

  // //   socketRef.current.onopen = () => {
  // //     console.log("✅ Connected to WebSocket server");
  // //   };

  // //   socketRef.current.onmessage = (event) => {
  // //     const data = JSON.parse(event.data);
  // //     setMessages((prev) => [...prev, data.message]);
  // //   };

  // //   socketRef.current.onclose = () => {
  // //     console.log("❌ WebSocket connection closed");
  // //   };

  // //   return () => {
  // //     socketRef.current.close(); // Clean up on unmount
  // //   };
  // // }, []);

  // useEffect(()=>{
  //   socketRef.current= new WebSocket("ws://localhost:3000");
  //   socketRef.current.onopen=()=>{
  //     console.log("Connected to WebSocket server");
  //   }

  //   socketRef.current.onmessage=(event)=>{

  //     const data=JSON.parse(event.data);
  //     setMessages((prev)=>[...prev,data.message])
  //   } 
  //   socketRef.current.onclose=()=>{
  //     console.log("WebSocket connection closed");
  //   }
  //   return()=>{
  //     socketRef.current.close();
  //   }
  // },[])

  // const sendMessage = () => {
  //   if (inputMsg.trim() && socketRef.current.readyState === WebSocket.OPEN) {
  //     socketRef.current.send(inputMsg);
  //     setInputMsg("");
  //   }
  // };

  useEffect(()=>{
    socketRef.current=new WebSocket('ws://localhost:3000')
    socketRef.current.onopen=()=>{
      console.log('Connected to WebSocket server')
    }

    socketRef.current.onmessage=(event)=>{
      const data=JSON.parse(event.data)
      setMessages((prev)=>[...prev,data.message])
    }
    socketRef.current.onclose=()=>{
      console.log('WebSocket connection closed')
    }
    return()=>{
      socketRef.current.close()
    }

  },[])

  const sendMessage=()=>{
    if(inputMsg.trim() && socketRef.current.readyState===WebSocket.OPEN){
      socketRef.current.send(inputMsg)
      setInputMsg('')
    }

  }


  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>💬 Real-Time Chat (WebSocket)</h2>
      <div style={{ border: "1px solid #ccc", height: 300, overflowY: "scroll", padding: 10, background: "#fff" }}>
        {messages.map((msg, i) => (
          <div key={i}>👤 {msg}</div>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <input
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button onClick={sendMessage} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
