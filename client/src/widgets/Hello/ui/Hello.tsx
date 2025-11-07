import React, { type JSX } from "react";

function Hello({ fullName }: { fullName: string }): JSX.Element {
  return <h1>{fullName && `Привет, ${fullName}`}</h1>;
}

export default React.memo(Hello);
