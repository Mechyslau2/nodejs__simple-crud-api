
const USER_ERRORS = {
    '400': "Invalid id format",
    '404': "User not found"
};

const CREATE_USER = {
    '400': 'Invalid input data. All required fields should be filled in',
};

export const getUserError = (error: string): string => USER_ERRORS[error];
export const getUserErrorOnCreate = (error: string): string => CREATE_USER[error];
