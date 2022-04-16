import React, { FunctionComponent } from 'react';
import Counter from '../../components/Counter';

const CounterRoute: FunctionComponent = () => {
    return (
        <>
            <h1>Counter</h1>
            <Counter startNumber={10} />
        </>
    );
};

export default CounterRoute;