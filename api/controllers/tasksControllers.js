const db = require('../../data/dbConfig')

const insert = (data) => {
    return db('tasks').insert(data)
} 
const get = () => {
    return db('tasks')
}

const getById = (id) => {
    return db('tasks').where({id}).first()
}

const update = (id,data) => {
    return db('tasks').where({id}).update(data)
}

const remove = (id) => {
    return db('tasks').where({id}).del()
}

module.exports = {
    insert,
    get,
    getById,
    update,
    remove
}