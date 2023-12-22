"use client";

import React, { useRef, useEffect } from "react";

const Canvas = (
	props: React.JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLCanvasElement> &
		React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
	const boxes = [
		{ x: 450, y: 250, w: 120, h: 90, color: "Black" },
		{ x: 450, y: 750, w: 120, h: 90, color: "green" },
		{ x: 1200, y: 450, w: 120, h: 90, color: "pink" },
		{ x: 250, y: 550, w: 120, h: 90, color: "orange" },
	];
	const canvasRef = useRef(null);
	let ctx: {
		clearRect: (
			arg0: number,
			arg1: number,
			arg2: number,
			arg3: number
		) => void;
		beginPath: () => void;
		arc: (
			arg0: any,
			arg1: any,
			arg2: number,
			arg3: number,
			arg4: number
		) => void;
		fillStyle: string;
		fill: () => void;
		moveTo: (arg0: number, arg1: number) => void;
		lineTo: (arg0: number, arg1: number) => void;
		rect: (arg0: number, arg1: number, arg2: number, arg3: number) => void;
		stroke: () => void;
		font: string;
		fillText: (arg0: string, arg1: number, arg2: number) => void;
	} | null = null;

	let currentSelectedBoxX: number | null | undefined = null;
	let currentSelectedBoxY: number | null | undefined = null;

	useEffect(() => {
		const canvas: any = canvasRef.current;
		if (canvas !== undefined && canvas !== null) {
			ctx = canvas.getContext("2d");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			drawCanvas();
		}
	}, []);

	const drawCanvas = () => {
		if (ctx === null) {
			return;
		}
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		boxes.forEach((box) => drawBox(box));
	};

	const drawBox = (box: { x: any; y: any; w: any; h: any; color: any }) => {
		if (ctx === null) {
			return;
		}
		ctx.beginPath();
		ctx.beginPath();
		ctx.arc(box.x, box.y, 20, 0, 2 * Math.PI);
		ctx.fillStyle = "orange";
		ctx.fill();
	};

	const getSelectedBox = (x: number, y: number) => {
		for (let i = boxes.length - 1; i >= 0; i--) {
			const box = boxes[i];
			if (
				x >= box.x - 20 &&
				x <= box.x + 20 &&
				y >= box.y - 20 &&
				y <= box.y + 20
			) {
				return box;
			}
		}
		return null;
	};
	const getTooltip = (x: number, y: number, boxX: number, boxY: number) => {
		if (x >= boxX - 45 && x <= boxX + 90) {
			if (y >= boxY - 100 && y <= boxY - 80) {
				window.alert("Test 1");
				return false;
			} else if (y >= boxY - 75 && y <= boxY - 55) {
				window.alert("Test 2");
				return false;
			} else if (y >= boxY - 50 && y <= boxY - 35) {
				window.alert("Test 3");
				return false;
			} else if (y >= boxY - 150 && y <= boxY - 10) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	};

	const deleteTootltip = () => {
		drawCanvas();
	};
	const createTooltip = (box: {
		x: number;
		y: number;
		w: number;
		h: number;
		color: string;
	}) => {
		if (ctx === null) {
			return;
		}
		drawCanvas();
		ctx.beginPath();
		ctx.moveTo(box.x - 50, box.y - 110);
		ctx.lineTo(box.x + 50, box.y - 110);
		ctx.lineTo(box.x + 50, box.y - 10);
		ctx.lineTo(box.x + 10, box.y - 10);
		ctx.lineTo(box.x, box.y);
		ctx.lineTo(box.x - 10, box.y - 10);
		ctx.lineTo(box.x - 50, box.y - 10);
		ctx.lineTo(box.x - 50, box.y - 110);
		ctx.fillStyle = "#936de6";
		ctx.fill();

		ctx.beginPath();
		ctx.rect(box.x - 45, box.y - 100, 90, 20);
		ctx.stroke();
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.font = "24px serif";
		ctx.fillStyle = "black";
		ctx.fillText("Test 1", box.x - 40, box.y - 83);

		ctx.beginPath();
		ctx.rect(box.x - 45, box.y - 75, 90, 20);
		ctx.stroke();
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.font = "24px serif";
		ctx.fillStyle = "black";
		ctx.fillText("Test 2", box.x - 40, box.y - 58);

		ctx.beginPath();
		ctx.rect(box.x - 45, box.y - 50, 90, 20);
		ctx.stroke();
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.font = "24px serif";
		ctx.fillStyle = "black";
		ctx.fillText("Test 3", box.x - 40, box.y - 33);
	};

	const handleMouseDown = (e: { clientX: any; clientY: any }) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		const selectedBox = getSelectedBox(mouseX, mouseY);
		if (
			selectedBox === null &&
			currentSelectedBoxX !== null &&
			currentSelectedBoxY !== null &&
			currentSelectedBoxX !== undefined &&
			currentSelectedBoxY !== undefined
		) {
			const checktooltip = getTooltip(
				mouseX,
				mouseY,
				currentSelectedBoxX,
				currentSelectedBoxY
			);
			if (checktooltip === true) {
				currentSelectedBoxX = null;
				currentSelectedBoxY = null;
				deleteTootltip();
			}
		} else if (
			currentSelectedBoxX !== null &&
			currentSelectedBoxY !== null &&
			selectedBox?.x === currentSelectedBoxX &&
			selectedBox?.y === currentSelectedBoxY
		) {
			console.log("same");
		} else if (selectedBox !== null) {
			currentSelectedBoxX = selectedBox ? selectedBox.x : null;
			currentSelectedBoxY = selectedBox ? selectedBox.y : null;
			createTooltip(selectedBox);
		}
	};

	return (
		<canvas
			ref={canvasRef}
			{...props}
			onMouseDown={handleMouseDown}
		></canvas>
	);
};

export default Canvas;
