import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const SinglePlanet = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    useEffect(() => { actions.getPlanetProfile(params.id) }, [])
    return (
        <>
            <div className="container">
                <h1 className="text-center text-white fw-bolder my-3">{store.planet.name}</h1>
                <div className="row">
                    <div className="col-6 my-3">
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${params.id}.jpg`}
                            onError={(event) => {
                                event.target.src = "https://i.ibb.co/k5hkKbM/image-not-available.jpg"
                            }}
                            className="img-fluid rounded" />
                    </div>
                    <div className="col-4 my-3">
                        <h2 className="text-center text-white fw-bolder">Characteristics</h2>
                        <ul className="list-group">
                            <li className="list-group-item">Rotation Period: {store.planet.rotation_period}</li>
                            <li className="list-group-item">Orbital Period: {store.planet.orbital_period}</li>
                            <li className="list-group-item">Diameter: {store.planet.diameter}</li>
                            <li className="list-group-item">Climate: {store.planet.climate}</li>
                            <li className="list-group-item">Gravity: {store.planet.gravity}</li>
                            <li className="list-group-item">Terrain: {store.planet.terrain}</li>
                            <li className="list-group-item">Surface Water: {store.planet.surface_water}</li>
                            <li className="list-group-item">Population: {store.planet.population}</li>
                        </ul>
                    </div>
                    <div className="col-2 my-3">
                    </div>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <Link className="text-center" to="/planets">
                        <button type="button" className="btn btn-dark">Go Back to Planets</button>
                    </Link>
                </div>


            </div>
        </>
    );
};

SinglePlanet.propTypes = {
    match: PropTypes.object
};