import React from "react";
import { createRoot } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import Contact from "./Contact.jsx";
import ContactStyle from "./ContactStyle.jsx";
import AuroraStyle from "./AuroraStyle.jsx";

createRoot(document.getElementById("root")).render(
  <StyleSheetManager enableVendorPrefixes>
    <ContactStyle />
    <AuroraStyle />
    <Contact />
  </StyleSheetManager>,
);
