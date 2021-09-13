import React, { useState } from 'react';
import logo from "../../assets/.5.png";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LayersRoundedIcon from '@material-ui/icons/LayersRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

function Nav() {

    const [state, setState] = useState("open");

    if (state === "open") {
        return (
            <div className="nav">
                <img src={logo} alt="nav-icon" />
                <input className="open_input" type="text" placeholder="Search Possibilities" />

                <div className="navlinks">
                    <div className="block search-block" onClick={() => setState("compact")}>
                        <SearchRoundedIcon />
                    </div>
                    <Link to="/home">
                        <div className={`block ${window.location.pathname === "/home" && "active"}`}>
                            <HomeRoundedIcon color="gray" />
                        </div>
                    </Link>
                    <Link to="/projects">
                        <div className={`block ${window.location.pathname === "/projects" && "active"}`}>
                            <LayersRoundedIcon />
                        </div>
                    </Link>
                    <Link to="/requests">
                        <div className={`block ${window.location.pathname === "/requests" && "active"}`}>
                            <MailOutlineRoundedIcon />
                        </div>
                    </Link>
                    <Link to="/configure">
                        <div className={`block ${window.location.pathname === "/configure" && "active"}`}>
                            <SettingsRoundedIcon />
                        </div>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="nav-other">
                <input type="text" placeholder="Search Possibiltiees" />
                <div className="hvr-btn" onClick={() => setState("open")}>
                    <CloseRoundedIcon />
                </div>
            </div>
        )
    }
}

export default Nav;
