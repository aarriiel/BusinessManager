var business = ''
var username = ''
var userId = ''

class Authentic{
    static login(id, name, account){
        business = account
        username = name
        userId = id
    }

    static logout(){
        business = ''
        username = ''
        userId = ''
    }

    static isAuthentic(name, account){
        if (account == business)
            return true
        return false
    }

    static getUser(){
        return business
    }

    static getUserName(){
        return username
    }

    static getUserId(){
        return userId
    }
}

module.exports = Authentic;