import React from "react";
import { NavLink } from "react-router-dom";
import Styles from "./Header.module.css";
import { defaultMaxListeners } from "events";

const Header = ()=>{
    const navItem=[
        {path: "/", text:"main"}
    ]
    return(
        <header className={Styles.header}>
            <nav>
                {navItem.map((item)=>{
                    <NavLink key={item.path} to = {item.path}>
                        {item.text}
                    </NavLink>
                })}
            </nav>
        </header>
    )
}
export default Header 