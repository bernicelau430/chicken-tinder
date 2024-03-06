import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FullWidthText } from "../components/Input/Text";
import TextButtonInput from "../components/Input/TextButtonInput";
import LoadingPage from "./LoadingPage";

export default function NameFormPage() {
	const navigate = useNavigate();
	const params = useParams();

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		// TODO: use context instead of localStorage
		if (localStorage.getItem("chickName")) {
			navigate(`/flock/${params.coopName}/lobby/`);
		}

		// get the flock info
		fetch(`${process.env.REACT_APP_API_URL}/flocks/${params.coopName}`)
			.then((response) => response.json())
			.then((data) => {
				// if the flock exists, show user form
				setLoading(false);
			})
			.catch((error) => {
				// if the flock doesn't exist, go back to the tutorial page
				navigate("/");
			});
	}, [navigate, params.coopName]);

	async function addChick(name) {
		const result = await fetch(
			process.env.REACT_APP_API_URL + `/flocks/${params.coopName}/chicks`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: name }),
			}
		);

		if (result.status === 400) {
			console.error("Chick already exists");
			return false;
		} else {
			return true;
		}
	}

	async function onClick(chickName) {
		const result = await addChick(chickName);
		if (result) {
			localStorage.setItem("chickName", chickName);
			navigate(`/flock/${params.coopName}/lobby/`);
		}
	}

	return (
		<>
			{loading ? (
				<LoadingPage />
			) : (
				<div className="flex flex-col space-y-normal justify-center w-5/6">
					<FullWidthText>What's your name?</FullWidthText>
					<TextButtonInput
						placeholder="Chickie McDee"
						buttonText="let's go -->"
						onClick={onClick}
					/>
				</div>
			)}
		</>
	);
}
