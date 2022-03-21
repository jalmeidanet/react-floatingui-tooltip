import React, {useLayoutEffect} from 'react'
import { useFloating } from '@floating-ui/react-dom';

const RatingStats = ({ text, floatingElementRef, floatingStyles, arrowElementRef, arrowStyles }) => {
  return (
    <>
      
      <div
        style={floatingStyles}
        ref={floatingElementRef}
        className="rating-stats"
        role="dialog"
      >
        <p>1 - 0%</p>
        <p>2 - 5%</p>
        <p>3 - 15%</p>
        <p>4 - 45%</p>
        <p>5 - 35%</p>

      </div>
    </>
  )
}

export default RatingStats