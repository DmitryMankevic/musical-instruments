import { upperUserName } from "@/entities/user/redux/userSlice";
import Counter from "@/features/Counter/ui/Counter";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { useLayoutEffect, type JSX } from "react";
import { Button } from "react-bootstrap";

export function MainPage(): JSX.Element {
  const name = useAppSelector((state) => state.user.user?.name);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    document.title = "Главная страница";
  }, []);

  return (
    <>
      <div>Имя:{name}</div>
      <Button onClick={() => dispatch(upperUserName())}>Upper Name</Button>
      <div>
        <Counter />
      </div>
    </>
  );
}
