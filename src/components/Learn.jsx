import React from 'react'
import { memo } from 'react'

const Learn = ({count}) => {
    console.log("learin render")
  return (
    <div>
      <p>hi i am counting {count}</p>
    </div>
  )
}

export default memo(Learn)
