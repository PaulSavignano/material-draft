import React from "react"
import Typography from "@material-ui/core/Typography"

const renderTypography = props => {
  const test = props
  console.log("test", test)
  const variant = props.block.getType()
  const children = props.block.getText()
  return (
    <Typography variant={variant} component="div">
      {children}
    </Typography>
  )
}

const getBlock = block => {
  console.log("getBlock props", block)
  return {
    component: renderTypography
  }
}

export default getBlock
