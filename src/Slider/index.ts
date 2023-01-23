import { Lightning } from "@lightningjs/sdk";
import { Hero, heroGSpec } from "./Slide/Hero";
import { Row } from "./Row";
import { SliderSpec } from "./Slide";
import { Square, squareGSpec } from "./Slide/Square";
import { Rectangle, rectangleGSpec } from "./Slide/Rectangle";

interface FTrack {
  [index: number]: number;
}

export class Slider extends Lightning.Application {
  rowIndex: number = 0;
  colIndex: number = 0;
  focusTrack: FTrack = [];
  _construct() {
    console.log("_CONS");
  }

  static _template() {
    return {
      Slider: {
        w: 800,
        h: 350,
        x: 380,
        y: 150,
        mount: 0.5,
        Rows: {
          x: 0,
          y: 0,
          w: 800,
        },
      },
    };
  }

  _init() {
    console.log("INIT", this.rowIndex, this.colIndex);
  }

  repositionRow() {
    this.trackFocus();
    if (this.currentRow) {
      const isHero = this.rowIndex === 0;
      const x = isHero ? this.currentSlide.x : this.currentSlide.x - 100;
      const y = isHero ? 0 : this.currentRow.y - 250;
      this.currentRow.setSmooth("x", -x);
      this.container.setSmooth("y", -y);
    }

    // const wrapper = this.tag("Wrapper");
    // const sliderW = this.tag("Slider").w;
    // const currentWrapperX = wrapper.transition("x").targetvalue || wrapper.x;
    // const currentFocus = wrapper.children[this.colIndex];
    // const currentFocusX = currentFocus.x + currentWrapperX;
    // const currentFocusOuterWidth = currentFocus.x + currentFocus.w;

    // if (currentFocusX < 0) {
    //   wrapper.setSmooth("x", -currentFocus.x);
    // } else if (currentFocusOuterWidth > sliderW) {
    //   wrapper.setSmooth("x", sliderW - currentFocusOuterWidth);
    // }
  }

  _handleUp() {
    this.rowIndex = this.rowIndex || 0;
    this.rowIndex -= 1;
    if (this.rowIndex <= 0) {
      this.rowIndex = 0;
    }
    this.colIndex = this.focusTrack[this.rowIndex] || 0;
    this.repositionRow();
  }

  _handleDown() {
    this.rowIndex = this.rowIndex || 0;
    this.rowIndex += 1;
    if (this.rowIndex >= this.rows.length) {
      this.rowIndex = this.rows.length - 1;
    }
    this.colIndex = this.focusTrack[this.rowIndex] || 0;
    this.repositionRow();
  }

  _handleLeft() {
    this.colIndex -= 1;
    if (this.colIndex <= 0) {
      this.colIndex = 0;
    }
    this.repositionRow();
  }

  _handleRight() {
    this.colIndex = this.colIndex || 0;
    this.colIndex += 1;
    const slidesLen = this.currentRow.children.length;
    if (this.colIndex >= slidesLen) {
      this.colIndex = slidesLen - 1;
    }
    this.repositionRow();
  }

  addRow(rowData: SliderSpec[]) {
    const rTops = [0];
    let rows = rowData.map((slider, si) => {
      const heroW = heroGSpec.w + heroGSpec.m;
      const heroH = heroGSpec.h;

      const slideGSpec = si % 2 ? rectangleGSpec : squareGSpec;

      const Slide = si % 2 ? Rectangle : Square;

      const slideW = slideGSpec.w + slideGSpec.m;
      const slideH = slideGSpec.h + slideGSpec.m;

      const slideWidth = si === 0 ? heroW : slideW;
      const rowHeight = si === 0 ? heroH - 250 : slideH;
      const leftPadding = si === 0 ? 0 : 100;
      const slides = slider.map((slide, i) => ({
        type: si === 0 ? Hero : Slide,
        x: i * slideWidth + leftPadding,
        item: { label: slide.label, src: slide.src },
      }));
      const rY = rTops[rTops.length - 1];
      rTops.push(rY + rowHeight);
      const row = {
        type: Row,
        y: rY,
        children: slides,
      };
      return row;
    });
    this.tag(`Rows`).children = rows;

    this._refocus();
    console.log("Patched");
  }

  trackFocus() {
    this.focusTrack[this.rowIndex] = this.colIndex;
  }

  get container() {
    const rows = this.tag("Rows");
    return rows;
  }

  get rows() {
    const rows = this.tag("Rows");
    return rows && rows.children;
  }

  get currentRow() {
    return this.rows && this.rows[this.rowIndex];
  }

  get currentSlide() {
    return (
      this.rows &&
      this.rows[this.rowIndex] &&
      this.rows[this.rowIndex].children &&
      this.rows[this.rowIndex].children[this.colIndex]
    );
  }

  _getFocused() {
    return this.currentSlide;
  }
}

export const sliderFn = (ref: React.RefObject<HTMLCanvasElement>) => {
  const options = {
    debug: false,
    stage: { canvas: ref.current, clearColor: 0xff000000 },
  };
  const app = new Slider(options);
  return app;
  // document.body.appendChild(app.stage.getCanvas());
};
