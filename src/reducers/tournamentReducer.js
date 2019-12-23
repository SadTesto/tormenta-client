const initialState = {
    id: null,
    title: null,
    teams: [],
    groups: [],
    matches: [],
    pendings: {}
};

export default function (state = initialState, { payload, type }) {
    switch (type) {
        default:
            return state;
    }
};