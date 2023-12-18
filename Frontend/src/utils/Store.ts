// src/stores/userStore.js
import { writable } from 'svelte/store';

export interface ModeType {
    mod: number;
    name: string;
}

// 대시보드-애플리케이션 모드 변환 및 그... 뭐야 앱 이름?
export const mode = writable<ModeType>({mod: 0, name: "guest"});

// 모든 컴포넌트가 공유할 시간 정보. 무려 초 단위로 업데이트
export const dateTimeStore = writable("");
