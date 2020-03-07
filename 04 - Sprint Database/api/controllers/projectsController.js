const db = require('../../data/dbConfig')

const insert = (data) => {
    return db('projects').insert(data)
} 
const get = () => {
    return db('projects')
}

const getById = (id) => {
    return db('projects').where({id}).first()
}

const update = (id,data) => {
    return db('projects').where({id}).update(data)
}

const remove = (id) => {
    return db('projects').where({id}).del()
}

module.exports = {
    insert,
    get,
    getById,
    update,
    remove
}