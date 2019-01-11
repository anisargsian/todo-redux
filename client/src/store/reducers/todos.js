import * as actionType from "../action";

const initialState = {
    todos: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_TODOS:
            return {
                ...state,
                todos: action.value
            }
        case actionType.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.todoElId)
            }
    }
    return state;
};

export default reducer;