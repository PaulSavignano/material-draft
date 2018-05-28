import React from "react"
import PropTypes from "prop-types"

import Typography from "./Typography"
import Image from './Image'

const ComponentSwitch = ({ component, entityMap }) => {
  if (component.type === 'atomic') {
    const key = component.entityRanges[0].key
    const src = entityMap[key].data.src
    return (
      <Image src={src}/>
    )
  }
  return <Typography component={component} />
}

ComponentSwitch.propTypes = {
  item: PropTypes.object.isRequired
}

export default ComponentSwitch
