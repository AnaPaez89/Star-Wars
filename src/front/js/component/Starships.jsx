import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";

export const Starships = () => {
    const [starships, setStarships] = useState(JSON.parse(localStorage.getItem("starshipsLocal")));
    const handleOnErrorImg = (e) => { e.target.src = "https://i.ibb.co/VD3L6fB/image-not-available-2.jpg" };
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <h1 className="text-center text-white fw-bolder my-3">Starships</h1>
            <div className="card-group">
                <div className="row">
                    {!starships ?
                        <Spinner />
                        :
                        starships.results.map((item) =>
                            <div className="card" style={{ width: '15rem', flex: 'none', margin: '10px' }}>
                                <img alt="" src={"https://starwars-visualguide.com/assets/img/starships/" + (item.uid) + ".jpg"} onError={handleOnErrorImg} className="card-img my-2 rounded" />
                                <div className="card-body">
                                    <h5 className="card-title"> {item.name} </h5>
                                    <p className="card-text">An iconic starship from the Star Wars galaxy, pivotal in epic space battles and daring missions.</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={"/starships/" + item.uid} className="btn btn-primary">
                                            Read More
                                        </Link>
                                        <a onClick={() => actions.addFavorite(item)}><h3><i className="fas fa-heart text-danger"></i></h3></a>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}


