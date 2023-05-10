import greeting from "./greeting";

/* const greeting = (name) => {
  return `Greeting ${name}!`;
}; */

test("outputs a greeting with a whatever name is passed in", () => {
  expect(greeting("Achilles")).toBe("Greetings Achilles!");
});
