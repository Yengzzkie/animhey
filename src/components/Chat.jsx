import supabase from "../utils/supabaseClient";
import { useEffect, useState, useRef } from "react";
import generateUserId from "../utils/generateUserId";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isUserNew, setIsUserNew] = useState(false);

  // Fetch or generate userId on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("animheyId");

    if (!storedUserId) {
      const newUserId = generateUserId();
      localStorage.setItem("animheyId", newUserId);
      setUserId(newUserId);
      checkUserExistence(newUserId);  // Check if the user exists
    } else {
      setUserId(storedUserId);
      checkUserExistence(storedUserId);  // Check if the user exists
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Check if the user exists in the database
  const checkUserExistence = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, name")
      .eq("id", userId)
      .single();

    if (error || !data) {
      // User does not exist
      setIsUserNew(true);
    } else {
      // User exists, set the user name
      setUserName(data.name);
    }
  };

  // If the user is new, update their name in the database
  const handleUsernameSubmit = async (username) => {
    if (!username) return;

    const { error } = await supabase.from("users").upsert([{ id: userId, name: username }]);

    if (error) {
      console.error("Error updating user:", error);
    } else {
      setUserName(username);
      setIsUserNew(false);
    }
  };

  // Fetch existing messages when the component loads
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    const messageListener = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((currentMessages) => [...currentMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      messageListener.unsubscribe();
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Insert new message to the database
  const sendMessage = async () => {
    if (!messageInput.trim() || !userId || !userName) return; // Ensure userId and userName are available

    await supabase.from("messages").insert([{ sender: userName, text: messageInput }]);
    setMessageInput("");
  };

  return (
    <div className="flex flex-col border max-h-[500px] w-full h-full p-6">
      <h2 className="text-center mb-2 font-bold">Public Chatroom</h2>

      {/* If user is new, show prompt for username */}
      {isUserNew && (
        <div className="p-4">
          <p className="italic text-red-400 text-xs mb-2">To use the public chatroom, enter your display name.</p>
          <input
            className="p-2 text-gray-600 border rounded-md"
            type="text"
            placeholder="Enter your display name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName || ""}
          />
          <button
            className="ml-2 p-2 bg-red-500 text-white rounded-md"
            onClick={() => handleUsernameSubmit(userName)}
          >
            Submit
          </button>
        </div>
      )}

      {/* Messages area with scrolling */}
      <div className="flex-1 mb-4 overflow-y-auto no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.sender === userName ? "bg-blue-600 ml-auto mb-2 rounded-md p-2 w-1/2" : "bg-gray-700 text-white mb-2 rounded-md p-2 w-1/2"}>
            <p>{msg.text}</p>
            <p className="italic text-[#cecece] text-xs">From: {msg.sender}</p>
            <p className="italic text-[#cecece] text-xs">
              {new Date(msg.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center space-x-2 mt-2">
        <input
          className="flex-1 text-gray-600 rounded-md border p-2"
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="bg-[#ccc] text-black border p-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
