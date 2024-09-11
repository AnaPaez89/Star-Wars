import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import join from "../../img/join.jpg";
import luke from "../../img/luke-skywalker.png";
import rebel from "../../img/rebel2.png";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const selectedContact = store.contacts.find(contact => contact.id === parseInt(id));
            if (selectedContact) {
                setContact({
                    name: selectedContact.name,
                    email: selectedContact.email,
                    phone: selectedContact.phone,
                    address: selectedContact.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            actions.updateContact(parseInt(id), contact)
                .then(() => {
                    navigate("/contacts");
                })
                .catch(error => {
                    console.error("Error updating contact:", error);
                });
        } else {
            actions.createContact(contact)
                .then(() => {
                    navigate("/contacts");
                })
                .catch(error => {
                    console.error("Error creating contact:", error);
                });
        }
    };
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-8">
                    <h1 className="text-center text-white fw-bold mt-5">{id ? "Edit Contact" : "Add New Contact"}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-white fst-italic fw-bold">Name</label>
                            <input type="text" className="form-control" placeholder="Add your name" name="name" value={contact.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="text-white fst-italic fw-bold">Email</label>
                            <input type="email" className="form-control" placeholder="Add your name" name="email" value={contact.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="text-white fst-italic fw-bold">Phone</label>
                            <input type="phone" className="form-control" placeholder="Add your phone" name="phone" value={contact.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="text-white fst-italic fw-bold">Adress</label>
                            <input type="text" className="form-control" placeholder="Add your adress" name="address" value={contact.address} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 my-4 form-control">{id ? "Update" : "Add"}</button>

                    </form>
                </div>
                <div className="col-4">
                <img className="img-fluid" src={luke} />
                </div>
            </div>
            <Link className="m-1 w-50 text-center" to="/contacts">
                <button type="button" className="btn btn-dark">Go Back to Contacts</button>
            </Link>
        </div>
    );
};