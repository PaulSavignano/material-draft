import React from "react"

import EditorImage from "../Components/EditorImage"

const blockRendererFn = contentBlock => {
  const type = contentBlock.getType()
  if (type === "atomic") {
    return {
      component: EditorImage,
      editable: false,
      props: {
        foo: "bar"
      }
    }
  }
}

export default blockRendererFn
