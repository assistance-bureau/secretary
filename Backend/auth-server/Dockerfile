# 시작 이미지 선택
FROM golang:latest

# 작업 디렉터리 설정
WORKDIR /app

# Go 언어 의존성 관리 파일 복사 (source 폴더에서)
COPY source/go.mod .
COPY source/go.sum .

# 의존성 설치
RUN go mod download

# 나머지 소스 코드 복사 (source 폴더에서)
COPY source/ .

# 애플리케이션 빌드
RUN go build -o main .

# 애플리케이션 실행
CMD ["/app/main"]
