import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Characters } from  "./component/Characters.jsx";
import { Contacts } from "./component/Contacts.jsx";
import { Planets } from "./component/Planets.jsx";
import { Starships } from "./component/Starships.jsx";
import { Alert } from "./component/Alert.jsx";
// Custom pages / views
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { SingleCharacter } from "./pages/SingleCharacter.jsx";
import { SinglePlanet } from "./pages/SinglePlanet.jsx";
import { SingleStarship } from "./pages/SingleStarship.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";


//create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // You can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Characters />} path="/characters" />
                        <Route path="/characters/:theid" element={<SingleCharacter />} />
                        <Route element={<Contacts />} path="/contacts" />
                        <Route path="/add" element={<AddContact />} />
						<Route path="/edit/:id" element={<AddContact />} />
                        <Route element={<Planets />} path="/planets" />
                        <Route path="/planet/:id" element={<SinglePlanet />} />
                        <Route element={<Starships />} path="/starships" />
						<Route path="/starships/:starshipsid" element={<SingleStarship />} />
                        <Route element={<Login />} path="/login" /> 
                        <Route element={<Register />} path="/register" /> 
                        <Route element={<Dashboard />} path="/dashboard" /> 
                        <Route element={<Error404 />} path="*" />                    
                    </Routes>
                    <Alert/>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
