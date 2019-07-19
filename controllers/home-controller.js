module.exports = {
    index(req, res) {
        res.send('hello world')
    },
    get(req, res){
        res.send('get')
    },
    post(req, res){
        res.send('post')
    },
    saveUser: {
        method: 'post',
        handler(req, res){
            res.send('ok')
        }
    }
}