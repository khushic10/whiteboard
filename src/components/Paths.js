import React from "react";
import { Route, Routes } from "react-router-dom";
import Whiteboard from "./Whiteboard";
export default function Paths() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Whiteboard />} />
			</Routes>
		</div>
	);
}
