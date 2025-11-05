import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { useLayoutEffect, type JSX } from "react";

export function MainPage(): JSX.Element {
  const fullName = useAppSelector((state) => state.user.user?.fullName);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    document.title = "Главная страница";
  }, []);

  return (
    <>
      <div>Имя:{fullName}</div>
    </>
  );
}
