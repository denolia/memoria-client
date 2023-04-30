import React from "react";

import type { Foo } from "./Foo"; // testing consistent type imports

export function App() {
  const foo: Foo = "asdf";
  console.log(foo); // needed to test eslint warnings

  return <div>Hello</div>;
}
