import axios from "axios";


const getUsersList = () => {
    return (dispatch, getState) => {
        const { page, listData } = getState().UsersListReducer;//get state  = useSelector
        axios.get(`https://reqres.in/api/users?page=${page}`)
            .then((resp) => {
                console.log("api resp", resp);
                if (resp.status === 200) {
                    let newData = [...resp.data.data];
                    if (page > 1) {
                        newData = [...newData, ...listData];
                    }
                    dispatch({ type: "SET_DATA", payload: { listData: [...newData], total: resp.data.total } });
                }
            })
            .catch((err) => {
                console.log("api err", err);
            })
    }
}

export default getUsersList;