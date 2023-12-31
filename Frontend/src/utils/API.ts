import axios, { AxiosError } from 'axios';

/**
 * 백엔드 서버에 데이터를 전송하는 함수.
 * 
 * @param ip 백엔드 서버의 IP 주소
 * @param port 백엔드 서버의 포트 번호
 * @param method HTTP 메소드 ("GET", "POST", "PUT", "DELETE" 등)
 * @param path 요청을 보낼 서버의 경로 (예: "/memo/")
 * @param customData 사용자가 추가로 전송하고자 하는 데이터 객체
 * @returns 서버로부터의 응답
 */
export async function sendRequest(ip: string, port: number, method: string, path: string, customData: object | null): Promise<any> {
    // 공통 사용자 정보
    const commonData = {
        userid: "guest",  // 스토어나 다른 방법으로부터 가져온 사용자 ID
        token: "abc123"   // 스토어나 다른 방법으로부터 가져온 토큰
    };

    // 사용자 정의 데이터와 유저 데이터를 합침
    const requestData = { ...commonData, ...customData };

    // API 요청 URL 구성
    const url = `http://${ip}:${port}${path}`;

    try {
        const axiosConfig = {
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json"
            }
        };

        // PUT 및 DELETE 요청의 경우, 쿼리 매개변수 사용
        if (method === 'PUT' || method === 'DELETE') {
            axiosConfig.params = requestData;
        } else {
            // 그 외 요청의 경우, 요청 본문 사용
            axiosConfig.data = requestData;
        }

        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                return { error: `Server responded with status: ${axiosError.response.status}` };
            } else if (axiosError.request) {
                return { error: "No response received from server" };
            }
        }
        return { error: (error as Error).message };
    }
}
