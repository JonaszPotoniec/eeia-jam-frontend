export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER': {
            console.log('authReducer - login');
            return action.payload;
        };

        default:
            console.log('authReducer - default');
            return state;
    }
}