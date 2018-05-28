import React from 'react'
import MuiTypography from '@material-ui/core/Typography'

import colorStyleMap from "../maps/colorStyleMap"
import textAlignStyleMap from '../maps/textAlignStyleMap'


const Typography = ({
  component,
}) => {
  const variant = component.type === "unstyled" ? "body1" : component.type
  const styles = component.inlineStyleRanges.reduce((a, v) => {
    switch (true) {
      case v.style.includes('color'):
        a['color'] = colorStyleMap[v.style].color
        break
      case v.style.includes('textAlign'):
        a['textAlign'] = textAlignStyleMap[v.style].textAlign
        break
      default:
        return
    }
    return a
  }, {})
  console.log('styles', styles)
  return (
    <MuiTypography key={component.key} variant={variant} style={styles}>
      {component.text}
    </MuiTypography>
  )
}

export default Typography