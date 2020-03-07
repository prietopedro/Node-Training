const db = require('../../data/dbConfig')

const insert = (data) => {
    return db('resources').insert(data)
} 
const get = () => {
    return db('resources')
}

const getById = (id) => {
    return db('resources').where({id}).first()
}

const update = (id,data) => {
    return db('resources').where({id}).update(data)
}

const remove = (id) => {
    return db('resources').where({id}).del()
}

module.exports = {
    insert,
    get,
    getById,
    update,
    remove
}