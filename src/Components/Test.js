import React, { useState } from 'react';

export default function Test() {
    const [ar, setAr] = useState(['sagar']);
    return (
        <>
            <div>Test</div>
            {ar.map((a, i) => {
                return <div>{a}</div>
            })}
        </>
    )
}
