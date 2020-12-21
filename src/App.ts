import { getClient, createClient, deleteClient, updateClient } from "./controller/clientController";
import { getAdd, getSearch, getDelete, getUpdate, getSignIn, getSignUp, 
  createBusiness, login} from "./controller/businessController";

export const AppRoutes = [
    {
        path: "/signIn",
        method: "get",
        action: getSignIn
    },
    {
        path: "/signIn",
        method: "post",
        action: login
    },
    {
        path: "/signUp",
        method: "get",
        action: getSignUp
    },
    {
        path: "/signUp",
        method: "post",
        action: createBusiness
    },
    {
        path: "/add",
        method: "get",
        action: getAdd
    },
    {
        path: "/search",
        method: "get",
        action: getSearch
    },
    {
        path: "/delete",
        method: "get",
        action: getDelete
    },  
    {
        path: "/update",
        method: "get",
        action: getUpdate
    },
    {
        path: "/update",
        method: "post",
        action: updateClient
    },
    {
        path: "/delete",
        method: "post",
        action: deleteClient
    },
    {
        path: "/add",
        method: "post",
        action: createClient
    },
    {
        path: "/search",
        method: "post",
        action: getClient
    },
];