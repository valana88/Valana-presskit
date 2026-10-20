import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { StyleSheetManager } from "styled-components";
import GlobalStyle from "./GlobalStyle.jsx";
import AuroraStyle from "./AuroraStyle.jsx";

createRoot(document.getElementById("root")).render(
  // Préfixes navigateurs (-webkit-…) ajoutés par styled-components, pour Safari notamment
  <StyleSheetManager enableVendorPrefixes>
    <GlobalStyle />
    <AuroraStyle />
    <App />
  </StyleSheetManager>,
);
