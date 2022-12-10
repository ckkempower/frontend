import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { userStore } from 'src/stores';

export const signout = () => {
    if (!browser) return;
    localStorage.removeItem('token');
    userStore.set({
        user: undefined,
        fetching: false,
    });
    goto('/');
};
