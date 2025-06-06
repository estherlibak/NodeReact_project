import React, {useState, useEffect } from "react";
// import LoginDemo from "../logIn/LogIn";

import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
// import { logOut } from ".../redux/tokenSlice";
import { logOut } from "../../redux/tokenSlice";
// import AllApartments from "../apartments/AllApartments";


export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemRenderer = (item) => (

        <a className="flex align-items-center p-menuitem-link">
            
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command : () => navigate("/Home")
        },
        {
            label: 'MyApartments',
            icon: 'pi pi-star',
            command:() => navigate("/myApartments")

        },
        {
            label: 'MyFavorites',
            icon: 'pi-pi-heart',
            command:() => navigate("/MyFavorite")

        },

    ];


    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Button onClick={() => {
                dispatch(logOut());
                navigate("/");
            }}>signOut</Button>
        </div>
    );

    return (
        <div className="card">

            <Menubar model={items} end={end} />
        </div>
    )
}