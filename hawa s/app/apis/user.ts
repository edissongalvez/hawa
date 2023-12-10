import express from 'express'
import multer from 'multer'
import fs from 'fs'

import * as userService from '../services/user'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/users/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await userService.login(username, password)
    res.json(user)
})

router.post('/', upload.single('image'), async (req, res) => {
    if (req.file) {
        const {username, password, firstName, lastName} = req.body
        const imagePath = req.file?.path
        const user = await userService.createUser(username, password, imagePath, firstName, lastName)
        res.json(user)
    }
})

router.get('/', async (req, res) => {
    const users = await userService.getUsers()
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await userService.getUser(Number(req.params.id))
    res.json(user)
})

router.put('/:id', upload.single('image'), async (req, res) => {
    const {id, username, password, firstName, lastName} = req.body

    const prevUser = await userService.getUser(id)
    if (!prevUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    let imagePath = prevUser.image ?? ''
    if (req.file) {
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }
        imagePath = req.file.path
    }

    const user = await userService.updateUser(id, username, password, imagePath, firstName, lastName)
    res.json(user)
})

router.delete('/:id', async (req, res) => {
    await userService.deleteUser(Number(req.params.id))
    res.status(204).end()
})

export default router