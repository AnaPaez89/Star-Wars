import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";

export const Characters = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getCharacters()
    }, [])

    const favoriteClick = (character, id) => {
        id = id + 1
        character.type = 'character'
        character.id = id
        if (store.favorites.includes(character)) {
            actions.deleteFavorite(character)
        } else {
            actions.addFavorite(character)
        }
    }
    return (
        <div className="container-fluid">
            <h1 className="text-center text-white fw-bolder my-3">Characters</h1>
            <div className="card-group">
                <div className="row">
                    {store.characters.length === 0 ? <Spinner /> :
                        store.characters.map((character, id) => (
                            <div className="card" key={id} style={{ width: '15rem', flex: 'none', margin: '10px' }}>
                                <img src={"https://starwars-visualguide.com/assets/img/characters/" + (id + 1) + ".jpg"} className="card-img my-2 rounded" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{character.name}</h5>
                                    <p className="card-text">Iconic figure from Star Wars, known for shaping the galaxy's fate through bravery or dark ambition.</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={"/characters/" + (id + 1)} className="btn btn-primary">Read More</Link>
                                        <a onClick={() => favoriteClick(character, id)}><h3><i className="fas fa-heart text-danger"></i></h3></a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}