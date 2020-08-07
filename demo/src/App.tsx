import React from 'react';
// import WheelPicker from 'react-wheel-picker';
import WheelPicker from './Picker';
import './App.css';



const items = [
  {
    value: 1,
    display: '1'
  },
  {
    value: 2,
    display: '2'
  },
  {
    value: 3,
    display: '3'
  },
  {
    value: 4,
    display: '4'
  },
  {
    value: 5,
    display: '5'
  },
  {
    value: 6,
    display: '6'
  },
  {
    value: 7,
    display: '7'
  }
]

function App() {
  return (
    <div className="App">
      <WheelPicker items={items} selectedIndex={4} />
    </div>
  );
}

export default App;
