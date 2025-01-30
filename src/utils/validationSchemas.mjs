export const createUserValidationSchema = {
    username : {
        isLength : {
            options : {
                min : 5,
                max: 32
            },
            errorMessage : "Username must be atleast 5 - 32 Characters",

        },
        notEmpty : {
            errorMessage : "Username cannot be empty"
        },
        isString : {
            errorMessage : "Username must be a string"
        }
    },
    displayName : {
        notEmpty : {
            errorMessage : "Display name must be not empty"
        }
    }
}