import { writable, get } from 'svelte/store';

export interface UserType {
    id: string;
    username: string;
}
// 이것저것 추가 가능

export class UserStore {
    private static instance: UserStore;
    private userStore = writable<UserType | null>(null);
    public isValid = writable<boolean>(false);

    // private constructor to prevent direct instantiation
    private constructor() {}

    // getInstance 메서드: UserStore의 인스턴스를 얻거나 생성합니다.
    // UserStore는 싱글톤이므로 이 메서드를 통해서만 인스턴스에 접근할 수 있습니다.
    public static getInstance(): UserStore {
        if (!UserStore.instance) {
            UserStore.instance = new UserStore();
        }
        return UserStore.instance;
    }

    // setUser 메서드: 유저 정보를 설정합니다.
    // 이 메서드는 로그인 성공 후 유저 정보를 스토어에 저장하는 데 사용됩니다.
    public setUser(user: UserType) {
        this.userStore.set(user);
        this.isValid.set(true);
    }

    // resetUser 메서드: 유저 정보를 초기화합니다.
    // 로그아웃이나 세션 만료 시 호출되어 유저 정보를 초기 상태로 되돌립니다.
    public resetUser() {
        this.userStore.set(null);
        this.isValid.set(false);
    }

    // getUser 메서드: 현재 저장된 유저 정보를 가져옵니다.
    // 컴포넌트에서 현재 로그인한 유저의 정보를 필요로 할 때 사용됩니다.
    public getUser() {
        return get(this.userStore);
    }

    // isLoggedIn 메서드: 현재 유저의 로그인 상태를 반환합니다.
    // 로그인 여부를 확인할 때 사용됩니다.
    public isLoggedIn() {
        return get(this.isValid);
    }

    // 추가적인 유틸리티 메소드는 여기에 추가하면 됩니다.
}

// 사용 예:
// const userStore = UserStore.getInstance(); // UserStore 인스턴스를 얻음

// 유저 정보 설정 예제
// userStore.setUser({ id: '123', username: 'johnDoe', email: 'john@example.com' });

// 유저 정보 초기화 예제
// userStore.resetUser();

// 현재 유저 정보 가져오기 예제
// const currentUser = userStore.getUser();

// 현재 로그인 상태 확인 예제
// const loggedIn = userStore.isLoggedIn();
