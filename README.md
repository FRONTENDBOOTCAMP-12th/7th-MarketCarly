# 7th-MarketCarly

![7Carly](/public/assets/images/README/logo.svg)

[7Carly에서 다양한 상품을 만나보세요!](https://7th-market-carly-op9k.vercel.app/)


## 목차
1. [프로젝트 소개](#프로젝트-소개)
1. [팀 소개](#팀-소개)
1. [작업 환경](#작업-환경)
   - [기술 스택](#기술-스택)
   - [컨벤션](#컨벤션)
   - [디렉토리 구조](#디렉토리-구조)
1. [7Carly](#7Carly)
   - [사이트맵](#사이트맵)
   - [페이지별 주요 기능 시연](#페이지별-주요-기능-시연)


## 프로젝트 소개

멋쟁이 사자처럼 프론트엔드 12기 7조의 걸작 **럭키비키 마켓칼리** 사이트입니다! <br>
쇼핑몰 '마켓컬리'를 클론 코딩하여 사이트를 구현했습니다. <br>



## 팀 소개

| 이름 | 역할 | 파트 |
|----------|----------|----------|
| 서현지<br>([yzz2y](https://github.com/yzz2y)) | 조장,<br>스크럼 마스터 |  상품 목록 페이지 |
| 박수진<br>([ififiam](https://github.com/ififiam)) | 조원 | 팝업창, 장바구니 팝업창, 카테고리 메뉴 컴포넌트 |
| 이성우<br>([SungWoo00](https://github.com/Sungwoo00)) | 조원 | 헤더, 푸터, 메인 페이지, 상품 DB 설계, 배포 |
| 이소민<br>([somin2352](https://github.com/somin2352)) | 조원 | 회원가입 & 로그인 페이지, 정보수정 페이지, 장바구니 페이지, 사용자 DB 설계 |
| 이하늘<br>([neulhi](https://github.com/neulhi)) | 조원 | 상품 상세 페이지, 상품 DB 설계 |


## 작업 환경

### 기술 스택
| 분류                    | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 프론트엔드              | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)|
| 백엔드                  | ![Pocketbase](https://img.shields.io/badge/Pocketbase-009688?style=for-the-badge&logo=databricks&logoColor=white)                                                                                                                                                                                                                                                                                                                      |
| 빌드 툴                 | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                                                                                                                                                                                                                                        |
| 패키지 매니저           | ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                                                                                                                                                                                                                                           |
| 협업 툴                 | ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                                                                                                                   |
| 코드 품질 툴            | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)                                                                                                                                                                                                                      |
| 디자인 & 개발 환경(IDE) | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)                                                                                                                                                                                                         |
| 호스팅                  | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                                                                                                                                                                                                  |

### 컨벤션 및 위키

🔹 [깃(브랜치, 커밋) 컨벤션](https://www.notion.so/Git-15a73873401a813c809fe81d3c57ad1a)

🔹 [코딩 컨벤션](https://www.notion.so/Coding-15a73873401a8191b1b4d6ef724ab33b)

🔹 [Wiki](https://github.com/FRONTENDBOOTCAMP-12th/7th-MarketCarly/wiki)

### 디렉토리 구조

```
7th-MarketCarly
├─ .github
├─ public
├─ src
├─ .prettierrc.cjs
├─ guide
├─ index.html
├─ index.ts
├─ package-lock.json
├─ package.json
├─ public
│  └─ assets
│     ├─ icons
│     └─ images
│        └─ README
├─ src
│  ├─ Layout
│  │  ├─ Footer
│  │  └─ Header
│  ├─ api
│  ├─ assets
│  │  ├─ icons
│  │  └─ images
│  ├─ components
│  │  ├─ AddCart
│  │  ├─ Cart
│  │  ├─ Filter
│  │  ├─ MenuCategory
│  │  ├─ MyPage
│  │  ├─ Pagination
│  │  ├─ PopupAd
│  │  ├─ ProductCard
│  │  ├─ ProductDetail
│  │  ├─ Register
│  │  ├─ Sort
│  │  └─ main
│  ├─ pages
│  │  ├─ cart
│  │  ├─ login
│  │  ├─ myPage
│  │  ├─ productDetail
│  │  ├─ productList
│  │  ├─ pwConfirm
│  │  └─ register
│  └─ styles
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierrc.cjs
├─ README.md
├─ index.html
├─ main.js
├─ package-lock.json
├─ package.json
└─ vite.config.js
```

## 7Carly

### 페이지별 주요 기능 시연

- **메인**
![main-1](https://github.com/user-attachments/assets/5b260ad8-989e-41b5-9e45-ec308a0c64e9)
![main-2](https://github.com/user-attachments/assets/3c384d9c-8cf5-4bde-b7c1-1f3b4ea12ec2)
![main-3](https://github.com/user-attachments/assets/dfa7e656-30f0-43cf-a3ae-58b44c0db2a9)
![main-4](https://github.com/user-attachments/assets/05057175-aa30-454a-b0bd-ed8a9f6ec38b)


- **팝업창**
![popUp](https://github.com/user-attachments/assets/23d14e1e-43cd-471e-8504-02bc7b84e71b)


- **회원가입**
![register](https://github.com/user-attachments/assets/16d3678c-f671-4475-9453-871757dd56f0)


- **로그인**
![login](https://github.com/user-attachments/assets/1901dc83-32ea-4ae9-9806-c632262a654e)


- **상품 목록**
![productList-1](https://github.com/user-attachments/assets/41443477-d96b-432d-8cde-4462be3d2b70)
![productList-2](https://github.com/user-attachments/assets/487000e0-0007-478f-9533-b98d23814794)
![productList-3](https://github.com/user-attachments/assets/4cfe4ae3-ad12-4761-b606-2dc9b93b034f)


- **상품 상세**
![productDetail-1](https://github.com/user-attachments/assets/5b00c472-a300-4d35-b085-018474aeab7e)
![productDetail-2](https://github.com/user-attachments/assets/3f4b901d-8771-4fb8-839c-a860c1f59c42)


- **장바구니**
![cart](https://github.com/user-attachments/assets/83ff244d-a943-4c86-ad4c-26451c782bb0)