import { Lightning } from "@lightningjs/sdk";

export interface ItemSpec {
  label: string;
  src: string;
}

export class Row extends Lightning.Component {
  static _template() {
    return {
      w: 100,
      h: 361,
      rect: true,
      strokeColor: 0xffffff,
      color: 0xffff2222,
      // Label: {
      //   x: 10,
      //   y: 302,
      //   color: 0xffffffff,
      //   text: {
      //     fontSize: 32,
      //     text: "Title",
      //   },
      // },
    };
  }
}
