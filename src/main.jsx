import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ArtPage from "./art/ArtPage";
import "./styles/App.css";

// Tiny hash router: "#/art" is the secret art page, everything else is the main site.
// Plain "#section" anchors keep working for in-page links on the main site.
const isArt = () => window.location.hash.startsWith("#/art");

function Root() {
  const [art, setArt] = useState(isArt);

  useEffect(() => {
    const onHash = () => {
      const next = isArt();
      setArt((prev) => {
        if (prev !== next) window.scrollTo({ top: 0, behavior: "instant" });
        return next;
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.title = art ? "Art · Bassirou Diop" : "Bassirou Diop";
  }, [art]);

  return art ? <ArtPage /> : <App />;
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
