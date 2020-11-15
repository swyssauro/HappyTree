const crypt = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const users = await connection('usuarios')
            .select('username', 'description', 'language');

        return res.json(users);
    },

    async show(request, response) {
        const { username } = request.params;
        const users = await connection('usuarios')
            .where('username', username)
            .select('*')
            .first();

        if (!users) {
            return response.status(400).json({ error: 'usuario não cadastrado...' })
        }

        return response.json(users);
    },

    async create(req, res) {
        const { username, email, password, description, language } = req.body;
        const crypto = crypt.randomBytes(13).toString('base64');

        if (await connection('usuarios').where('username', username).first()) {
            return res.json('esse username já foi cadastrado.');
        }
        
        if (await connection('usuarios').where('email', email).first()) {
            return res.json('esse email já foi cadastrado.');
        }

        await connection('usuarios').insert({
            crypto,
            username,
            email,
            password,
            description,
            language
        });

        return res.json({ crypto });
    }
}