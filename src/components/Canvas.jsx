import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

function Canvas() {
  const fileInputRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    for (let i = 0; i < 3; i++) {
      let leftPos = 100 + i * 300;

      let frame = new fabric.Rect({
        left: leftPos,
        top: 100,
        fill: 'white',
        width: 200,
        height: 100,
        stroke: 'black',
        strokeWidth: 3,
      });

      canvas.add(frame);
      frame.on('mousedown', (event) => {
        event.stopPropagation();
      });

      let text = new fabric.IText('Tap and Type', {
        left: leftPos,
        top: 100,
      });

      canvas.add(text);
      text.on('mousedown', (event) => {
        event.stopPropagation();
      });
      canvas.bringToFront(text);
    }

    return () => {
      canvas.getObjects().forEach((object) => {
        object.off('mousedown');
      });
    };
  }, []);

  const handleImageUpload = (event) => {
    let reader = new FileReader();

    reader.onload = function (event) {
      fabric.Image.fromURL(event.target.result, function (img) {
        img.set({
          left: 100,
          top: 100,
          selectable: false,
        });
        canvasRef.current.add(img);
        canvasRef.current.renderAll();
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
