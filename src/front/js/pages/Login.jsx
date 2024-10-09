import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();
  
    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const dataToSend = { email, password }
      console.log(dataToSend);
      actions.login(dataToSend);
      navigate('/dashboard')
    }
    return (
        <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label text-white fw-bold">Email</label>
                <input type="email" className="form-control" id="email" required aria-label="Email" value={email} onChange={handleEmail} aria-describedby="basic-addon1"/>
            </div>
            <label htmlFor="password" className="form-label text-white fw-bold">Password</label>
            <div className="input-group mb-3">
                <input type={hidePassword ? "password" : 'text'} className="form-control" id="password" required value={password} onChange={handlePassword} />
                <span onClick={() => setHidePassword(!hidePassword)} className="input-group-text">
                {hidePassword ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}
                </span>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
    );
};
