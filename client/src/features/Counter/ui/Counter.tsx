import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { useMemo, type JSX } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import {
  addEagle,
  decrement,
  increment,
  incrementByAmount,
} from "../redux/counterSlice";

export default function Counter(): JSX.Element {
  //   const value = useAppSelector((state) => state.counter.value);
  //   const eagles = useAppSelector((state) => state.counter.eagles);
  const { value, eagles } = useAppSelector((state) => state.counter);
  console.log(eagles);
  const dispatch = useAppDispatch();

  const randomNum = (): number => {
    return Math.random() * 1_000_000;
  };

  const memoNum = useMemo(() => randomNum(), []);

  const num1 = randomNum();

  return (
    <div>
      <h1>Value: {value}</h1>
      <div>
        {" "}
        Орлы:
        {/* {eagles.map((el: string) => (
          <p>{el}</p>
        ))} */}
      </div>
      <ButtonGroup>
        <Button onClick={() => dispatch(addEagle("Don"))}>add Eagle</Button>
        <Button onClick={() => dispatch(increment())}>+1</Button>
        <Button onClick={() => dispatch(decrement())}>-1</Button>
        <Button onClick={() => dispatch(incrementByAmount(10))}>click</Button>
      </ButtonGroup>
      <h2>num1: {num1}</h2>
      <h2>memoNum: {memoNum}</h2>
    </div>
  );
}
