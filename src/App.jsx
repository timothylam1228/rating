import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState({
    Prompt: "",
    Persona: "",
    NegativePrompt: "",
    GuidanceScale: "",
    Language: "en",
    Seed: "",
    OutputGcsUri: "",
    AddWatermark: false,
    SafetyFilterLevel: "",
    PersonGeneration: "dont_allow",
    AspectRatio: "1:1", // Default aspect ratio
    Rating: 0,
  });
  const [imageSource, setImageSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmitPromt = useCallback(async () => {
    //
    setLoading(true);
    setImageSource("");
    const data = {
      prompt: prompt.Prompt,
      // negative_prompt: prompt.NegativePrompt,
      // guidance_scale: prompt.GuidanceScale,
      language: prompt.Language,
      // seed: prompt.Seed,
      // output_gcs_uri: prompt.OutputGcsUri,
      // add_watermark: prompt.AddWatermark,
      // safety_filter_level: prompt.SafetyFilterLevel,
      // person_generation: prompt.PersonGeneration,
      aspect_ratio: prompt.AspectRatio,
    };
    try {
      const response = await fetch(
        "https://essaa-creatolens-cdr-media-service-sit-y7nazd37ga-df.a.run.app/gen-image/v1/prompt",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const image = await response.json();
      console.log("image", image.data.message);
      setImageSource(image.data.message);
      if (image.data.traceback) {
        setError(image.data.traceback);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
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
  };

  const onRate = async (event) => {
    setLoading(true);
    const value = event.target.value;
    const result = { ...prompt, Rating: value };
    // const result = { "Prompt": prompt.Prompt };
    var form_data = new FormData();
    for (var key in result) {
      form_data.append(key, result[key]);
    }

    // upload image to google drive

    fetch(import.meta.env.VITE_APP_SCRIPT, {
      method: "POST",
      body: form_data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
    setPrompt((prevPrompt) => ({
      ...prevPrompt,
      Prompt: "",
    }));
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
      <p>
        prompt example: You are a [Foodie]. give me a cake image for me to post
        on instagram
      </p>
      <p>
        You are a photographer generate a Photorealism image in Hong Kong for
        IG story Vertical
      </p>

      <div style={{ display: "flex" }}>
        <textarea
          style={{ width: "100%", padding: "10px 20px" }}
          placeholder="Prompt"
          onChange={handleChange}
          value={prompt.Prompt}
          disabled={loading}
          name="Prompt"
        ></textarea>
      </div>
      <button
        style={{ padding: "12px 30px" }}
        disabled={loading}
        onClick={onSubmitPromt}
      >
        submit
      </button>

      <div>
        Aspect Ratio
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
      <div>
        Language:
        <input
          type="radio"
          name="Language"
          value="en"
          checked={prompt.Language === "en"}
          onChange={handleChange}
          placeholder="Language"
        />
        English
        <input
          type="radio"
          name="Language"
          value="cn"
          checked={prompt.Language === "cn"}
          onChange={handleChange}
        />
        Chinese
      </div>
      <div style={{ display: "none" }}>
        Persona:
        <input
          type="radio"
          name="Persona"
          value=""
          checked={prompt.Persona === ""}
          defaultChecked
          onChange={handleChange}
        />
        <label>None</label>
        <input
          type="radio"
          name="Persona"
          value="Foodie"
          checked={prompt.Persona === "Foodie"}
          onChange={handleChange}
        />
        <label>Foodie</label>
        <input
          type="radio"
          name="Persona"
          value="Digital Marketer"
          checked={prompt.Persona === "Digital Marketer"}
          onChange={handleChange}
        />
        <label>Digital Marketer</label>
        <input
          type="radio"
          name="Persona"
          value="Content Manager"
          checked={prompt.Persona === "Content Manager"}
          onChange={handleChange}
        />
        <label>Content Manager</label>
        <input
          type="radio"
          name="Persona"
          value="Photographer"
          checked={prompt.Persona === "Photographer"}
          onChange={handleChange}
        />
        <label>Photographer</label>
        <input
          type="radio"
          name="Persona"
          value="Content Creator"
          checked={prompt.Persona === "Content Creator"}
          onChange={handleChange}
        />
        <label>Content Creator</label>
        <input
          type="radio"
          name="Persona"
          value="Graphic Designer"
          checked={prompt.Persona === "Graphic Designer"}
          onChange={handleChange}
        />
        <label>Graphic Designer</label>
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
        {imageSource && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  aspectRatio: "auto",
                  maxWidth: "400px",
                  width: "100%",
                }}
                src={imageSource}
                alt="Generated Image"
              />
            </div>
            <div className="rating-section">
              Rating:
              {Array.from({ length: 10 }, (_, i) => (
                <button
                  style={{ padding: 15 }}
                  key={i + 1}
                  onClick={onRate}
                  value={i + 1}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </div>
  );
}

export default App;
