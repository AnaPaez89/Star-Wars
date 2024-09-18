import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";


export const SingleStarship = () => {
    const [starships, setStarships] = useState();
    const starshipParam = useParams();
    const starshipsid = starshipParam.starshipsid;
    const url = "https://www.swapi.tech/api/starships/" + starshipsid
    const imagenUrl = "https://starwars-visualguide.com/assets/img/starships/" + starshipsid + ".jpg"

    const fetchStarshipsData = async () => {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setStarships(data);
        }
        else { "Error" }
    }


    useEffect(() => {
        fetchStarshipsData();
    }, []);


    return (
        <div className="container">

            {!starships ?
                <Spinner />
                :
                <div className="row">
                    <h1 className="text-center text-white fw-bolder my-3">{starships.result.properties.name}</h1>
                    <div className="col-4 my-3 d-flex flex-wrap align-items-center">
                        <img src={imagenUrl}
                            onError={(event) => {
                                event.target.src = "https://i.ibb.co/VD3L6fB/image-not-available-2.jpg"
                            }}
                            className="img-fluid rounded" />
                    </div>
                    <div className="col-8 my-3">
                        <h2 className="text-center text-white fw-bolder d-none">Characteristics</h2>
                        <ul className="list-group">
                            <li className="list-group-item">Model: {starships.result.properties.model}</li>
                            <li className="list-group-item">Manufacturer: {starships.result.properties.manufacturer}</li>
                            <li className="list-group-item">Cost in Credits: {starships.result.properties.cost_in_credits}</li>
                            <li className="list-group-item">Lenght: {starships.result.properties.lenght}</li>
                            <li className="list-group-item">Max Atmosphering Speed: {starships.result.properties.max_atmosphering_speed}</li>
                            <li className="list-group-item">Crew: {starships.result.properties.crew}</li>
                            <li className="list-group-item">Passengers: {starships.result.properties.passengers}</li>
                            <li className="list-group-item">Cargo Capacity: {starships.result.properties.cargo_capacity}</li>
                            <li className="list-group-item">Consumables: {starships.result.properties.consumables}</li>
                            <li className="list-group-item">Hyperdrive Rating: {starships.result.properties.hyperdrive_rating}</li>
                            <li className="list-group-item">MGLT: {starships.result.properties.MGLT}</li>
                            <li className="list-group-item">Starship Class: {starships.result.properties.starship_class}</li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <Link className="text-center" to="/starships">
                            <button type="button" className="btn btn-dark">Go Back to Starships</button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
};
