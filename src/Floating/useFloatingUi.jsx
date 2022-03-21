import { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { useFloating, shift, flip, arrow, offset, autoUpdate } from '@floating-ui/react-dom';

/**
 * This is a Floating UI hook for tooltip/popover usage purposes
 *
 * Usage: https://floating-ui.com/docs/react-dom
 *
 * @param {Element} referenceEl - The element where the tooltip will be attached to
 * @param {Element} tooltipElement - The element that displays the content of the tooltip
 * @param {Options} tooltipOptions - Custom options, currently it only supports the modifiers property
 * @returns {object} Styles and attributes to be passed as props to the elements provided to this hook
 */
const useFloatingUi = () => {
    // const arrowRef = useRef(null);
    const {x, y, reference, floating, strategy, update} = useFloating({
        placement: 'right',
        middleware: [flip()],
    });

    const tooltipStyle = {
        position: strategy,
        background: '#222',
        color: 'white',
        fontWeight: 'bold',
        padding: '5px',
        borderRadius: '4px',
        fontSize: '90%',
        pointerEvents: 'none',
        top: y ?? '',
        left: x ?? '',
    };

    const arrowStyle = {
        position: strategy,
        background: '#222',
        width: '8px',
        height: '8px',
        transform: 'rotate(45deg)',
    };

    const [state, setState] = useState({
        styles: {
          floating: tooltipStyle,
          arrow: arrowStyle,
        },
    });
    
    return {
        styles: state.styles,
        refs: {
            reference: reference,
            floating: floating
        }
    };
};

export default useFloatingUi;
