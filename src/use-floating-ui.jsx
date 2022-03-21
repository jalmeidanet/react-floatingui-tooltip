import React, {useEffect, useRef, useLayoutEffect} from 'react';
import {useFloating, shift, flip, offset, arrow, autoUpdate} from '@floating-ui/react-dom';

const ARROW_STATIC_SIDE = '-4';
const ARROW_STATIC_SIDE_BORDER = (width) => +ARROW_STATIC_SIDE - width;
const TOOLTIP_POSITIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
};

/**
 * FloatingUI component for tooltip usage purposes
 * Library: https://floating-ui.com
 *
 * @param {Boolean}      shouldShowTooltip        Should show the tooltip (on mouseenter/mouseleave)
 * @param {Element}      floatingElementRef       The element where the tooltip is attached to
 * @param {Object}       floatingTooltipStyle     Custom options: background, color, textAlign, borderWidth, borderStyle, borderColor, offSet, padding, zIndex
 * @param {String}       floatingTooltipPosition  Tooltip position
 * @param {Element}      children                 The tooltip body/content
 * @returns {HTMLElement}                         Returns the tooltip element
 */
const UseFloatingUi = ({
  shouldShowTooltip,
  floatingElementRef,
  floatingTooltipStyle: {
    background,
    color,
    textAlign,
    borderWidth,
    borderStyle,
    borderColor,
    offSet,
    padding,
    zIndex,
  },
  floatingTooltipPosition,
  children,
}) => {
  let arrowStyleRotation;
  const shouldShowBorder = !!borderWidth;
  const arrowRef = useRef(null);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    update,
    placement,
    refs,
  } = useFloating({
    placement: floatingTooltipPosition || 'top',
    middleware: [
      offset(+offSet),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  // check if using flip()
  const isFlipped = floatingTooltipPosition !== placement.split('-')[0];

  // handle arrow static side border
  switch (floatingTooltipPosition) {
    case TOOLTIP_POSITIONS.TOP:
      arrowStyleRotation = isFlipped ? 'rotate(45deg)' : 'rotate(-135deg)';
      break;

    case TOOLTIP_POSITIONS.RIGHT:
      arrowStyleRotation = isFlipped ? 'rotate(135deg)' : 'rotate(-45deg)';
      break;

    case TOOLTIP_POSITIONS.LEFT:
      arrowStyleRotation = isFlipped ? 'rotate(-45deg)' : 'rotate(135deg)';
      break;

    default:
      arrowStyleRotation = isFlipped ? 'rotate(-135deg)' : 'rotate(45deg)';
      break;
  }

  // handle arrow symbol
  const staticSide = {
    top: TOOLTIP_POSITIONS.BOTTOM,
    right: TOOLTIP_POSITIONS.LEFT,
    bottom: TOOLTIP_POSITIONS.TOP,
    left: TOOLTIP_POSITIONS.RIGHT,
  }[placement.split('-')[0]];

  // set tooltip style
  let tooltipStyle = {
    position: strategy,
    background: background || '',
    color: color || '',
    textAlign: textAlign || 'center',
    padding: `${padding}px`,
    borderRadius: '4px',
    pointerEvents: 'none',
    top: y ?? '',
    left: x ?? '',
    zIndex: zIndex ? `${zIndex}` : '',
  };

  // set arrow style
  let arrowStyle = {
    position: strategy,
    background: padding ? '#fff' : background,
    width: '8px',
    height: '8px',
    transform: arrowStyleRotation,
    left: arrowX ? `${arrowX}px` : '',
    top: arrowY ? `${arrowY}px` : '',
    right: '',
    bottom: '',
    zIndex: zIndex ? `${zIndex}` : '99999',
    [staticSide]: shouldShowBorder
      ? `${ARROW_STATIC_SIDE_BORDER(borderWidth)}px`
      : '-4px',
  };

  // handle tooltip border if border is visible
  if (shouldShowBorder) {
    tooltipStyle = {
      ...tooltipStyle,
      borderStyle: borderStyle || '',
      borderWidth: `${borderWidth}px` || '',
      borderColor: borderColor || '',
    };

    arrowStyle = {
      ...arrowStyle,
      borderTopWidth: `${borderWidth}px` || '',
      borderTopColor: borderColor || '',
      borderTopStyle: borderStyle || '',
      borderLeftWidth: `${borderWidth}px` || '',
      borderLeftColor: borderColor || '',
      borderLeftStyle: borderStyle || '',
    };
  }

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update]);

  useLayoutEffect(() => {
    reference(floatingElementRef.current);
  }, [floatingElementRef.current]);

  return (
    <>
      {shouldShowTooltip && (
        <div
          role="tooltip"
          data-testid="tooltip-test"
          ref={floating}
          style={tooltipStyle}
        >
          {children}
          <div
            ref={arrowRef}
            style={arrowStyle}
            className="floating-ui-arrow"
          />
        </div>
      )}
    </>
  );
};

export default UseFloatingUi;

