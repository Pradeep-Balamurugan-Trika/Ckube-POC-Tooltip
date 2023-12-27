"use client";

import React, { useRef, useEffect } from "react";

const Canvas = (
	props: React.JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLCanvasElement> &
		React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
	const boxes = [
		{ x: 450, y: 250, w: 120, h: 90, color: "Black", type: "point" },
		{ x: 450, y: 750, w: 120, h: 90, color: "green", type: "point" },
		{ x: 1200, y: 450, w: 120, h: 90, color: "pink", type: "point" },
		{ x: 250, y: 550, w: 120, h: 90, color: "orange", type: "point" },
		{ x: 650, y: 550, w: 90, h: 90, color: "red", type: "box" },
		{ x: 350, y: 450, w: 90, h: 90, color: "violet", type: "box" },
		{ x: 1200, y: 750, w: 90, h: 90, color: "blue", type: "box" },
		{ x: 950, y: 250, w: 90, h: 90, color: "grey", type: "box" },
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
			arg0: number,
			arg1: number,
			arg2: number,
			arg3: number,
			arg4: number
		) => void;
		fillStyle: string;
		fill: () => void;
		fillRect: (arg0: any, arg1: any, arg2: any, arg3: any) => void;
		moveTo: (arg0: number, arg1: number) => void;
		lineTo: (arg0: number, arg1: number) => void;
		rect: (arg0: number, arg1: number, arg2: number, arg3: number) => void;
		stroke: () => void;
		font: string;
		fillText: (arg0: string, arg1: number, arg2: number) => void;
		strokeStyle: string;
	} | null = null;

	let currentSelectedBoxX: number | null | undefined = null;
	let currentSelectedBoxY: number | null | undefined = null;
	let currentSelectedType: String = "";
	let currentSelectedBoxW: number | null | undefined = null;

	useEffect(() => {
		const canvas: any = canvasRef.current;
		if (canvas !== undefined && canvas !== null) {
			ctx = canvas.getContext("2d");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			// boxes.map((box, i) => {
			// 	boxes[i].x = Math.random() * window.innerWidth;
			// 	boxes[i].y = Math.random() * window.innerHeight;
			// 	return null;
			// });
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

	const drawBox = (box: {
		x: any;
		y: any;
		w: any;
		h: any;
		color: any;
		type: string;
	}) => {
		if (ctx === null) {
			return;
		}
		if (box.type === "point") {
			ctx.beginPath();
			ctx.arc(box.x, box.y, 20, 0, 2 * Math.PI);
			ctx.fillStyle = box.color;
			ctx.fill();
		} else if (box.type === "box") {
			ctx.beginPath();
			ctx.beginPath();
			ctx.fillStyle = box.color;
			ctx.fillRect(box.x, box.y, box.w, box.h);
		}
	};

	const getSelectedBox = (x: number, y: number) => {
		for (let i = boxes.length - 1; i >= 0; i--) {
			const box = boxes[i];
			const distance = Math.sqrt(
				Math.pow(x - box.x, 2) + Math.pow(y - box.y, 2)
			);
			if (box.type == "point" && distance <= 20) {
				return box;
			} else if (
				box.type == "box" &&
				x >= box.x &&
				x <= box.x + box.w &&
				y >= box.y &&
				y <= box.y + box.h
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

	const getEdit = (
		x: number,
		y: number,
		boxX: number,
		boxY: number,
		boxW: number
	) => {
		var info = Math.sqrt(
			Math.pow(x - (boxX + boxW / 2 - 40), 2) +
				Math.pow(y - (boxY - 30), 2)
		);
		var edit = Math.sqrt(
			Math.pow(x - (boxX + boxW / 2), 2) + Math.pow(y - (boxY - 30), 2)
		);
		var cancel = Math.sqrt(
			Math.pow(x - (boxX + boxW / 2 + 40), 2) +
				Math.pow(y - (boxY - 30), 2)
		);

		if (info <= 15) {
			window.alert("info");
			return false;
		} else if (edit <= 16) {
			window.alert("edit");
			return false;
		} else if (cancel <= 15) {
			window.alert("cancel");
			return false;
		}

		return true;
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

	const createBoxEdit = (box: {
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
		ctx.fillStyle = "#936de6";
		ctx.strokeStyle = "#936de6";

		ctx.beginPath();
		ctx.arc(box.x + box.w / 2 - 40, box.y - 30, 15, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.font = "20px serif";
		ctx.fillText("i", box.x + box.w / 2 - 43, box.y - 25);

		ctx.beginPath();
		ctx.arc(box.x + box.w / 2, box.y - 30, 16, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.font = "13px ";
		ctx.fillStyle = "#dde1e2";
		ctx.fillText("\u{270E}", box.x + box.w / 2 - 8, box.y - 23);
		ctx.fillStyle = "#936de6";

		ctx.beginPath();
		ctx.arc(box.x + box.w / 2 + 40, box.y - 30, 15, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.font = "20px serif";
		ctx.fillText("x", box.x + box.w / 2 + 35, box.y - 25);
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
			if (currentSelectedType === "point") {
				const checktooltip = getTooltip(
					mouseX,
					mouseY,
					currentSelectedBoxX,
					currentSelectedBoxY
				);
				if (checktooltip === true) {
					currentSelectedBoxX = null;
					currentSelectedBoxY = null;
					currentSelectedType = "";
					deleteTootltip();
				}
			} else if (
				currentSelectedType === "box" &&
				currentSelectedBoxW !== null &&
				currentSelectedBoxW !== undefined
			) {
				const checkEdit = getEdit(
					mouseX,
					mouseY,
					currentSelectedBoxX,
					currentSelectedBoxY,
					currentSelectedBoxW
				);
				if (checkEdit === true) {
					currentSelectedBoxX = null;
					currentSelectedBoxY = null;
					currentSelectedType = "";
					deleteTootltip();
				}
			}
		} else if (
			currentSelectedBoxX !== null &&
			currentSelectedBoxY !== null &&
			selectedBox?.x === currentSelectedBoxX &&
			selectedBox?.y === currentSelectedBoxY
		) {
			console.log("same");
		} else if (selectedBox !== null) {
			if (selectedBox?.type === "point") {
				currentSelectedBoxX = selectedBox ? selectedBox.x : null;
				currentSelectedBoxY = selectedBox ? selectedBox.y : null;
				currentSelectedType = "point";
				createTooltip(selectedBox);
			} else if (selectedBox?.type === "box") {
				currentSelectedBoxX = selectedBox ? selectedBox.x : null;
				currentSelectedBoxY = selectedBox ? selectedBox.y : null;
				currentSelectedBoxW = selectedBox ? selectedBox.w : null;
				currentSelectedType = "box";
				createBoxEdit(selectedBox);
			}
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
