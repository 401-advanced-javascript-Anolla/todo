import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import superagent from 'superagent';
dotenv.config();

const API = process.env.API_SERVER || 'https://auth-server-401.herokuapp.com';
const SECRET = process.env.JWT_SECRET || 'supersecret';

export const LoginContext = React.createContext();
