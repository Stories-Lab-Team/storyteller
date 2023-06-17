import { useEffect, useState } from 'react';
import { fabric } from 'fabric';

function Canvas() {
    
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let canvas = new fabric.Canvas('canvas', {
      width: canvasSize.width,
      height: canvasSize.height,
    });

    let frame = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'white',
      width: 900,
      height: 400,
      stroke: 'black',
      strokeWidth: 3,
    });

    canvas.add(frame);
    
    let text = new fabric.IText('Tap and Type', {
        left: 100,
        top: 100
      });
    canvas.add(text);

    fabric.Image.fromURL('path/to/image.jpg', function(img) {
      // add image onto canvas
      canvas.add(img);
    });

    fabric.Image.fromURL('path/to/image.jpg', function(img) {
      // add image onto canvas
      canvas.add(img);
    });

    let json = canvas.toJSON();
    canvas.loadFromJSON(json);

    let dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 0.8
    });

    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
                  
  }, []);

  return (
    <canvas id="canvas" width={canvasSize.width} height={canvasSize.height} />
  );
}

export default Canvas;
