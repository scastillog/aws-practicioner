import { errorResponse } from "./errorResponse";

describe("errorResponse", () => {
  it("should get a errorResponse", () => {
    expect(successResponse("mock").statusCode).toBe(500);
  });
});
