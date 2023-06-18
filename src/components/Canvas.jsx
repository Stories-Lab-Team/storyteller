import { useEffect } from 'react';
import { fabric } from 'fabric';

function Canvas() {
  useEffect(() => {
    let canvas = new fabric.Canvas('canvas', {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    for(let i=0; i<3; i++) { // Loop 3 times to create 3 frames and texts
      let leftPos = 100 + (i * 300); // Position each frame 300px apart

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
    
      let text = new fabric.IText('Tap and Type', {
          left: leftPos,
          top: 100
      });
      
      canvas.add(text);
      canvas.bringToFront(text); // This brings the text object to the front
    }

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
  }, []);

  return <canvas id="canvas" />;
}

export default Canvas;
