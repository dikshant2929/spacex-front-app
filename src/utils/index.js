function randomNumberGenerator(min = 0, max = 1000) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isUrlChanged(pLoc, nLoc) {
    return Boolean(typeof pLoc !== 'undefined' && typeof nLoc !== 'undefined' && (pLoc.pathname !== nLoc.pathname || pLoc.search !== nLoc.search));
}

function capitalize (s){
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export {
    randomNumberGenerator,
    isUrlChanged,
    capitalize
}