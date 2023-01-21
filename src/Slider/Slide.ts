import { Lightning } from "@lightningjs/sdk";

export interface ItemSpec {
  label: string;
  src: string;
}

export type SliderSpec = ItemSpec[];

const defShader = {
  type: Lightning.shaders.RoundedRectangle,
  radius: [50],
  stroke: 10,
  strokeColor: 0x00222222,
};

export class Slide extends Lightning.Component {
  static _template() {
    return {
      w: 331,
      h: 361,
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
    this.patch({
      // @ts-ignore
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
        // @ts-ignore
        scale: 1.0,
      },
    });
  }
}
