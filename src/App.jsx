import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import axios from "axios";
import qrImage from "./assets/QR Code Generator.png";

function App() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleTextChange(e) {
    setText(e.target.value);
    setError(""); // Clear the error when the text changes
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (text.trim() === "") {
      setError("Please enter some text before generating.");
      return;
    }

    // Your Axios request logic goes here
    axios
      .post(
        "https://qrcode-generator-backend.onrender.com/qrcode",
        { text },
        { responseType: "arraybuffer" }
      )
      .then((res) => {
        const blob = new Blob([res.data], { type: "image/png" });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${text}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setText("");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <>
      <img className="qrImage" src={qrImage} alt="QR Code" />
      <h1 className="header">QR Code Generator</h1>

      {/* Error field */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Form */}
      <form className="qrForm" onSubmit={handleSubmit}>
        {/* Text field */}
        <input onChange={handleTextChange} type="text" value={text} />

        {/* Generate button */}
        <button type="submit">Generate</button>
      </form>

      {/* Footer */}
      <footer className="footer">
        <h2>Contact Us</h2>
        <a className="Email" href="mailto:mazenshebeta@gmail.com">mazenshebeta@gmail.com</a>
        <br />

        {/* Icons */}
        <div className="icons">
          <a
            href="https://www.linkedin.com/in/mazen-shebeta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <a
            href="https://github.com/MazenShebeta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

        {/* <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mazen-shebeta/">LinkedIn</a> */}
      </footer>
    </>
  );
}

export default App;
