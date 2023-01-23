import { Lightning } from "@lightningjs/sdk";

export class Row extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      strokeColor: 0xffffff,
      color: 0xffff2222,
    };
  }
}
