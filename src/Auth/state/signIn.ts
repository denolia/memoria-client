import { User } from "../types";

function dummyLogin(): Promise<User> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          username: "my@email.com",
          firstName: "Julia",
          lastName: "Bubnova",
        } as User),
      2000
    )
  );
}
