import axios, { AxiosError } from 'axios';

/**
 * 백엔드 서버에 데이터를 전송하는 함수.
 * 
 * @param ip 백엔드 서버의 IP 주소
 * @param port 백엔드 서버의 포트 번호
 * @param method HTTP 메소드 ("GET", "POST", "PUT", "DELETE" 등)
 * @param path 요청을 보낼 서버의 경로 (예: "/todo/")
 * @param customData 사용자가 추가로 전송하고자 하는 데이터 객체
 * @returns 서버로부터의 응답
 */
export async function sendRequest(ip: string, port: number, method: string, path: string, customData: object | null): Promise<any> {
    // localStorage에서 token과 userid를 가져옴
    const token = localStorage.getItem('token') || 'default-token';  // 토큰의 기본값 설정
    const userid = localStorage.getItem('userid') || 'default-userid'; // userid의 기본값 설정

    // 사용자 정의 데이터를 요청 데이터와 병합
    const requestData = { ...customData };

    // API 요청 URL 구성
    const url = `https://${ip}${path}`;

    try {
        // Axios 요청 구성
        const axiosConfig = {
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
                "userid": userid // userid를 헤더에 추가
            },
            data: requestData,
            withCredentials: true // 브라우저와 동일한 방식으로 요청을 보내도록 설정

        };

        // GET 요청일 경우, 쿼리 매개변수로 requestData를 설정
        if (method === 'GET') {
            axiosConfig.params = requestData;
        }

        // Axios를 사용한 HTTP 요청 수행
        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        // Axios 에러 처리
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // 서버로부터 응답이 있었지만 오류가 발생한 경우
                return { error: `Server responded with status: ${axiosError.response.status}` };
            } else if (axiosError.request) {
                // 요청은 보냈지만 응답을 받지 못한 경우
                return { error: "No response received from server" };
            }
        }
        // 그 외 일반 오류 처리
        return { error: (error as Error).message };
    }
}
