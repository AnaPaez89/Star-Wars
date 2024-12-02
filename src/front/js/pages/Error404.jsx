import React from "react";
import { Link } from "react-router-dom";
import error404 from "../../img/error-404-1.png";
import babyYoda from "../../img/baby-yoda.png";


export const Error404 = () => {

  return (
    <div className="text-center mt-5 " id="background">
      <p>
        <img className="img-fluid" src={error404} />
      </p>
      <h1 className="text-white fw-bold">Page Not Found</h1>
      <p className="text-white fw-bold fst-italic">Lost in hyperspace? This page is missing, but the Force will guide you back to the galaxy.</p>
      <div className="d-flex justify-content-center my-3">
        <Link className="text-center" to="/">
          <button type="button" className="btn btn-dark">Go Back to Base</button>
        </Link>
      </div>
      <img className="img-fluid" src={babyYoda} />
    </div>
  )
}