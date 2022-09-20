import express, { Request, Response } from 'express';
const Router = express.Router;

import { Users } from '../models/Users';

import { Types } from 'mongoose';
var ObjectId = Types.ObjectId;

const router = Router();

router.post('/user', async (req: Request, res: Response) => {
    try {
        const model = await new Users(req.body).save();
        res.status(201).json(model);
    } catch (err: any) {
        console.log(err.message);
        if (err?.message.includes('E11000')) {
            // If Duplicate Unique Index Passed
            res.status(400).json({
                error: true,
                message:
                    'Duplicate unique index passed, check firebase_id, or email',
            });
        } else
            res.status(500).json({
                error: true,
                message: 'Internal Server Error',
            });
    }
});

router.get('/user/:firebase_id', async (req: Request, res: Response) => {
    console.log('Test');
    try {
        const user = await Users.findOne({
            firebase_id: req.params.firebase_id,
        });
        console.log({ user });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.patch('/form/:id', async (req: any, res: any) => {
    //     try {
    //         console.log('ID ->< ', req.params.id, new ObjectId(req.params.id));
    //         const user = await ListForms.findOneAndUpdate(
    //             {
    //                 _id: new ObjectId(req.params.id),
    //             },
    //             req.body,
    //             { new: true }
    //         );
    //         console.log('user -> ', user);
    //         res.status(200).json(user);
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ error: true, message: 'Internal Server Error' });
    //     }
});

export { router };
