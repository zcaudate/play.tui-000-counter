import React,{useState} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed'

function Button({ action, color, disabled, left, text, top }) {
  return (
    <button
      left={left || 0}
      top={top || 0}
      content={text}
      shrink={true}
      mouse={true}
      onPress={function () {
        if (action && !disabled) {
          action();
        }
      }}
      padding={{ top: 1, right: 2, bottom: 1, left: 2 }}
      style={{
        bg: !disabled ? color : "black",
        fg: !disabled ? "white" : "gray",
        focus: { bold: true },
      }}
    ></button>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <box>
      <box
        padding={{ top: 2, right: 5, bottom: 2, left: 5 }}
        width={14}
        height={7}
        border="line"
      >
        {count}
      </box>
      <Button
        top={2}
        left={16}
        action={function () {
          setCount(0);
        }}
        color="gray"
        text="RESET"
      ></Button>
      <box top={8}>
        <Button
          text="DEC"
          action={function () {
            setCount((count + 10 - 1) % 10);
          }}
          color="red"
        ></Button>
        <Button
          left={7}
          text="INC"
          action={function () {
            setCount((count + 1) % 10);
          }}
          color="green"
        ></Button>
      </box>
    </box>
  );
}

function App() {
  return (
    <box
      label="Tui Counter Basic"
      border="line"
      style={{ border: { fg: "green" } }}
    >
      <box left={5}>
        <box top={3}>
          <text top={-1} left={1}>
            COUNTER
          </text>
          <Counter></Counter>
        </box>
      </box>
    </box>
  );
}

function Screen() {
  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: "Tui Counter Basic",
  });
  screen.key(["q", "C-c", "Esc"], function () {
    this.destroy();
  });
  return screen;
}

function main() {
  return render(<App></App>, Screen());
}

main()