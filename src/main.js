import React from 'react'

import blessed from 'blessed'

import reactBlessed from 'react-blessed'

// play.tui-000-counter.main/Button [17] 
function Button({action,color,disabled,left,text,top}){
  return (
    <button
      left={left || 0}
      top={top || 0}
      content={text}
      shrink={true}
      mouse={true}
      onPress={function (){
        if(action && !disabled){
          action();
        }
      }}
      padding={{"top":1,"right":2,"bottom":1,"left":2}}
      style={{
        "bg":!disabled ? [color,"black"] : null,
        "fg":!disabled ? ["white","gray"] : null,
        "focus":{"bold":true}
      }}>
    </button>);
}

// play.tui-000-counter.main/Counter [37] 
function Counter(){
  let [count,setCount] = React.useState(0);
  return (
    <box>
      <box
        padding={{"top":2,"right":5,"bottom":2,"left":5}}
        width={14}
        height={7}
        border="line">{count}
      </box>
      <Button
        top={2}
        left={16}
        action={function (){
          setCount(0);
        }}
        color="gray"
        text="RESET">
      </Button>
      <box top={8}>
        <Button
          text="DEC"
          action={function (){
            setCount(((count + 10) - 1) % 10);
          }}
          color="red">
        </Button>
        <Button
          left={7}
          text="INC"
          action={function (){
            setCount((count + 1) % 10);
          }}
          color="green">
        </Button>
      </box>
    </box>);
}

// play.tui-000-counter.main/App [63] 
function App(){
  return (
    <box
      label="Tui 000 - Counter"
      border="line"
      style={{"border":{"fg":"green"}}}>
      <box left={5}>
        <box top={3}><text top={-1} left={1}>COUNTER</text><Counter></Counter></box>
      </box>
    </box>);
}

// play.tui-000-counter.main/Screen [74] 
function Screen(){
  const screen = blessed.screen({
    "autoPadding":true,
    "smartCSR":true,
    "title":"Tui 000 - Counter"
  });
  screen.key(["q","C-c","Esc"],function (){
    this.destroy();
  });
  return screen;
}

// play.tui-000-counter.main/__init__ [85] 
// 5257e349-fdb7-4f6c-a07f-954a43928a9f
reactBlessed.render((
  <App></App>),Screen());