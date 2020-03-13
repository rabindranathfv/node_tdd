const handlersPost = ({ axios }) => ({
    get: async(req, res) => {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.status(200).json({
            ok: true,
            posts: data
        });
    },
    post: async(req, res) => {
        const { body } = req;
        const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users'); 
        const isAdmin = users.find( u => u.id === req.body.userId ); 
        if (isAdmin) { 
            const {data} = await axios.post('https://jsonplaceholder.typicode.com/posts', body);
            return res.status(200).json({
                ok: true,
                post: data
            });
        } 
        res.status(500).json({
            ok: false,
            message: 'not is admin'
        });
    },
    put: async(req, res) => {
        const { id } = req.params;
        const { body } = req;
        const {data} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, body);
        res.status(200).json({
            ok: true,
            post: data
        });
    },
    delete: async(req, res) => {
        const { id } = req.params;
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        res.status(200).json({
            ok: true,
            id
        });
    },
});

module.exports = handlersPost;