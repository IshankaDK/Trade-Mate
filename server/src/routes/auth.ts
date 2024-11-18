import {Request, Response, Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({
            data: null,
            message: 'Username and password are required',
            status: 400
        });
    }

    try {

        const existingUser = await User.findOne({where: {username}});
        if (existingUser) {
            return res.status(400).json({
                data: null,
                message: 'Username already taken',
                status: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username, password: hashedPassword});

        res.status(201).json({
            data: {
                id: user.id,
                username: user.username
            },
            message: 'User created successfully',
            status: 201
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: 'User creation failed due to an internal error.',
            status: 500
        });
    }
});


router.post('/login', async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({
            data: null,
            message: 'Username and password are required',
            status: 400
        });
    }

    try {
        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(404).json({
                data: null,
                message: 'User not found',
                status: 404
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                data: null,
                message: 'Invalid credentials',
                status: 401
            });
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '720h'});

        res.status(200).json({
            data: {token},
            message: 'Login successful',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: 'Login failed due to an internal error.',
            status: 500
        });
    }
});

export default router;
