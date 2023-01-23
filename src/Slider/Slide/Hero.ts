import { Lightning } from "@lightningjs/sdk";
import { ItemSpec } from ".";

const defShader = {
  type: Lightning.shaders.FadeOut,
  // bottom: 80,
};

export const heroGSpec = {
  w: 1940,
  h: 1110,
  m: 0,
};

export class Hero extends Lightning.Component {
  static _template() {
    return {
      w: heroGSpec.w,
      h: heroGSpec.h,
      rect: true,

      color: 0xff222222,
      shader: { ...defShader },
      Image: {
        w: (w: number) => w,
        h: (h: number) => h,
      },
      //   Label: {
      //     x: 10,
      //     y: 302,
      //     color: 0xff000000,
      //     text: { fontSize: 32 },
      //   },
    };
  }

  set item(obj: ItemSpec) {
    const { src } = obj;
    this.patch({
      Image: { src },
      //   Label: { text: label.toString() },
    });
  }

  _focus() {
    // this.patch({});
  }

  _unfocus() {
    // this.patch({});
  }
}
