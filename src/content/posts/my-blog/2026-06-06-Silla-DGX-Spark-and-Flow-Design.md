---
title: "로컬 에이전트 구축과 학교 시스템 리디자인"
description: "고성능 DGX Spark 서버 도입과 방송실 하드웨어 제어 테스트 성공 사례, 그리고 코드 인텔리전스 논문을 바탕으로 한 학교 업무 플로우의 재설계 방향"
date: 2026-06-06
author: "silla"
tags: ["DGXSpark", "하드웨어제어", "코드인텔리전스", "경로재설계", "로컬AI", "업무자동화"]
image: "/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_01.webp"
category: "my-blog"
---

# 🪄 로컬 에이전트 구축과 학교 시스템 리디자인

안녕하세요, 신라입니다. 

지난 수행평가 플로우 발표에 이어, 오늘 저는 마법과 같은 두 가지 실제적 진화 지점을 들고 찾아왔습니다. 

이틀 전 학교 정보실에 드디어 도착한 초고성능 'DGX Spark' 서버 세팅을 클로드와 제미나이의 힘을 빌려 기적처럼 마친 여정, 그리고 이를 활용해 실제 방송 장비와 구글 챗 에이전트를 물리적으로 결합하여 학교 스피커를 메신저로 제어해 낸 생생한 하드웨어 연동 실험 사례를 공유하고자 합니다.

---

## 📑 목차
1. **DGX Spark 도입**: 클로드와 함께 돌파한 초기 장벽
2. **에이전트 제어**: 메신저 지시로 작동하는 학교 스피커
3. **코드 인텔리전스**: 수단에서 행동체로 진화하는 소프트웨어
4. **경로의 리디자인**: 꼬일 대로 꼬인 한글과 엑셀 데이터 통일
5. **로드맵**: 작업(Task) 단위에서 플로우(Flow) 수준으로의 도약

---

## 1. DGX Spark 도입: 클로드와 함께 돌파한 초기 장벽

<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_01.webp" alt="슬라이드 1" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_02.webp" alt="슬라이드 2" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_03.webp" alt="슬라이드 3" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_04.webp" alt="슬라이드 4" class="desktop-image-fix" />

이틀 전, 학교 예산으로 힘겹게 구비한 엔비디아의 고성능 소형 워크스테이션 **'DGX Spark'** 장비가 저희 정보실에 안착했습니다.

처음 모니터를 켜고 부팅을 했을 때 권장 사양 가이드에 따라 '네모클로(NemoClaw)' 샌드박스를 연동하고 가이드 환경을 설정하려 했으나, 리눅스 서버 초기 빌드 시 한글 입력 장치가 누락되어 있거나 세부 포트와 환경 변수를 하나하나 수작업으로 제어해 줘야 하는 높은 터미널 명령어 장벽이 버티고 있었습니다.

이를 돌파하고자 저는 로컬 서버에 즉각 클로드(Claude) API 코드 스크립트를 올렸습니다. 

클로드에게 가이드 오류 스택과 현재 설정을 캡처해 던지며 "여기서 막혔으니 해결할 수 있는 스크립트를 직접 짜서 처리해 줘"라고 역위임했고, 제미나이 패널을 보조 질문 창구로 써가며 반나절 만에 모든 가상 도커 및 AI 개발 환경 세팅을 완벽하게 마무리했습니다.

<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_05.webp" alt="슬라이드 5" class="desktop-image-fix" />

이 고가의 리소스를 교실에 온전히 안착시키기 위해 저는 다음 두 가지 활용 방향을 확립했습니다.
1. **분할 공유 모드**: 거대한 컴퓨팅 연산 파워를 컨테이너 단위로 쪼개어, 인공지능 탐구 동아리 학생들이나 교사 연구회원들에게 계정 사용 권한을 발급해 주는 방식.
2. **로컬 에이전트 구동 모드**: 외부망 통신이 완전히 거세된 폐쇄형 프라이빗 로컬 llm 환경을 구축하여 보안과 내부 정보 보호를 유지하는 방식.

---

## 2. 에이전트 제어: 메신저 지시로 작동하는 학교 스피커

<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_06.webp" alt="슬라이드 6" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_07.webp" alt="슬라이드 7" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_08.webp" alt="슬라이드 8" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_09.webp" alt="슬라이드 9" class="desktop-image-fix" />

안정화 세팅이 끝난 첫날, 방송부 학생과 함께 아주 짜릿한 현장 실증 테스트를 단행했습니다. 

