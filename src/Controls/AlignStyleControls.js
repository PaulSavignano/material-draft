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

const AlignStyleControls = props => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockData = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getData()
    .get("align")
  console.log("BlockData", blockData)
  return (
    <div className="RichEditor-controls">
      {TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockData}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(AlignStyleControls)
