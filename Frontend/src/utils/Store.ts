// src/stores/userStore.js
import { writable } from 'svelte/store';

export interface UserType {
    id: number;
    name: string;
    email: string;
    // 추가적으로 필요한 필드들을 정의할 수 있습니다.
  }

export interface ModeType {
    mod: number;
    name: string;
}

export const isLogin = writable<boolean>(false);
export const user = writable<UserType | null>(null);
export const mode = writable<ModeType>({mod: 0, name: "guest"});

import PocketBase from 'pocketbase';
const pb = new PocketBase('http://192.168.50.196:8000');

export const pbStore = writable({
    pb: pb,
    isValid: null
});