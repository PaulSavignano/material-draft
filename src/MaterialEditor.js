import React, { Component } from "react"
import {
  Editor,
  EditorState,
  convertToRaw,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
  DefaultDraftBlockRenderMap
} from "draft-js"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import Immutable from "immutable"

import InlineStyleControls from "./Controls/InlineStyleControls"
import BlockStyleControls from "./Controls/BlockStyleControls"
import ColorStyleControls from "./Controls/ColorStyleControls"
import TextAlignStyleControls from "./Controls/TextAlignStyleControls"
import BlockData from "./Controls/BlockData"
import AlignStyleControls from './Controls/AlignStyleControls'

import blockStyleMap from "./maps/blockStyleMap"
import colorStyleMap from "./maps/colorStyleMap"
import textAlignStyleMap from "./maps/textAlignStyleMap"

import blockStyleFn from "./functions/blockStyleFn"
import getCurrentBlock from "./getCurrentBlock"

const RenderTypography = props => {
  console.log("render", props)

  return (
    <Typography variant={props.variant} component="div">
      {props.children}
    </Typography>
  )
}

const TYPES = [
  "display4",
  "display3",
  "display2",
  "display1",
  "headline",
  "title",
  "subheading",
  "body2",
  "body1",
  "caption",
  "UL",
  "OL",
  "Code Block"
]


const myMap = TYPES.reduce((a, v) => {
  a[v] = {
    element: "div",
    wrapper: <RenderTypography variant={v} />
  }
  return a
}, {})
const bRenderMap = Immutable.Map(myMap)

const blockRenderMap = DefaultDraftBlockRenderMap.merge(bRenderMap)

class MaterialEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      raw: {
        blocks: []
      }
    }
    this.focus = () => this.refs.editor.focus()
  }
  onChange = editorState => {
    this.setState({ editorState })
  }
  handleKeyCommand = command => {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }
  onTab = e => {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }
  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }
  toggleInlineStyle = inlineStyle => {
    console.log(inlineStyle)
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    )
  }
  toggleColorStyle = toggledColor => {
    const { editorState } = this.state
    const selection = editorState.getSelection()
    const nextContentState = Object.keys(colorStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      },
      editorState.getCurrentContent()
    )

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    )

    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }
    console.log("toggledColor", toggledColor)
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      )
    }

    this.onChange(nextEditorState)
  }
  toggleTextAlignStyle = toggledAlignment => {
    const { editorState } = this.state
    const selection = editorState.getSelection()
    const nextContentState = Object.keys(textAlignStyleMap).reduce(
      (contentState, textAlign) => {
        return Modifier.removeInlineStyle(contentState, selection, textAlign)
      },
      editorState.getCurrentContent()
    )

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    )

    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, textAlign) => {
        return RichUtils.toggleInlineStyle(state, textAlign)
      }, nextEditorState)
    }
    console.log("toggledColor", toggledAlignment)
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledAlignment)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledAlignment
      )
    }

    this.onChange(nextEditorState)
  }
  handleBlockData = () => {
    const { editorState } = this.state
    const selectionState = editorState.getSelection()
    const startKey = selectionState.getStartKey()
    const contentState = editorState.getCurrentContent()
    const currentBlockData = contentState.getBlockForKey(startKey)
    console.log("currentBlockData", currentBlockData)
    const newBlockData = { test: "testing" }
    const newContentState = Modifier.setBlockData(
      contentState,
      selectionState,
      newBlockData
    )
    const newEditorState = EditorState.push(
      this.state.editorState,
      newContentState
    )
    this.setState({ editorState: newEditorState })
  }
  toggleAlign = toggleAlign => {
    const { editorState } = this.state
    const selectionState = editorState.getSelection()
    const startKey = selectionState.getStartKey()
    const contentState = editorState.getCurrentContent()
    const currentBlockData = contentState.getBlockForKey(startKey)
    console.log("currentBlockData", currentBlockData)
    const newBlockData = { align: toggleAlign }
    const newContentState = Modifier.mergeBlockData(
      contentState,
      selectionState,
      newBlockData
    )
    const newEditorState = EditorState.push(
      this.state.editorState,
      newContentState
    )
    this.setState({ editorState: newEditorState })
  }
  handleConvert = () => {
    const { editorState } = this.state
    const raw = convertToRaw(editorState.getCurrentContent())
    console.log("raw", raw)
    this.setState({ raw })
  }
  render() {
    const { editorState } = this.state
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor"
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder"
      }
    }
    return (
      <div>
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <ColorStyleControls
            editorState={editorState}
            onToggle={this.toggleColorStyle}
          />
          <TextAlignStyleControls
            editorState={editorState}
            onToggle={this.toggleTextAlignStyle}
          />
          <BlockData
            editorState={editorState}
            onToggle={this.handleBlockData}
          />
          <AlignStyleControls
            editorState={editorState}
            onToggle={this.toggleAlign}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockRenderMap={blockRenderMap}
              blockStyleMap={blockStyleMap}
              blockStyleFn={blockStyleFn}
              customStyleMap={{ ...colorStyleMap, ...textAlignStyleMap }}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        <button onClick={this.handleConvert}>Convert</button>
        {this.state.raw.blocks.map(c => {
          console.log('c', c)
          const variant = c.type === "unstyled" ? "body1" : c.type
          const styles = c.inlineStyleRanges.reduce((a, v) => {
            switch (true) {
              case v.style.includes('color'):
                  a['color'] = colorStyleMap[v.style].color
                  break
              default: 
                a['textAlign'] = v.style
            }
            return a
          }, {})
          console.log('styles', styles)
          return (
            <Typography key={c.key} variant={variant}>
              {c.text}
            </Typography>
          )
        })}
      </div>
    )
  }
}

export default MaterialEditor
