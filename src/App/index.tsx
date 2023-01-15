import { useEffect, useRef, useState } from "react";
import { slides } from "../data/slides";
import { sliderFn } from "../Slider";
import { SlideSpec } from "../Slider/Slide";
import styles from "./app.module.scss";

const slidesData: SlideSpec[] = slides.map((s) => ({
  label: s.title,
  src: s["imageUrl_16:9"],
}));
function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [items, setItems] = useState<SlideSpec[]>(slidesData);

  useEffect(() => {
    sliderFn(canvasRef, items);
  }, [items]);

  return (
    <div className={styles.app}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
