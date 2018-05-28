import React from "react"

const EditorImage = props => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const { src } = entity.getData();
  const type = entity.getType();
  return <img src={src} />
}

export default EditorImage
