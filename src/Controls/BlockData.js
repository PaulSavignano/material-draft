import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"

import StyleButton from "./StyleButton"

const styles = {
  root: {
    color: "red"
  }
}

const TYPES = [
  { label: "setData", style: "setData" },
]

const BlockData = props => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockData = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getData()
    .get('test')
  console.log('BlockData', blockData)
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

export default withStyles(styles, { withTheme: true })(BlockData)