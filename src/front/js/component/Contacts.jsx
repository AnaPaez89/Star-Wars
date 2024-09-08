import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "../component/ContactForm.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import Modal from "../component/Modal.jsx";



export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const openModal = (contact) => {
        setContactToDelete(contact);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setContactToDelete(null);
    };




    const deleteContact = () => {
        if (contactToDelete) {
            actions.deleteContact(contactToDelete.id)
                .then(() => {
                    closeModal();
                })
                .catch(error => {
                    console.error("Error deleting contact:", error);
                });
        }
    };
    useEffect(() => {
        actions.getContacts()
            .catch(error => {
                console.error("Error getting contacts:", error);
            });
    }, [actions]);


    return (
        <div className="container my-5">
            <div className="ml-auto">
                <h1 className="text-center text-white fw-bold">Be part of the Light Side, follow the Jedi path</h1>
                <h5 className="text-center text-white fw-bold fst-italic">The path of the Jedi requires compassion, but also discipline</h5>
                <div className="d-flex flex-row-reverse">
                    <Link to="/add">
                        <button className="btn btn-primary text-right my-3">Be a Jedi now!</button>
                    </Link>
                 </div>
            </div>
            <div>
                <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                    <ul className="list-group pull-down" id="contact-list">
                        {store.contacts.map((item, index) => (
                            <ContactForm
                                key={index}
                                name={item.name}
                                address={item.address}
                                phone={item.phone}
                                email={item.email}
                                onDeleteClick={() => openModal(item)}
                                id={item.id}
                            />
                        ))}
                    </ul>

                </div>
            </div>
            <Modal show={showModal} onClose={closeModal} onDelete={deleteContact} />
        </div>
    );
};