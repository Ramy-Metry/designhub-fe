import React from 'react';

import '../SASS/CharacterCount.scss';

function CharacterCount({ string, limit }) {
    return (
        <div>
            <p className="charLength">{string.length}/{limit}</p>
        </div>
    )
}

export default CharacterCount;
