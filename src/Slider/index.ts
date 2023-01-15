import { Lightning, Utils } from "@lightningjs/sdk";
import { slides } from "../data/slides";
import { Slide, SlideSpec } from "./Slide";

export class Slider extends Lightning.Application {
  private index!: number;
  private itemsCount!: number;
  private items!: SlideSpec[];
  constructor(
    options: Partial<Lightning.Application.Options>,
    items: SlideSpec[]
  ) {
    // _construct() {
    super(options);
    // this.itemsCount = 6;
    console.log("Cons", this.itemsCount, this.index);
    this.index = 0;
    this.items = items;
    this.itemsCount = slides.length;
    // this._init = this._init.bind(this);
  }
  static _template() {
    return {
      Slider: {
        w: 800,
        h: 350,
        x: 480,
        y: 270,
        mount: 0.5,
        Wrapper: {},
      },
    };
  }

  _init() {
    const buttons = slides.map((slide, i) => ({
      type: Slide,
      x: i * (331 + 30),
      item: { label: slide.title, src: slide.imageUrl },
    }));
    this.tag("Wrapper").children = buttons;
    console.log("INIT", this.index, this.itemsCount);
  }

  repositionWrapper() {
    console.log("RW", this.index, this.itemsCount);
    const wrapper = this.tag("Wrapper");
    const sliderW = this.tag("Slider").w;
    const currentWrapperX = wrapper.transition("x").targetvalue || wrapper.x;
    const currentFocus = wrapper.children[this.index];
    const currentFocusX = currentFocus.x + currentWrapperX;
    const currentFocusOuterWidth = currentFocus.x + currentFocus.w;

    if (currentFocusX < 0) {
      wrapper.setSmooth("x", -currentFocus.x);
    } else if (currentFocusOuterWidth > sliderW) {
      wrapper.setSmooth("x", sliderW - currentFocusOuterWidth);
    }
  }

  _handleLeft() {
    this.index -= 1;
    if (this.index <= 0) {
      this.index = 0;
    }
    this.repositionWrapper();
  }

  _handleRight() {
    console.log(this.index, this.itemsCount);
    this.index += 1;
    if (this.index >= this.itemsCount) {
      this.index = this.itemsCount - 1;
    }
    this.repositionWrapper();
  }

  _getFocused() {
    return this.tag("Slider.Wrapper").children[this.index];
  }
}

export const sliderFn = (
  ref: React.RefObject<HTMLCanvasElement>,
  items: SlideSpec[]
) => {
  console.log("Slider", ref.current);
  const options = {
    debug: false,
    stage: { canvas: ref.current, clearColor: 0xff000000 },
  };
  const app = new Slider(options, items);
  // document.body.appendChild(app.stage.getCanvas());
};
