import React from 'react';
import Demo03 from './demos/Demo03';
import ThemeContext,{themes} from './contexts';

function App() {
  return (
    <ThemeContext.Provider value={themes.light}>
      <Demo03 />
    </ThemeContext.Provider>
  )
}

export default App;
