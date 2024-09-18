import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const SingleCharacter = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    useEffect(() => { actions.getCharacterProfile(params.theid) }, [])
    return (
        <>
            <div className="container">
                <h1 className="text-center text-white fw-bolder my-3">{store.character.name}</h1>
                <div className="row">
                    <div className="col-6 my-3">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${params.theid}.jpg`} className="img-fluid rounded" />
                    </div>
                    <div className="col-4 my-3">
                        <h2 className="text-center text-white fw-bolder">Characteristics</h2>
                        <ul className="list-group">
                            <li className="list-group-item">Height: {store.character.height}</li>
                            <li className="list-group-item">Mass: {store.character.mass}</li>
                            <li className="list-group-item">Hair Color: {store.character.hair_color}</li>
                            <li className="list-group-item">Skin Color: {store.character.skin_color}</li>
                            <li className="list-group-item">Eye Color: {store.character.eye_color}</li>
                            <li className="list-group-item">Birth Year: {store.character.birth_year}</li>
                            <li className="list-group-item">Gender: {store.character.gender}</li>
                        </ul>
                    </div>
                    <div className="col-2 my-3">
                    </div>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <Link className="text-center" to="/characters">
                        <button type="button" className="btn btn-dark">Go Back to Characters</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

SingleCharacter.propTypes = {
    match: PropTypes.object
};