import './App.css';
import { useRef, useState } from 'react';
import UseFloatingUi from './use-floating-ui';

function App() {
  const elementRef = useRef(null);
  const [showFloatingTooltip, setShowFloatingTooltip] = useState(false);

  const floatingTooltipStyle = {
    background: '#f8f8f8',
    color: '#aaa',
    textAlign: 'center',
    boxShadow: '0 0 5px 0 #e8e8e8',
    borderWidth: '2',
    borderStyle: 'solid',
    borderColor: '#e8e8e8',
    offSet: '10',
    padding: '10',
    zIndex: 'auto'
  }

  return (
    <div className="App">
        <button 
          ref={elementRef}
          onMouseEnter={() => setShowFloatingTooltip(true)}
          onMouseLeave={() => setShowFloatingTooltip(false)}>
            Button
        </button>

        <UseFloatingUi 
          shouldShowTooltip={showFloatingTooltip}
          floatingElementRef={elementRef} 
          floatingTooltipStyle={floatingTooltipStyle}
          floatingTooltipPosition="top"
        >
          <span>My tooltip with more content</span>
        </UseFloatingUi>

    </div>
  );
}

export default App;
