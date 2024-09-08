import React, { useContext } from "react";
import { Context } from "../store/appContext";
import stHomeImageUrl from "../../img/starwars-home.jpg";
import babyYoda from "../../img/baby-yoda.png";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 " id="background">
			<h1 className="text-white fw-bold">Welcome to a Galaxy Far, Far Away</h1>
			<p className="text-white fw-bold fst-italic">Discover Characters, Planets, and Starships from the Star Wars Universe</p>
			<p>
				<img src={stHomeImageUrl} />
			</p>
			<h2 className="text-white fw-bold">May the Force Be With You</h2>
			<img src={babyYoda} />
		</div>
	);
};
