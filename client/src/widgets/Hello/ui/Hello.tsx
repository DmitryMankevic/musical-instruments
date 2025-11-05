import React, { type JSX } from "react";

function Hello({ userName }: { userName: string }): JSX.Element {
  return <h1>{userName && `Привет, ${userName}`}</h1>;
}

export default React.memo(Hello);
