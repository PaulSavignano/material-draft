import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"

import StyleButton from "./StyleButton"

const styles = {
  root: {
    color: "red"
  }
}

const BLOCK_TYPES = [
  { label: "display4", style: "display4" },
  { label: "display3", style: "display3" },
  { label: "display2", style: "display2" },
  { label: "display1", style: "display1" },
  { label: "headline", style: "headline" },
  { label: "title", style: "title" },
  { label: "subheading", style: "subheading" },
  { label: "body2", style: "body2" },
  { label: "body1", style: "body1" },
  { label: "caption", style: "caption" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
]

const BlockStyleControls = props => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(BlockStyleControls)
