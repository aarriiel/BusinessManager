import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Client} from "../entity/Client";
import {Relationship} from "../entity/Relationship";

var Authentic = require("../authentic")

export async function getClient(request: Request, response: Response) {
    try{
        const clientRepository = getManager().getRepository(Client)
        const client = await clientRepository.findOne({
            name: request.body.name
        })
        const relationRepository = getManager().getRepository(Relationship)
        const relations = await relationRepository.find({
            where: {client: client, businessID: Authentic.getUserId()},
            relations: ["client"]
        })
        var clients = []
        Object.keys(relations).forEach(function(key){
            clients.push(relations[key].client)
        })
        response.render('search',{ name: Authentic.getUserName(), result: '', clients: clients})
    }catch(err){
        console.log(err)
        response.render(
            'search',{ name: Authentic.getUserName(), result: 'This client is not exist.'}
        )
    }
}

export async function createClient(request: Request, response: Response) {
    try{
        var client = new Client()
        client.name = request.body.name
        client.gender = request.body.gender
        client.birthday = request.body.birthday
        client.email = request.body.email
        client.phone = request.body.phone
        client.remark = request.body.remark
        client.createTime = new Date()
        client.updateTime = new Date(null)
        await getManager().save(client)
        
        var relationship = new Relationship()
        relationship.client = client
        relationship.businessID = Authentic.getUserId()
        await getManager().save(relationship)

        response.render('add', { name: Authentic.getUserName(),result: 'Create Successful!'})
    }catch(err){
        response.render('add', { name: Authentic.getUserName(),result: 'Your data type is not correct.'})
    }
}

export async function deleteClient(request: Request, response: Response) {
    try{
        
        
        const clientRepository = getManager().getRepository(Client)
        const client = await clientRepository.findOne({
            name: request.body.name
        })
        const relationRepository = getManager().getRepository(Relationship)
        const relationship = await relationRepository.findOne({
            client: client
        })
        await relationRepository.remove(relationship);
        await clientRepository.remove(client);

        response.render('delete', { name: Authentic.getUserName(),result: 'Delete Successful!'})
    }catch(err){
        console.log(err)
        response.render('delete', { name: Authentic.getUserName(),result: 'This client is not exist.'})
    }
}

export async function updateClient(request: Request, response: Response) {
    try{
        const clientRepository = getManager().getRepository(Client)
        const client = await clientRepository.findOne({
            name: request.body.name
        })
        await clientRepository.update(
            {
                name: request.body.name
            },
            {
                name: request.body.name,
                gender: request.body.gender,
                birthday: request.body.birthday,
                email: request.body.email,
                phone: request.body.phone,
                remark: request.body.remark,
                updateTime: new Date()
            })
        response.render('update', { name: Authentic.getUserName(),result: 'Update Successful!'})
    }catch(err){
        console.log(err)
        response.render('update', { name: Authentic.getUserName(),result: 'Your data type is not correct.'})
    }
}
