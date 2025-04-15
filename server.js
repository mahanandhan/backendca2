import express from 'express'
import users from './data.js'
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("server is running successfully...");
})
app.get('/users', (req, res) => {
    res.send(users);
})
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = users.find((u) => u.id === id);
        if(!user){
            return res.json({success: false, message: 'user not found'});
        }
        const {email, password} = req.body;
        user.email = email;
        user.password = password
        return res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'internal server error'})
    }
})

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = users.find((u) => u.id === id);
        if(!user){
            return res.json({success: false, message: 'user not found'});
        }
        const index = users.findIndex((u) => u.id === id);
        if(index !== -1){
            users.splice(index, 1);
            return res.json({success: true, message: 'user deleted successfully'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'internal server error'})
    }
})




app.listen(2000, () => {
    console.log('server is running on port 2000')
})