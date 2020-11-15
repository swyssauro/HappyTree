const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const episodes = await connection('episodes')
            .select('*');

        return res.json(episodes);
    },

    async create(req, res) {
        const { title, original_title, release_date, overview, backdrop_path, poster_path, season_number } = req.body;

        if (await connection('episodes').where('title', title).first()) {
            return res.json('esse titulo já foi cadastrado.');
        }
        

        await connection('episodes').insert({
            season_number,
            title,
            release_date,
            original_title,
            overview,
            backdrop_path,
            poster_path,
        });

        return res.json({ title });
    }
}