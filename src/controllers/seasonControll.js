const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        const season = await connection('season')
            .select('*');

        return res.json(season);
    },

    async show(request, response) {
        const { season } = request.params;
        const seasons = await connection('season')
            .where('season', season)
            .select('nome', 'overview', 'backdrop_path', 'poster_path')
            .first();

        if (!season) {
            return response.status(400).json({ error: 'season não cadastrada...' })
        }

        return response.json(seasons);
    },

    async proc(request, response) {
        const { season } = request.params;
        const episodes = await connection('episodes')
        .where('season_number', season)
        .join('season', 'season', '=', 'season_number')
        .select('episodes.*', 'season.nome');

        return response.json(episodes);
    },

    async create(req, res) {
        const { nome, overview, backdrop_path, poster_path  } = req.body;
        const season = req.headers.authorization;

        if (!season) {
            return res.status(400).json({ not_found: 'preencha o campo.' })
        }

        if (await connection('season').where('season', season).first()) {
            return res.json('esse season_number já foi cadastrado.');
        }

        await connection('season').insert({
            season,
            nome,
            overview,
            backdrop_path,
            poster_path
        });

        return res.json({ nome });
    }
}