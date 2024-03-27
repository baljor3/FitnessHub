const express = require('express')
const router = express.Router()
const db = require('./db');
const jwt  = require('jsonwebtoken');
const { restart } = require('nodemon');
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();