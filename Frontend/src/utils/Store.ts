// src/stores/userStore.js
import { writable } from 'svelte/store';

export interface ModeType {
    mod: number;
    name: string;
}

export const mode = writable<ModeType>({mod: 0, name: "guest"});