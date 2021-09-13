import React from 'react';
import { useTitleEffect, secureRun } from '../../functions/main';
import Nav from '../page/Nav';

function Home() {

    useTitleEffect("(12) Moonbase");

    secureRun();

    return (
        <div>
            <Nav />
        </div>
    )
}

export default Home;
