const handlers = ({ axios }) => ({
    get: async(req, res) => {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
        res.status(200).json({
            ok: true,
            data
        });
    },
    post: async(req, res) => {
        const { body } = req;
        const {data} = await axios.post('https://jsonplaceholder.typicode.com/users', body);
        res.status(200).json({
            ok: true,
            data
        });
    },
    put: async(req, res) => {
        const { id } = req.params;
        const { body } = req;
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
        res.status(200).json({
            ok: true,
            id
        });
    },
    delete: async(req, res) => {
        const { id } = req.params;
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        res.status(200).json({
            ok: true,
            id
        });
    }
});

module.exports = handlers;