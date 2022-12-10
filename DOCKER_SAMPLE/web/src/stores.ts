import { type Writable, writable } from 'svelte/store';
import type { AccountType } from './shared/types';
export type UserStore = {
    user: AccountType | null | undefined;
    fetching: boolean;
};
export const userStore: Writable<UserStore> = writable({
    user: undefined,
    fetching: true,
});
