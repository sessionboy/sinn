import assert from "power-assert";
import { createCSSTransformBuilder, properties } from "../src/";

describe("exports", () => {
  it("Should be exports modules", () => {
    assert.doesNotThrow(() => {
      createCSSTransformBuilder();
    }, "createCSSTransformBuilder");

    assert(Array.isArray(properties) === true);
  });
});