방송실 컴퓨터와 구글 챗에 상주하는 '헤르메스 에이전트'의 백엔드 API 포트를 유선으로 매핑했습니다. 

그 후 제가 수업 중인 338호 교실에서 휴대폰 메신저 창을 열어 헤르메스 챗봇에게 다음과 같이 텍스트로 지시했습니다.
> *"338호실에 '에이전트 테스트입니다' 라고 한국어 여성 소리 12로 차임벨 있게 출력해줘"*

지시가 완료되자 불과 4초 만에 338호실 천장 스피커에서 고운 차임 음과 함께 해당 TTS 음성 방송이 완벽하게 흘러나왔습니다! 

저희 학교 방송 장비 대시보드가 다행히 외부 시그널 송출 포트를 허용하는 최신 디지털 디지털 믹서 구조로 교체되어 있었기 때문에 에이전트의 제어 신호가 다이렉트로 매핑된 것입니다.

이것이 안정화된다면 방송 담당 선생님의 인수인계나 방송 세팅 업무 역시 놀라운 방식으로 진화합니다. 

구글 챗 창에 "모의고사 세팅으로 방송 채널을 돌려줘", "매주 바뀌는 학급별 급식 순서 데이터를 읽어서 월요일 점심 방송으로 자동 송출해줘"라고 타이핑만 해두면 알아서 백그라운드 크론(Cron) 작업으로 방송 시스템을 직접 핸들링하게 됩니다. 

더 나아가 학교 전역 TV에 안내 문구를 노출하는 컴퓨터 스마트 제어 시스템 연동도 추진 중입니다.

---

## 3. 코드 인텔리전스: 수단에서 행동체로 진화하는 소프트웨어

<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_10.webp" alt="슬라이드 10" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_11.webp" alt="슬라이드 11" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_12.webp" alt="슬라이드 12" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_13.webp" alt="슬라이드 13" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_14.webp" alt="슬라이드 14" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_15.webp" alt="슬라이드 15" class="desktop-image-fix" />

이러한 물리적 장비의 연동이 가능해진 배경에는 소프트웨어의 질적 패러다임이 '도구'에서 스스로 사고하고 제어하는 **'행동체'**로 완전히 이동했기 때문입니다.

최근 발표된 코드 인텔리전스(Code Intelligence) 관련 연구 보고서에 따르면, 기존에는 코드가 단순히 사람이 짜둔 고정된 논리 결과물(Code as Output)에 불과했으나, 이제는 모델이 스스로 코드를 생성하여 로컬 OS와 마우스를 움직이고 시스템을 탐색하는 상호작용 매개 언어(Code as Protocol / Interaction Protocol)로 변모하고 있습니다.

범용 에이전트의 3대 필수 능력인 **'도구 사용(MCP 프로토콜)', '코드적 논리 추론(Thinking in Code)', '환경 조작(Computer-Use)'**의 완성도가 매우 무르익은 덕분에, 로컬 망 안에서도 에이전트가 코드를 이용해 파일 구조를 바꾸고 하드웨어를 주도적으로 통제하는 것이 기술적으로 가능해진 상태입니다.

---

## 4. 경로의 리디자인: 꼬일 대로 꼬인 한글과 엑셀 데이터 통일

<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_16.webp" alt="슬라이드 16" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_17.webp" alt="슬라이드 17" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_18.webp" alt="슬라이드 18" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_19.webp" alt="슬라이드 19" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_20.webp" alt="슬라이드 20" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_21.webp" alt="슬라이드 21" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_22.webp" alt="슬라이드 22" class="desktop-image-fix" />

그러나 아무리 훌륭한 하드웨어와 에이전트 소프트웨어를 갖추었더라도, 학교 안의 데이터 흐름이 개별 담당자의 편의에 따라 한글(HWP), 엑셀, PDF 등으로 사분오열되어 꼬여있다면 에이전트는 한 걸음도 전진할 수 없습니다.

매번 담당자가 바뀔 때마다 각기 다른 양식의 문서와 인쇄물을 가져와서 새로운 포맷에 끼워 맞추려다 소통 단절과 업무 엉킴이 발생하는 것은 우리가 매년 겪어 온 현실입니다. 

우리가 지향해야 할 방향은 단순 종이 없는 교실(디지털화)이 아닙니다. **호환 가능한 단일 클라우드 데이터 경로를 설계해 두고 에이전트가 자유롭게 순찰할 수 있도록 시스템 리디자인(Redesign)을 관철하는 것**입니다.

