import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";

export const Planets = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => { actions.getPlanets() }, [])

    const favoriteClick = (planet, id) => {
        id = id + 1
        planet.id = id
        planet.type = 'planet'
        if (store.favorites.includes(planet)) {
            actions.deleteFavorite(planet)
        } else {
            actions.addFavorite(planet)
        }
    }

    return (
        <div className="container-fluid">
            <h1 className="text-center text-white fw-bolder my-3">Planets</h1>
            <div className="card-group">
                <div className="row">
                    {store.planets.length === 0 ? <Spinner /> :
                        store.planets.map((planet, id) => (
                            <div className="card" key={id} style={{ width: '15rem', flex: 'none', margin: '10px' }}>
                                <img src={'https://starwars-visualguide.com/assets/img/planets/' + (id + 1) + '.jpg'}
                                    onError={(event) => {
                                        event.target.src = "https://i.ibb.co/k5hkKbM/image-not-available.jpg"
                                    }}
                                    className="card-img my-2 rounded" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{planet.name}</h5>
                                    <p className="card-text">A diverse planet in the Star Wars galaxy, rich in history and vital to the fate of the universe.</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={"/planet/" + (id + 1)} className="btn btn-primary">Read More</Link>
                                        <a onClick={() => favoriteClick(planet, id)}><h3><i className="fas fa-heart text-danger"></i></h3></a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}