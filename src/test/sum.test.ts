import sum from "./sum";

describe("sum", () => {
  // sum[1,2,3,4,5] => 15
  // sum[] => 0
  // sum[3] => 3
  test("should return sum of positive numbers", () => {
    // define in out
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const output = 36;
    // invoke sum
    const result = sum(input);
    // assert
    expect(result).toBe(output);
  });

  test("should return zero for an empty array", () => {
    // define in out
    const input = <any>[];
    const output = 0;
    // invoke sum
    const result = sum(input);
    // assert
    expect(result).toBe(output);
  });

  test("should return the number itself for a single number", () => {
    // define in out
    const input = [5465];
    const output = 5465;
    // invoke sum
    const result = sum(input);
    // assert
    expect(result).toBe(output);
  });
});
