import { Lightning } from "@lightningjs/sdk";

export interface ItemSpec {
  label: string;
  src: string;
}

export class Row extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      strokeColor: 0xffffff,
      color: 0xffff2222,

      // Label: {
      //   x: 10,
      //   y: 12,
      //   color: 0xffffffff,
      //   text: {
      //     x: 10,
      //     y: 12,
      //     fontSize: 50,
      //     text: "Title asda da das asd asd as dasd asd as das dasd asd",
      //   },
      // },
    };
  }
}
