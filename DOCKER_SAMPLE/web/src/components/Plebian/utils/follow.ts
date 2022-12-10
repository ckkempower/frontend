import type { AccountType } from 'src/shared/types';

export const follow = async (user: AccountType) => {
    const res = await fetch('/api/account/follow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            id: user.id,
        }),
    });

    if (res.ok) {
        const payload = await res.json();
        console.log(payload);
        return true;
    }

    return false;
};

export const unfollow = async (user: AccountType) => {
    const res = await fetch('/api/account/follow', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            id: user.id,
        }),
    });

    if (res.ok) {
        const payload = await res.json();
        console.log(payload);
        return true;
    }
    return false;
};
