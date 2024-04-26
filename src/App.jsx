import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState({
    Prompt: "",
    NegativePrompt: "",
    GuidanceScale: "",
    Language: "",
    Seed: "",
    OutputGcsUri: "",
    AddWatermark: false,
    SafetyFilterLevel: "",
    PersonGeneration: "",
    AspectRatio: "1:1", // Default aspect ratio
    Rating: 0,
  });
  const [imageSource, setImageSource] = useState("");
  const [loading, setLoading] = useState(true);

  const onSubmitPromt = useCallback(async () => {
    //
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you need, like authorization headers
      },
      body: JSON.stringify(prompt),
    });

    console.log(response);
    setLoading(false);
  }, [prompt]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    // Check if the name exists in the prompt object before updating the state
    if (name in prompt) {
      setPrompt((prevPrompt) => ({
        ...prevPrompt,
        [name]: newValue,
      }));
    }

    console.log(prompt);
  };

  const onRate = async (event) => {
    const value = event.target.value;
    const result = { ...prompt, Rating: value };
    var form_data = new FormData();
    for (var key in result) {
      form_data.append(key, result[key]);
    }
    fetch(
      "https://script.google.com/macros/s/AKfycbweCyErGMexO60KyV973J7r73I0nZ_S50EJyzPR_PXmUWt0qVYynTZ5-o3bTOqQoLWK5w/exec",
      {
        method: "POST",
        body: form_data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      });
  };

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
          placeholder="Prompt"
          onChange={handleChange}
          value={prompt.Prompt}
          name="Prompt"
        ></input>
        <button onClick={onSubmitPromt}>submit</button>
      </div>
      <div>
        <img src={{ imageSource }} />
      </div>

      <div>
        Aspect Ratio
        <div>
          <label>
            <input
              type="radio"
              name="AspectRatio"
              value="1:1"
              checked={prompt.AspectRatio === "1:1"}
              onChange={handleChange}
            />
            1:1
          </label>
          <label>
            <input
              type="radio"
              name="AspectRatio"
              value="9:16"
              checked={prompt.AspectRatio === "9:16"}
              onChange={handleChange}
            />
            9:16
          </label>
          <label>
            <input
              type="radio"
              name="AspectRatio"
              value="16:9"
              checked={prompt.AspectRatio === "16:9"}
              onChange={handleChange}
            />
            16:9
          </label>
          <label>
            <input
              type="radio"
              name="AspectRatio"
              value="4:3"
              checked={prompt.AspectRatio === "4:3"}
              onChange={handleChange}
            />
            4:3
          </label>
          <label>
            <input
              type="radio"
              name="AspectRatio"
              value="3:4"
              checked={prompt.AspectRatio === "3:4"}
              onChange={handleChange}
            />
            3:4
          </label>
        </div>
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
        {!imageSource && (
          <>
            <div>Rating</div>
            <div>
              <button onClick={onRate} value={1}>
                1
              </button>
              <button onClick={onRate} value={2}>
                2
              </button>
              <button onClick={onRate} value={3}>
                3
              </button>
              <button onClick={onRate} value={4}>
                4
              </button>
              <button onClick={onRate} value={5}>
                5
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
