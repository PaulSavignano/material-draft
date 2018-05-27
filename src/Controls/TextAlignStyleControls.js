import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"

import StyleButton from "./StyleButton"

const styles = {
  root: {
    color: "red"
  }
}

const TYPES = [
  { label: "left", style: "left" },
  { label: "center", style: "center" },
  { label: "right", style: "right" }
]

const TextAlignStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle()

  return (
    <div className="RichEditor-controls">
      {TYPES.map(type => (
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

export default withStyles(styles, { withTheme: true })(TextAlignStyleControls)
