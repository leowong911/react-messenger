import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection("rooms")
        .doc(roomId)
        .collection("msgs")
        .orderBy("ts", "asc")
        .onSnapshot((snapshot) => {
          setMsgs(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Entered: ", input);
    db.collection("rooms").doc(roomId).collection("msgs").add({
      content: input,
      name: user.displayName,
      ts: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerInfo">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <h3 className="chat-room-name">{roomName}</h3>
          <p className="chat-room-last-seen">
            Last seen:{" "}
            {new Date(msgs[msgs.length - 1]?.ts?.toDate()).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {msgs.map((msg) => (
          <p
            className={`chat__message ${
              msg.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{msg.name}</span>
            {msg.content}
            <span className="chat__timestamp">
              {new Date(msg.ts?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Message..."
            type="text"
          />
          <button type="submit" onClick={sendMessage}>
            Send a messgae
          </button>
          <MicIcon />
        </form>
      </div>
    </div>
  );
}

export default Chat;
