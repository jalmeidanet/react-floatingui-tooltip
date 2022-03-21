// import { h } from 'preact';
import { render, screen, fireEvent } from '@testing-library/react';
// import { render, screen, fireEvent } from '@testing-library/preact';
import UseFloatingUi from './use-floating-ui';

const TOOLTIP_CONTENT = 'My tooltip with more content';
const BORDER_STYLE = 'solid';
const BORDER_WIDTH = '2';
const BORDER_COLOR = 'rgb(232, 232, 232)';

const MOCK_TOOLTIP_STYLE = {
    background: '#f8f8f8',
    color: '#aaa',
    borderWidth: BORDER_WIDTH,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    offSet: '10',
    padding: '10',
    zIndex: 'auto'
}

const setupTest = (tooltipStyle, showTooltip, position, content) => {
    const refElement = document.createElement("button");
    return render(
        <UseFloatingUi 
            shouldShowTooltip={showTooltip}
            floatingElementRef={refElement} 
            floatingTooltipStyle={tooltipStyle}
            floatingTooltipPosition={position}
        >
            <span>{content}</span>
        </UseFloatingUi>
    );
};

describe('Floating UI', () => {
    test('should display tootip on mouseEnter', () => {
        setupTest(MOCK_TOOLTIP_STYLE, true, 'top', TOOLTIP_CONTENT);

        const floatingTooltip = screen.getByRole("tooltip");
        expect(floatingTooltip).toBeTruthy();
    });

    test('should hide tooltip on mouseLeave', () => {
        setupTest(MOCK_TOOLTIP_STYLE, false, 'top', TOOLTIP_CONTENT);

        const floatingTooltip = screen.queryByTestId("tooltip-test");
        expect(floatingTooltip).toBeNull();
    });

    test('should render with border style', () => {
        setupTest(MOCK_TOOLTIP_STYLE, true, 'top', TOOLTIP_CONTENT);

        const floatingTooltip = screen.getByRole("tooltip");
        expect(floatingTooltip).toHaveStyle({
            borderWidth: BORDER_WIDTH,
            borderColor: BORDER_COLOR,
            borderStyle: BORDER_STYLE,
          });
    });

    test('should render with content', () => {
        setupTest(MOCK_TOOLTIP_STYLE, true, 'top', TOOLTIP_CONTENT);

        const floatingTooltip = screen.getByRole("tooltip");
        expect(floatingTooltip.textContent).toBeDefined();
        expect(floatingTooltip.textContent).toEqual(TOOLTIP_CONTENT);
    });

});
