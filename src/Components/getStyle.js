import colorStyleMap from '../maps/colorStyleMap'
import textAlignStyleMap from '../maps/textAlignStyleMap'

const getStyles = component => {
  const styles = component.inlineStyleRanges.reduce((a, v) => {
    switch (true) {
      case v.style.includes("color"):
        a["color"] = colorStyleMap[v.style].color
        break
      case v.style.includes("textAlign"):
        a["textAlign"] = textAlignStyleMap[v.style].textAlign
        break
      default:
        return
    }
    return a
  }, {})
  return styles
}

export default getStyles
