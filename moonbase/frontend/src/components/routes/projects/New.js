import React from 'react';
import { useTitleEffect } from '../../../functions/main';
import Button from '../../page/Button';
import Nav from '../../page/Nav';

function New() {

    useTitleEffect("Create New Project")

    return (
        <div>
            <Nav />
            <div className="form-new-holder">
                <form onSubmit={(e) => e.preventDefault()} className="new-project-form">
                    <input type="text" placeholder="Project Title" />
                    <textarea type="text" placeholder="Project Description" />
                    <div style={{ display: "flex", alignItems: "start" }}>
                        <input id="agreement" style={{ marginRight: "3px", marginLeft: "13px" }} type="checkbox" />
                        <label htmlFor="agreement" style={{ marginTop: "3px", fontSize: "13px" }}>I approve of Moonbase reading my project data for work and functioning purposes</label>
                    </div>
                    <Button text="Create Project" className="custom-new-form" />
                </form>
            </div>
        </div>
    )
}

export default New;
