import showMessage from "./msc";

/* test(`Should first log Hello Jest!! and then Delightful JavaScript Testing`, async () => {
  showMessage();
}); */

// Truthiness
test("null", () => {
  const a = null;
  expect(a).toBe(null);
  expect(a).toBeDefined();
  expect(a).not.toBeUndefined();
  expect(a).not.toBeTruthy();
  expect(a).toBeFalsy();
});
