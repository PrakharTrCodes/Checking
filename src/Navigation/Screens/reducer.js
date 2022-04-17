const initialState = {
    listData: [],
    page: 1,
    total: 0
}

const UsersListReducer = (state = initialState, action) => {
    const { type, payload } = action;
    const {page} = getState().UsersListReducer;
    switch (type) {
        case "SET_DATA":
            return { ...state, ...payload };
        case "INCREASE_PAGE":
            return { ...state, ...{ page: page + 1 } };
        default:
            return { ...state };
    }
}

export default UsersListReducer;