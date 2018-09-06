import get from 'lodash.get'
import React from 'react'

const FootprintItem = ({
  footprint
}) => {
  const text = get(footprint, 'text')
  return (
    <div>
      {text}
    </div>
  )
}

export default FootprintItem