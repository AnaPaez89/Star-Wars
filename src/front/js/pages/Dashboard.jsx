import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const Dashboard = () => {
  const { actions } = useContext(Context);

  const handleOnClick = () => {
    actions.accessProtected()
  }

  return (
    <div className="container">
      <h1 className="text-center text-white fw-bolder my-3">Dashboard</h1>
      <button className="btn btn-warning mx-2" onClick={handleOnClick}>
          Acceso a Protected
      </button>

      <button className="btn btn-success my-3" onClick={() => actions.getPost(1)}>
          Get Posts
      </button>
      
    </div>
  )
}
