import { type JSX } from "react";
import Image from "react-bootstrap/Image";

const style: React.CSSProperties = {
  height: "40px",
  width: "40px",
  marginRight: "15px",
};

export default function UserCard(): JSX.Element {
  return (
    <div>
      <Image
        src={import.meta.env.VITE_IMG + "/eagle-user.jpg"}
        roundedCircle
        style={style}
      />
    </div>
  );
}
