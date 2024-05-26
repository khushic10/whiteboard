import "./all.css";
import { useEffect, useRef, useState } from "react";
import { BsPencilFill, BsEraserFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";

const DrawingCanvas = () => {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = 1150;
		canvas.height = 520;

		const context = canvas.getContext("2d");
		context.lineCap = "round";
		context.strokeStyle = "black";
		context.lineWidth = 3;
		contextRef.current = context;
	}, []);

	const reset = () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		setIsDrawing(true);
		nativeEvent.preventDefault();
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) return;

		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.lineTo(offsetX, offsetY);
		contextRef.current.stroke();
		nativeEvent.preventDefault();
	};

	const stopDrawing = () => {
		contextRef.current.closePath();
		setIsDrawing(false);
	};

	const setToDraw = () => {
		contextRef.current.globalCompositeOperation = "source-over";
	};

	const setToErase = () => {
		contextRef.current.globalCompositeOperation = "destination-out";
	};

	return (
		<div>
			<h3>WhiteBoard</h3>
			<canvas
				className="canvas-container"
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseLeave={stopDrawing}
			></canvas>
			<div className="tools">
				<div className="icon">
					<button onClick={setToDraw}>
						<BsPencilFill />
					</button>
					Draw
				</div>
				<div className="icon">
					<button onClick={setToErase}>
						<BsEraserFill />
					</button>
					Erase
				</div>
				<div className="icon">
					<button onClick={reset}>
						<BiReset />
					</button>
					Reset
				</div>
			</div>
		</div>
	);
};

export default DrawingCanvas;
