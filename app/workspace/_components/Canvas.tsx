// import { Excalidraw } from "@excalidraw/excalidraw";
// import { ReactSketchCanvas } from 'react-sketch-canvas';

// const styles = {
//   border: '0.0625rem solid #9c9c9c',
//   borderRadius: '0.25rem',
// };
// function Canvas() {
//   return (
//     <div style={{ height: "500px", width: "100%" }}>
//       <ReactSketchCanvas
//           style={styles}
//           width="600"
//           height="800"
//           strokeWidth={4}
//           strokeColor="red"
//           className="h-[500px]"
//         />
//     </div>
//   )

// }

// export default Canvas
// import React, { useEffect } from "react";
// import Draw2dCanvas from "draw2d";

// const Canvas = () => {
//   useEffect(() => {
//     const canvas = new Draw2dCanvas();
//     canvas.setBackgroundColor("#fff");
//     canvas.addShape(new Draw2dShape("rectangle"));
//   }, []);

//   return <div id="canvas"></div>;
// };

// export default Canvas;

// import { ReactSketchCanvas } from 'react-sketch-canvas';
// import { useRef } from 'react';

// const styles = {
//   border: '0.0625rem solid #9c9c9c',
//   borderRadius: '0.25rem',
// };

// function Canvas() {
//   const canvasRef = useRef(null); // Create a reference for the canvas

//   const saveCanvas = async () => {
//     if (canvasRef.current) {
//       // Export the image as PNG (you can also use "jpg" or "jpeg")
//       //@ts-ignore
//       const imageData = await canvasRef.current.exportImage("png");

//       // Create a link element to trigger the download
//       const link = document.createElement("a");
//       link.href = imageData;
//       link.download = "canvas-image.png"; // Name of the image file
//       link.click(); // Trigger the download
//     }
//   };

//   return (
//     <div style={{ height: "500px", width: "100%" }}>
//       <ReactSketchCanvas
//         ref={canvasRef} // Pass ref to the canvas
//         style={styles}
//         width="600"
//         height="800"
//         strokeWidth={4}
//         strokeColor="red"
//         className="h-[500px]"
//       />
//       <button onClick={saveCanvas} style={{ marginTop: "10px", padding: "10px 20px" }}>
//         Save Canvas
//       </button>
//     </div>
//   );
// }

// export default Canvas;


import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};

function Canvas() {
  const canvasRef = useRef(null); // Reference for the canvas
  const [color, setColor] = useState('red'); // State for pencil color
  const [strokeWidth, setStrokeWidth] = useState(4); // State for stroke width

  const saveCanvas = async () => {
    if (canvasRef.current) {
      //@ts-ignore
      const imageData = await canvasRef.current.exportImage("png");
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "canvas-image.png";
      link.click();
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value); // Update the pencil color
  };

  const handleStrokeWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(Number(event.target.value)); // Update stroke width
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <ReactSketchCanvas
        ref={canvasRef}
        style={styles}
        width="600"
        height="800"
        strokeWidth={strokeWidth}
        strokeColor={color}
        className="h-[500px]"
      />
      
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="color-picker" style={{ marginRight: '10px' }}><Button>Choose Color: </Button></label>
        <input
          id="color-picker"
          type="color"
          value={color}
          onChange={handleColorChange}
        />
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="stroke-width" style={{ marginRight: '10px' }}><Button>Stroke Width:</Button> </label>
        <input
          id="stroke-width"
          type="number"
          value={strokeWidth}
          min="1"
          max="10"
          onChange={handleStrokeWidthChange}
        />
      </div>

      
        <Button onClick={saveCanvas} style={{ marginTop: '10px', padding: '10px 20px' }} className='bg-blue-600 hover:bg-blue-700'>Save Canvas</Button>

    </div>
  );
}

export default Canvas;


