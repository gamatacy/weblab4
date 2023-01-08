import SignInForm from "../loginForm/SignInForm";
import SignUpForm from "../loginForm/SignUpForm";
import LoginType from "../loginForm/LoginType";

export const publicRoutes = [
    {path: '/SignIn', component: SignInForm, exact: true},
    {path: '/SignUp', component: SignUpForm, exact: true},
    {path: '/LoginType', component: LoginType, exact: true}
]