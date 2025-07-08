import * as Yup from 'yup'
export const SignUpFormSchema = Yup.object({
    first_name: Yup.string().required(),
    Last_Name: Yup.string().required(),
    email: Yup.string().required().email(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    confirm_password: Yup.string().required().oneOf([Yup.ref("password"), null], "Password and Confirm Password doesn't match"),
})

