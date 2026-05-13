---
title: "헤르메스 에이전트와 구글 챗 연동 가이드: 설정부터 트러블슈팅까지"
description: "로컬 AI 에이전트를 구글 챗에 안정적으로 연결하는 방법과 주요 오류 해결 사례 정리"
date: 2026-05-13
author: "silla"
tags: ["헤르메스", "구글챗", "AI 에이전트", "PubSub", "연동가이드"]
image: "attachments/20260513/hermes_google_chat_cover.png"
category: "my-blog"
---

# 🤖 헤르메스 에이전트와 구글 챗 연동 가이드

안녕하세요, 신라입니다. 

최근 저는 제가 사용하는 자율형 AI 에이전트인 **헤르메스(Hermes)**를 구글 챗(Google Chat)과 연동하는 작업을 진행했습니다. 로컬 환경에서 돌아가는 에이전트를 클라우드 협업 툴인 구글 챗에 연결하는 과정은 단순한 API 연결 이상의 기술적 원리와 꼼꼼한 설정이 필요하더군요. 

오늘은 그 과정에서 배운 연동 원리와 실전 설정 방법, 그리고 제가 직접 겪으며 해결했던 주요 문제 사례들을 정리해 보았습니다.

---

## 📑 목차
1. **연동 원리**: 왜 Pub/Sub인가?
2. **사전 준비**: 구글 클라우드 설정
3. **실전 설정**: 헤르메스 환경 변수 세팅
4. **트러블슈팅**: 흔히 발생하는 3가지 오류와 해결책
5. **마치며**: 에이전틱 워크플로우의 확장

---

## 1. 연동 원리: 왜 Pub/Sub인가?

일반적인 챗봇은 **Webhook(HTTPS Endpoint)** 방식을 사용합니다. 하지만 이 방식은 로컬 서버가 외부에서 접근 가능한 공인 IP와 도메인, SSL 인증서를 가지고 있어야 한다는 제약이 있습니다. 

헤르메스는 이를 해결하기 위해 **Google Cloud Pub/Sub(Pull 방식)**을 사용합니다.
- **Inbound (수신)**: 구글 챗이 메시지를 받으면 이를 Pub/Sub 토픽에 던집니다. 로컬의 헤르메스는 이 토픽을 구독(Subscription)하며 메시지를 '가져옵니다(Pull)'. 
- **Outbound (발신)**: 헤르메스가 답변을 할 때는 구글 챗 REST API를 직접 호출하여 메시지를 보냅니다.

이 방식 덕분에 로컬 컴퓨터가 방화벽 뒤에 있거나 유동 IP를 사용하더라도 별도의 터널링(ngrok 등) 없이 안정적으로 봇을 운영할 수 있습니다. 마치 텔레그램 봇이 토큰만으로 통신하는 것과 유사한 편리함을 제공합니다.

---

## 2. 사전 준비: 구글 클라우드 설정

공식 사이트의 안내에 따라 다음 단계별 설정을 진행해야 합니다.

### Step 1: 프로젝트 생성 및 API 활성화
- [Google Cloud Console](https://console.cloud.google.com)에서 프로젝트를 생성합니다.
- **Google Chat API**와 **Cloud Pub/Sub API**를 활성화합니다.

### Step 2: 서비스 계정(Service Account) 생성
- 에이전트가 구글 클라우드 리소스에 접근할 수 있도록 서비스 계정을 만들고 **JSON 키 파일**을 다운로드합니다. 
- 이 파일은 에이전트의 '신분증' 역할을 하므로 보안에 유의해야 합니다.

### Step 3: Pub/Sub 토픽 및 구독 생성
- **Topic**: `hermes-chat-events` (이름은 자유롭지만 설정과 일치해야 함)
- **Subscription**: `hermes-chat-events-sub` (전송 유형은 반드시 **'가져오기(Pull)'**여야 함)

---

## 3. 실전 설정: 헤르메스 환경 변수 세팅

에이전트 폴더의 `.env` 파일에 다음 정보들을 입력합니다.

```bash
# 필수 설정
GOOGLE_CHAT_PROJECT_ID=your-project-id
GOOGLE_CHAT_SUBSCRIPTION_NAME=projects/your-project-id/subscriptions/hermes-chat-events-sub
GOOGLE_CHAT_SERVICE_ACCOUNT_JSON=/path/to/your/service-account.json

# 권한 설정 (대화 가능한 사용자 이메일)
GOOGLE_CHAT_ALLOWED_USERS=your-email@domain.com

# 옵션 설정 (홈 채널 ID)
GOOGLE_CHAT_HOME_CHANNEL=spaces/XXXXXXXXX
```

---

## 4. 트러블슈팅: 흔히 발생하는 3가지 오류와 해결책

제가 연동 과정에서 직접 겪고 해결한 생생한 사례들입니다.

### ❌ Case 1: 401 Request had invalid authentication credentials
**원인**: 서비스 계정의 프로젝트 ID와 `.env`에 설정된 프로젝트 ID가 불일치하거나, 키 파일이 잘못된 경우입니다.
**해결**: JSON 키 파일 내부의 `project_id`를 확인하고 `.env` 설정과 일치시켰습니다.

### ❌ Case 2: 봇이 메시지에 응답하지 않음 (응답하지 않음 에러)
**원인**: 구글 챗 서비스가 메시지를 Pub/Sub 토픽으로 보낼 '권한'이 없는 경우입니다. 
**해결**: Pub/Sub 토픽 설정의 [권한] 탭에서 구글 챗 서비스 계정에 **'Pub/Sub 게시자(Pub/Sub Publisher)'** 역할을 부여했습니다. 
> 💡 **Tip**: 구글 챗 API 설정 화면에 명시된 서비스 계정 이메일(예: `service-XXXX@gcp-sa-gsuiteaddons...`)을 토픽 구성원으로 추가해야 합니다.

### ❌ Case 3: Home Channel ID 형식 오류
**원인**: 구글 챗의 공간(Space) ID를 URL 형태(`app/chat/...`)로 입력하거나 단수형(`space/...`)으로 입력한 경우입니다.
**해결**: 반드시 **`spaces/`**(복수형)로 시작하는 고유 ID 형식을 사용해야 합니다. 
- 예: `spaces/AAQAIXWRLNg`

---

## 5. 마치며: 에이전틱 워크플로우의 확장

연동이 완료되면 헤르메스는 구글 챗 안에서 저의 지시를 기다리는 유능한 마법사가 됩니다. 특히 크론(Cron) 스케줄링과 결합하면 매일 아침 저의 지식을 정리해 보고하거나, 복잡한 프로젝트를 협업 툴 안에서 바로 처리할 수 있게 됩니다.

로컬의 강력한 연산 능력과 클라우드 협업 인프라의 결합. 이것이 바로 우리가 지향하는 에이전틱 OS의 미래가 아닐까요? 

도움이 되셨기를 바라며, 여러분만의 마법사를 구글 챗으로 초대해 보세요!

---

## 🔗 참고 자료
- [Hermes Agent 공식 가이드 (Google Chat)](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/google_chat)
- [Google Cloud Console](https://console.cloud.google.com)

---
**필진: 신라 (silla)**  
AI 에이전트와 인간의 동맹을 꿈꾸는 교육 공학자. 매일 아침 헤르메스와 커피를 마시며 미래 교육을 기획합니다.
