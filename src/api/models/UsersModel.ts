import db from "../../database/dbConfig"

interface User {
    username: string,
    password: string
}

export const get = () => {
    return db('users')
}

export const insert = (body: User) => {
    return db("users").insert(body)
}

export const getById = (id: number) => {
    return db('users').where({id})
}

export const getByUsername = (username:string) => {
    return db('users').where({username}).first()
}