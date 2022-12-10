import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from './utils/unauthorized';
import argon2 from 'argon2';
import { Account } from '../entities/Account';
import { validate } from './utils/validate';
import { requireAuth } from './utils/requireAuth';
import {
    getAccountFromJWT,
    getJWTPayload,
    JWTPayload,
} from '../utils/parseJWT';
import { writeFile } from './file';
import { Group } from '../entities/Group';
export const account = Router();
account.get('/', requireAuth, async (req, res) => {
    const auth = req?.headers?.authorization;
    console.log(auth);
    if (!auth)
        return unauthorized(res, { message: 'No authorization header found!' });

    const token = auth.split(' ')[1];

    if (!token)
        return unauthorized(res, {
            message: 'Malformed authorization header!',
        });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    if (!payload?.id) return unauthorized(res, { message: 'Invalid token!' });

    const account = await Account.findOne({ id: payload.id });

    if (!account)
        return unauthorized(res, {
            message: `Account not found with id ${payload?.id}`,
        });

    res.json({
        account: Account.sanatize(account),
    });
});

account.get('/:id', async (req, res) => {
    const id = req.params.id;

    const account = await Account.findOne({ where: { id } });
    if (!account) {
        res.status(400).json({
            error: 'Account not found',
        });
        return;
    }
    res.json({
        account: Account.sanatizePublic(account),
    });
});
account.get('/:id/followers', async (req, res) => {
    //find all of the follwers and return them as a list of ids
    const id = req.params.id;
    const account = await Account.findOne({
        where: { id },
        relations: ['followers'],
    });
    if (!account) {
        res.status(400).json({
            error: 'Account not found',
        });
        return;
    }
    const followers = account.followers.map((f) => f.id);
    res.json({
        followers,
    });
});

account.post('/login', async (req, res) => {
    const valid = await validate(req, res, Account.validateLogin);
    if (!valid) return;

    const { email, password } = req.body;

    const account = await Account.findOne({
        where: {
            email,
        },
    });
    if (!account)
        return unauthorized(res, { message: 'Email address not found!' });

    const matches = await argon2.verify(account.password, password);

    if (!matches) return unauthorized(res, { message: 'Invalid password!' });

    const token = jwt.sign({ id: account.id }, process.env.JWT_SECRET!);

    res.json({
        account: Account.sanatize(account),
        token,
    });
});

account.post('/signup', async (req, res) => {
    const valid = await validate(req, res, Account.validateRegister);
    if (!valid) return;

    req.body.password = await argon2.hash(req.body.password);

    req.body.pfp = writeFile(req.body.pfp.file, req.body.pfp.extension);
    console.log('new body', req.body);
    const account = new Account();

    Object.assign(account, req.body);

    const lowestChild = await Group.createGroupsIfNotExist([
        account.country,
        account.state,
        account.city,
    ]);

    // add new user to group
    account.group = lowestChild;
    await account.save();

    const token = jwt.sign(
        {
            id: account.id,
        },
        process.env.JWT_SECRET!
    );
    res.json({
        account: Account.sanatize(account),
        token,
    });
});

account.put('/password', requireAuth, async (req, res) => {
    const userId = (req?.user as any)?.id;
    if (typeof userId == undefined) {
        return unauthorized(res, { message: 'No user found!', success: false });
    }
    const valid = req.body.oldPassword && req.body.newPassword;
    if (!valid) {
        res.status(400).json({
            message: 'Missing old password or new password',
            success: false,
        });
    }

    const { oldPassword, newPassword } = req.body;
    const user = await Account.findOne({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return unauthorized(res, { message: 'No user found!' });
    }
    const matches = await argon2.verify(user.password, oldPassword);
    if (!matches) {
        return unauthorized(res, {
            message: 'Invalid password!',
            success: false,
        });
    }
    user.password = await argon2.hash(newPassword);
    await user.save();
    res.json({
        message: 'Password updated!',
        success: true,
    });
});

account.put('/pfp', requireAuth, async (req, res) => {
    const userId = (req?.user as any)?.id;
    if (typeof userId == undefined) {
        return unauthorized(res, { message: 'No user found!', success: false });
    }
    const account = await Account.findOne({
        where: {
            id: userId,
        },
    });
    if (!account) {
        return unauthorized(res, { message: 'No user found!', success: false });
    }

    const pfp = req.body;
    const valid = pfp?.file && pfp?.extension;
    if (!valid) {
        res.status(400).json({
            message: 'Missing file or extension',
            success: false,
        });
        return;
    }
    const path = writeFile(pfp.file, pfp.extension);
    account.pfp = path;
    await account.save();
    res.json({
        message: 'PFP updated!',
        success: true,
        pfp: path,
    });
});

account.post('/follow', requireAuth, async (req, res) => {
    const payload = getJWTPayload(req, res);
    if (!payload?.id) return unauthorized(res, { message: 'Invalid token!' });
    const userId = payload.id;
    const { id } = req.body;
    const account = await Account.getWithFollowers(id);
    const myAccount = await getAccountFromJWT(req, res);
    if (userId == id) {
        return unauthorized(res, { message: 'You cannot follow yourself!' });
    }
    if (!account) {
        return unauthorized(res, { message: 'Account not found!' });
    }
    if (!myAccount) {
        return unauthorized(res, { message: 'Account not found!' });
    }
    const success = await account.addFollower(myAccount);
    if (!success) {
        return unauthorized(res, { message: 'Already following!', success });
    }
    res.json({
        message: 'Followed!',
        success,
    });
});

account.delete('/follow', requireAuth, async (req, res) => {
    const { id } = req.body;
    const account = await Account.findOne({
        relations: ['followers'],
        where: {
            id,
        },
    });
    const myAccount = await getAccountFromJWT(req, res, ['followers']);

    if (!myAccount || !account) {
        return unauthorized(res, { message: 'Account not found!' });
    }
    const success = await account.removeFollower(myAccount);
    if (!success) {
        return unauthorized(res, { message: 'Not following!', success });
    }
    res.json({
        message: 'Unfollowed!',
        success,
    });
});
