import React, {useEffect, useState} from 'react';
import {useFloating, shift, autoUpdate} from '@floating-ui/react-dom';
import './style.css';

const UseFloatingUiB = () => {
    const [isShowRatingStats, setShowRatingStats] = useState(false);
    const {x, y, reference, floating, strategy} = useFloating({
        placement: 'right',
        middleware: [shift()],
      });
     
      return (
        <>
            <button 
                ref={reference}
                onMouseEnter={() => setShowRatingStats(true)}
                onMouseLeave={() => setShowRatingStats(false)}
                >
                Button
            </button>
            {isShowRatingStats && (
            <div
                ref={floating}
                style={{
                position: strategy,
                top: y ?? '',
                left: x ?? '',
                }}
            >
                Tooltip
            </div>
            )}

        </>
      );
};
export default UseFloatingUiB;