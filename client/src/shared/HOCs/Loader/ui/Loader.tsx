import { type JSX } from "react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

type Props = { children: JSX.Element; isLoading: boolean };

export default function Loader({ children, isLoading }: Props): JSX.Element {
  return isLoading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ring size={50} speed={1.5} bgOpacity={0.25} color="#25b22cff" />
    </div>
  ) : (
    children
  );
}
