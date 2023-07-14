/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "../Barn_Testing";
import { useState } from "react";

/**
 * @description The objective of this function is to render a 3D model of a barn and allow the user to select and highlight specific walls of the barn by changing their color. The function also includes a dropdown menu for the user to select which wall to highlight.
 * Flow of the function:
 * 1. The function initializes two state variables using the useState hook: selectedWall and rotationWall.
 * 2. The useEffect hook is used to update the rotationWall state variable based on the selectedWall state variable.
 * 3. The function returns a Canvas component from the @react-three/fiber library, which renders the 3D model of the barn.
 * 4. The Model component is passed as a child of the Suspense component, which is used to handle loading of the 3D model.
 * 5. The Model component is passed several props, including the selectedWall state variable and the setSelectedWall function, which is used to update the selectedWall state variable.
 * 6. The function also returns a dropdown menu for the user to select which wall to highlight.
 * @function App
 * @export
 * @return {*}
 */
export default function App() {
	const [selectedWall, setSelectedWall] = useState("");
	const [rotationWall, setRotationWall] = useState([-0.01, 9.5, 0]);


	useEffect(() => {
		switch (selectedWall) {
			case "wall1":
				setRotationWall([-0.01, 9.5, 0]);
				break;
			case "wall2":
				setRotationWall([-0.01, 11, 0.02]);
				break;
			case "wall3":
				setRotationWall([-0.01, 6.5, 0]);
				break;
			case "wall4":
				setRotationWall([-0.1, -11, -0.02]);
				break;
		}
	}, [selectedWall]);

	return (
		<>
			<Canvas
				camera={{ position: [2, 0, 12.25], fov: 15 }}
				style={{
					backgroundColor: "#f0f0f0",
					width: "100vw",
					height: "100vh",
				}}
			>
				<ambientLight intensity={1.25} />
				<ambientLight intensity={0.1} />
				<directionalLight intensity={0.4} />
				<Suspense fallback={null}>
					<Model
						position={[0.025, -0.9, 1]}
						rotation={rotationWall}
						scale={[0.5, 0.5, 0.5]}
						selectedWall={selectedWall}
						setSelectedWall={setSelectedWall}
					/>
				</Suspense>
				<OrbitControls />
			</Canvas>

			<div className="absolute top-0 left-0 z-10 w-1/4 h-10 m-2 bg-white rounded-lg shadow-md px-2">
				<select
					value={selectedWall}
					onChange={(event) => setSelectedWall(event.target.value)}
					className="w-full h-full  text-gray-500 font-semibold outline-none focus:outline-none cursor-pointer"
				>
					<option value="">Seleccionar una pared</option>
					<option value="wall1">Pared # 1</option>
					<option value="wall2">Pared # 2</option>
					<option value="wall3">Pared # 3</option>
					<option value="wall4">Pared # 4</option>
				</select>
			</div>
		</>
	);
}
