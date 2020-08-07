# React Wheel Picker Component
Mobile Wheel 형태의 Picker 컴포넌트

# 시작하기

## 사용법
```
import React from 'react';
import WheelPicker from 'react-wheel-picker';

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
      <WheelPicker items={items} selectedIndex={0} />
    </div>
  );
}

export default App;
```

# 사용자 가이드

## Props
|    Prop Name  | Description | Default Value | Example Values |
|:--------------|:------------|:-------------:|:---------------|
| selectedIndex | 초기 선택되어진 아이템의 인덱스 | 0 | 0 |
| items         | Picker에 표기되어질 아이템 리스트 | N\A | [ { value: 1, display: '1' }, { value: 2, display: '2' } ] |

# Lisence
MIT Lisence
