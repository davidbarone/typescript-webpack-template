import React, { FunctionComponent } from 'react';
import Counter from "../../components/Counter";

const Welcome: FunctionComponent = () => {
    return (
        <>
            <h1>Welcome</h1>
            <p>Welome to the Web UI Reference Application. The example below is a simple Function Component.</p>

            <Counter startNumber={10} />
        </>
    )
}

export default Welcome;