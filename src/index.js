import React from "react"
import { render } from "react-dom"
import Hello from "./Hello"

import "./index.css"
import MaterialEditor from "./MaterialEditor"

const styles = {
  fontFamily: "sans-serif",
}

const App = () => (
  <div style={styles}>
    <MaterialEditor />
  </div>
)

render(<App />, document.getElementById("root"))
