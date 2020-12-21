import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Business} from "../entity/Business";
import {Relationship} from "../entity/Relationship";

var Authentic = require("../authentic")

export async function login(request: Request, response: Response) {
    try{
        const businessRepository = getManager().getRepository(Business)
        const business = await businessRepository.findOne({
            account: request.body.account, 
            password: request.body.password
        })
        Authentic.login(business.id, business.name, business.account)
        response.redirect('add')
    }catch(err){
        console.log(err)
        response.render('signIn',{ alert: 'Wrong account or password.'})
    }
}

export async function getAdd(request: Request, response: Response) {
    response.render('add', {name: Authentic.getUserName(), result: ''})
}

export async function getSearch(request: Request, response: Response) {
    try{

        const relationRepository = getManager().getRepository(Relationship)
        const relations = await relationRepository.find({ 
            where: {businessID: Authentic.getUserId()},
            relations: ["client"] 
        })
        var clients = []
        Object.keys(relations).forEach(function(key){
            clients.push(relations[key].client)
        })
        response.render('search',{ name: Authentic.getUserName(), result: '', clients: clients})
    }catch(err){
        console.log(err)
        response.render('search', {name: Authentic.getUserName(), result: '', clients: ''})
    }
}

export async function getDelete(request: Request, response: Response) {
    response.render('delete', {name: Authentic.getUserName(), result: ''})
}

export async function getUpdate(request: Request, response: Response) {
    response.render('update', {name: Authentic.getUserName(), result: ''})
}

export async function getSignIn(request: Request, response: Response) {
    response.render('signIn', {alert: ''})
}

export async function getSignUp(request: Request, response: Response) {
    response.render('signUp', {alert: ''})
}

export async function createBusiness(request: Request, response: Response) {
    try{
        var business = new Business();
        business.name = request.body.name;
        business.account = request.body.account;
        business.password = request.body.password;
        await getManager().save(business)
        response.redirect('../signIn')
    }catch(err){
        response.render('signUp', {alert: 'This account has been used.'})
    }
}