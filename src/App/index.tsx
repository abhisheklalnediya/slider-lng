import { useEffect, useRef, useState } from "react";
import { getCards } from "../data/api";
// import { slides as slidesSq } from "../data/slides_square";
// import { slides as slidesLn } from "../data/slides_landscape";
import { Slider, sliderFn } from "../Slider";
import { SliderSpec } from "../Slider/Slide";

import styles from "./app.module.scss";

// const slidesSqData: SliderSpec = slidesSq.map((s) => ({
//   label: s.title,
//   src: s["imageUrl"],
// }));
// const slidesLnData: SliderSpec = slidesLn.map((s: any) => ({
//   label: s.title,
//   src: s["imageUrl"],
// }));

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<Slider | null>(null);

  const [items, setItems] = useState<SliderSpec[]>([]);

  useEffect(() => {
    getCards().then((data: any) => {
      console.log({ data });
      const newItems = data.map((d: any) => {
        return d.assets.map((s: any) => ({
          label: s.title,
          src: s["imageUrl"],
        }));
      });
      console.log({ newItems });
      setItems(newItems);
    });
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (items.length) {
      slider?.addRow(items);
    }
  }, [items]);

  useEffect(() => {
    sliderRef.current = sliderFn(canvasRef);
  }, []);

  return (
    <div className={styles.app}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
