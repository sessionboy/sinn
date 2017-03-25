import assert from "power-assert";
import properties from "../src/properties";

describe("properties", () => {
  it("Should be exports supported properties", () => {
    assert.deepStrictEqual(properties, [
      "translateX",
      "translateY",
      "translateZ",
      "translate",
      "translate3d",
      "scale",
      "scale3d",
      "scaleX",
      "scaleY",
      "scaleZ",
      "rotate",
      "rotate3d",
      "rotateX",
      "rotateY",
      "rotateZ",
      "skewX",
      "skewY",
      "perspective",
      "matrix",
      "matrix3d"
    ]);
  });
});
