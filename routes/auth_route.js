const express = require('express')
const {login, logout, signup}= require('../controllers/auth-controller.js')
const routes = express.Router()


routes.post('/signup',signup)

routes.post('/login',login)

routes.post('/logout',logout)

module.exports = routes