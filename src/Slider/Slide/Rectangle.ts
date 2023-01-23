import { Lightning } from "@lightningjs/sdk";
import { ItemSpec } from ".";

const defShader = {
  type: Lightning.shaders.RoundedRectangle,
  radius: [50],
  stroke: 10,
  strokeColor: 0x00222222,
};

export const rectangleGSpec = {
  w: 431,
  h: 261,
  m: 30,
};

export class Rectangle extends Lightning.Component {
  static _template() {
    return {
      w: rectangleGSpec.w,
      h: rectangleGSpec.h,
      rect: true,

      color: 0xff222222,
      shader: { ...defShader },
      Image: {
        w: (w: number) => w,
        h: (h: number) => h,
      },
    };
  }

  set item(obj: ItemSpec) {
    const { src } = obj;
    this.patch({
      Image: { src },
    });
  }

  _focus() {
    this.patch({
      shader: {
        ...defShader,
        strokeColor: 0xff05cedd,
      },
      smooth: {
        scale: 1.1,
      },
    });
  }

  _unfocus() {
    this.patch({
      shader: { ...defShader },
      smooth: {
        scale: 1.0,
      },
    });
  }
}
