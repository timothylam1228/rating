import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [imageSource, setImageSource] = useState("");
  const [loading, setLoading] = useState(true)

  const onSubmitPromt = useCallback(() => {
    //
    console.log()
    setLoading(false)
  }, []);

  return (
    <div
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex" }}>
        <input
          style={{ width: "80%", padding: "10px 20px" }}
          placeholder="prompt"
        ></input>
        <button>submit</button>
      </div>
      <div>
        <img src={{ imageSource }} />
      </div>
      <div
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>Rating</div>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
      </div>
    </div>
  );
}

export default App;