<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_23.webp" alt="슬라이드 23" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_24.webp" alt="슬라이드 24" class="desktop-image-fix" />

저희 인공지능과 수학탐구반 동아리 신청 절차와 보고서 작성 단계에서 한글 파일 인쇄, 대면 수합, 수십 회의 '최종의 최종' 수정 파일을 모으는 낭비를 전면 철폐했습니다. 모든 정보를 구글 드라이브와 단일 스프레드시트 포트폴리오 경로로 일괄 강제 통일하여 정보 처리를 단순화했습니다.

---

## 5. 로드맵: 작업(Task) 단위에서 플로우(Flow) 수준으로의 도약

<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_25.webp" alt="슬라이드 25" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_26.webp" alt="슬라이드 26" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EC%8B%A0%EB%9D%BC%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_27.webp" alt="슬라이드 27" class="desktop-image-fix" />

이러한 단일 경로 데이터 셋 구축이 완료되었을 때, 비로소 개별 작업 수준의 30클릭 이상의 가위질을 단 하나의 원클릭 '플로우(Flow)' 파이프라인으로 묶을 수 있습니다.

평가의 파이프라인(설계-실행-채점-피드백-기록)을 플로우로 묶어 교사의 행정 피로를 혁파하듯, 교과 수업 설계 및 2월 신학기 준비 기간부터 이듬해 1월 성적 마감까지의 시간축 전체를 연결하는 **'연간 업무 재배치 플로우 디자인'**을 목표로 하고 있습니다.

12월 중으로 동료 선생님들과 이 통합 수행평가 및 교무행정 워크플로우 대시보드 시안을 본격 릴리즈하여 학교 안의 꼬인 혈관을 일자로 시원하게 뚫어 드리겠습니다. 많은 기대와 조언 부탁드립니다. 감사합니다.

---

## 💬 질의응답 (Q&A)

**Q: DGX Spark 초기 세팅 시, 한글 입력이나 폰트 외에 에이전트를 물리적으로 세팅하는 데 있어서 어려웠던 환경적 장벽은 없으셨나요?**  
**A:** 의외로 보안망 우회 및 도커(Docker) 컨테이너 설정이 가장 번거로웠습니다. 일반적인 리눅스 환경과 달리, Nvidia 계열 샌드박스는 물리 가속 GPU 환경을 컨테이너 내부에서 손실 없이 공유해야 하므로 내부 라이브러리 드라이버가 서로 충돌하여 에러가 계속 뿜어졌습니다. 이것을 교사 혼자 터미널을 보며 디버깅했다면 아마 꼬박 일주일은 밤을 새웠을 텐데, 로컬에 올린 클로드와 제미나이가 드라이버 버전 매칭 및 빌드 에러 로그를 읽고 실시간 해결 스크립트를 제공해 준 덕분에 아주 가뿐하게 세팅을 마칠 수 있었습니다.

**Q: 학교 방송 멘트가 나갈 때, 개인정보가 실수로 공용 스피커를 통해 전체 방송으로 퍼질 유해성은 어떻게 예방하나요?**  
**A:** 굉장히 치명적인 위험을 짚어주셨습니다. 만일 에이전트의 오작동이나 챗봇 프롬프트 오인식으로 특정 학생의 상담 내용이나 성적 민감 정보가 전체 스피커 방송으로 나가게 된다면 엄청난 방송 사고입니다. 이를 예방하기 위해 헤르메스의 소통 채널 포트는 1단계와 2단계의 로컬 규칙 필터에 의해 '전체 스피커 송출'을 지시할 수 있는 명령어 문장을 극도로 엄격하게 고정했습니다. 일반적인 텍스트 생성은 불가능하며, 오직 미리 지정된 검증용 안내 멘트 포맷만을 출력하도록 중간 인터페이스 안전장치(Guardrails)를 세팅하여 사고 확률을 0%에 수렴하게 조율했습니다.

---

## 🔗 연관 글
- 고구려 선생님의 블로그 글: [AI 채점의 블랙박스와 설명가능한 AI(XAI-ED)](/posts/my-blog/2026-06-06-Goguryeo-Explainable-AI-in-Education)
- 백제 선생님의 블로그 글: [AI 시대, 효율보다 '의미'를 남기는 질문의 힘](/posts/my-blog/2026-06-06-Baekje-Homo-Ludens-and-Human-Edge)
- 신라 선생님의 이전 글: [Ask Gemini와 평가 플로우의 진화](/posts/my-blog/2026-05-29-Silla-Gemini-Skills-and-Assessment-Flow)
