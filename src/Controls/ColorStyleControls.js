import React from "react"

import StyleButton from "./StyleButton"

const styles = {
  controls: {
    fontFamily: "'Helvetica', sans-serif",
    fontSize: 14,
    marginBottom: 10,
    userSelect: "none"
  }
}

const COLORS = [
  { label: "Red", style: 'colorRed' },
  { label: "Orange", style: "colorOrange" },
  { label: "Yellow", style: "colorYellow" },
  { label: "Green", style: "colorGreen" },
  { label: "Blue", style: "colorBlue" },
  { label: "Indigo", style: "colorIndigo" },
  { label: "Violet", style: "colorViolet" }
]

const ColorControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div style={styles.controls}>
      {COLORS.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

export default ColorControls
