import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { localImport, secureRun, useTitleEffect } from '../../../functions/main';
import Nav from '../../page/Nav'
import nop from "../../../assets/nop.png";
import { Link } from 'react-router-dom';

function Projects() {

    secureRun();
    const user = localImport();
    const [projects, setProjects] = useState([]);

    useTitleEffect("Your Projects")

    useEffect(() => {
        axios.get(`http://localhost:5500/get/projects/${user.uid}`)
            .then((res) => {
                console.log(res);
                setProjects(res.data);
            });
    }, []);

    return (
        <div className="projects">
            <Nav />
            <Link to={`/u/${user.uid}/projects/new`} className="new-project-btn" style={{ fontSize: "14px", textAlign: "center", textDecoration: "none" }}>New Project</Link>
            <div className="projects-grid">
                {
                    projects.length === 0 ? (
                        <div className="no-projects">
                            <img src={nop} />
                            <h2>You've got no projects! Make one by clicking on New Project Button on the top right corner of the page</h2>
                        </div>
                    ) : (
                        projects.map((prop) => (
                            <div className="project-card">
                                <img src={prop.banner} alt="project-banner" />
                                <h2>{prop.title}</h2>
                                <p>{prop.description}</p>
                                <Link to={`/projects/${prop.id}`} className="view-project-btn" style={{ fontSize: "14px", textAlign: "center", textDecoration: "none" }}>View Project</Link>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Projects;
