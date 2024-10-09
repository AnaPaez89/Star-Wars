import React from "react";

export const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para manejar el envío del formulario.
        console.log("User registered");
    };

    return (
        <form className="w-50 mx-auto mt-5 my-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstname" className="form-label text-white fw-bold">First Name</label>
                <input type="text" className="form-control" id="firstname" placeholder="Enter your first name" required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="lastname" className="form-label text-white fw-bold">Last Name</label>
                <input type="text" className="form-control" id="lastname" placeholder="Enter your last name" required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label text-white fw-bold">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label text-white fw-bold">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" required
                />
            </div>

            <button type="submit" className="btn btn-primary w-100">Sign in</button>
        </form>
    );
};
