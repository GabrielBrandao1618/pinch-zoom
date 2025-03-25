import { useCallback, useRef } from "react";
import "./App.css";

import { Handler, usePinch } from "@use-gesture/react";

function App() {
  const imgRef = useRef<null | HTMLImageElement>(null);

  const onImageZoom: Handler<"pinch"> = useCallback(
    ({ offset, origin, event }) => {
      if (!imgRef.current) return;

      const rect = imgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const [scale] = offset;
      const [originX, originY] = origin;
      const translateFactor = 0.5;
      const [mappedX, mappedY] = [originX - rect.x, originY - rect.y].map(
        Math.round,
      ).map((n) => n * translateFactor);

      imgRef.current.style.transform = `scale(${scale})`;
      imgRef.current.style.transformOrigin = `${mappedX}px ${mappedY}px`;
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  usePinch(
    onImageZoom,
    {
      target: imgRef,
      scaleBounds: {
        max: 2,
        min: 1,
      },
      rubberband: 0.3,
      eventOptions: {
        passive: true,
      },
    },
  );

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>
        Use gesture example
      </h2>

      <div
        style={{
          width: 200,
          height: 200,
          overflow: "hidden",
        }}
      >
        <img
          ref={imgRef}
          src="https://picsum.photos/200"
        />
      </div>
    </main>
  );
}

export default App;
