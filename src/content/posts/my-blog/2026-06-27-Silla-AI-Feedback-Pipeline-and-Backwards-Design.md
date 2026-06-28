---
title: "기록 지원에서 설계까지: 교사 체감형 AI 역산 설계"
description: "서논술형 채점 및 피드백 자동화 파이프라인의 실무 적용과, 이를 통해 평가와 수업 설계를 역방향으로 리디자인하는 교육 혁신 방안 제시"
date: 2026-06-27
author: "silla"
tags: ["서논술형채점", "구글시트", "앱스크립트", "오픈라우터", "역방향설계", "공교육혁신"]
image: "/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_01.webp"
category: "my-blog"
---

# 🪄 기록 지원에서 설계까지: 교사 체감형 AI 역산 설계

안녕하세요, 신라입니다.

지난 시간 학교 컴퓨터의 물리적 필수 프로그램 세팅에 이어, 이번 발표에서는 구글 시트와 Apps Script, 그리고 대화형 AI API를 결합한 **'서논술형 채점 및 피드백 파이프라인'**의 완성본과 이를 현업에 실제 도입한 매뉴얼을 공유하고자 합니다. 또한 이 기술적 흐름이 어떻게 교사의 평가관과 수업 설계 구조를 '역순'으로 혁신할 수 있는지 그 교육적 본질에 대해 논의하고자 합니다.

---

## 📑 목차
1. **역산 설계(Backwards Design)의 교육학적 개념**
2. **서논술형 AI 채점 파이프라인 매뉴얼 및 가이드**
3. **루브릭 세분화와 채점 결과 발송 자동화**
4. **결과 데이터로부터 수업과 평가 리디자인하기**
5. **기타 업무 자동화 및 인프라 개선 현황**

---

## 1. 역산 설계의 교육학적 개념: 기록에서 거꾸로 올라가기

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_01.webp" alt="슬라이드 1" class="desktop-image-fix" />

오늘 발표 제목은 **'기록 지원에서 설계까지 : 교사 체감형 AI 역산 설계'**입니다. 교실 현장에서 인공지능과 디지털 도구를 활용할 때, 왜 아래에서부터 거꾸로 치고 올라가는 패러다임이 유효한지 그 흐름을 도식화했습니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_02.webp" alt="슬라이드 2" class="desktop-image-fix" />

본 발표는 크게 기록 및 평가 자동화 파이프라인을 다루는 전반부와, 생기부 기록부터 거꾸로 올라가며 수업을 리디자인하는 후반부 성찰로 이루어집니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_03.webp" alt="슬라이드 3" class="desktop-image-fix" />

인프라가 있어도 현장에 안착되지 않는 고질적인 문제를 극복하기 위해, 복잡한 기능 조작 교육을 과감히 제거하고 교사들이 마우스 클릭 몇 번만으로 즉각적인 피로 해소와 효능감을 체감할 수 있도록 완전한 자동화 시트를 설계했습니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_04.webp" alt="슬라이드 4" class="desktop-image-fix" />

물은 위에서 아래로 흐르지만, 교사의 혁신은 아래(기록)에서부터 시작해 거꾸로 위(수업 준비)로 올라가야 합니다. 당장 수업 혁신부터 요구하면 변화의 연쇄 반응을 감당하기 힘듭니다. 그러나 학기 말 가장 큰 노동력이 투입되는 '기록'과 '채점' 단계를 AI로 해소해 주면, 교사는 역방향으로 평가 루브릭과 수업 설계를 다시 성찰할 여유를 얻게 됩니다.

---

## 2. 서논술형 AI 채점 파이프라인 매뉴얼 및 가이드

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_05.webp" alt="슬라이드 5" class="desktop-image-fix" />

교내 교사들과 연수용으로 배포한 매뉴얼 화면입니다. 첫 시작은 구글 설문지와 서논술형 채점 기능이 연동된 구글 시트의 템플릿 사본 생성 버튼을 클릭하는 것입니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_06.webp" alt="슬라이드 6" class="desktop-image-fix" />

안내에 따라 구글 시트 템플릿의 '사본 만들기'를 실행하여 개인 드라이브로 가져옵니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_07.webp" alt="슬라이드 7" class="desktop-image-fix" />

생성된 시트 상단의 맞춤형 메뉴인 `[서논술채점기] -> [API 제공자 설정]` 메뉴를 차례대로 클릭합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_08.webp" alt="슬라이드 8" class="desktop-image-fix" />

Apps Script 최초 실행 시 발생하는 승인 요구 팝업에서 '확인' 및 '계속'을 클릭합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_09.webp" alt="슬라이드 9" class="desktop-image-fix" />

구글 계정 권한 요청 화면에서 모든 범위를 허용(선택)한 뒤 계속 진행합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_10.webp" alt="슬라이드 10" class="desktop-image-fix" />

모델 허브 API 공급자인 **오픈라우터(OpenRouter)**를 기본 제공자로 선택한 뒤 설정을 완료합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_11.webp" alt="슬라이드 11" class="desktop-image-fix" />

다음으로 개인 API 인증 키를 귀속하기 위해 `[서논술채점기] -> [API 키 설정]`을 클릭합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_12.webp" alt="슬라이드 12" class="desktop-image-fix" />

교내 정보부에서 사전 발급 및 관리하는 오픈라우터 API 키를 안전하게 입력합니다. 무분별한 토큰 남용을 막기 위해 지정된 학교 메일 도메인으로만 접근할 수 있는 승인 폼을 연결해 두었습니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_13.webp" alt="슬라이드 13" class="desktop-image-fix" />

이어서 채점을 수행할 인공지능 버전을 선택하기 위해 `[서논술채점기] -> [모델 설정]`을 클릭합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_14.webp" alt="슬라이드 14" class="desktop-image-fix" />

채점 작업의 복잡도와 예산에 맞추어 모델을 커스텀 지정합니다. 단순한 동작 테스트나 경량 채점 작업에는 가격이 저렴한 **Gemini 1.5 Flash(UI상 2.5 Flash)**를 권장하고, 정교하고 논리적인 루브릭 평가가 필요할 때는 상위 급인 **Gemini 1.5 Pro(UI상 3.5 Flash 등으로 명명)** 버전을 활용하도록 안내했습니다.

---

## 3. 루브릭 세분화와 채점 결과 발송 자동화

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_15.webp" alt="슬라이드 15" class="desktop-image-fix" />

구글 설문지나 구글 클래스룸을 통해 취합한 학생들의 서논술형 원본 응답 데이터를 스프레드시트의 특정 탭으로 불러옵니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_16.webp" alt="슬라이드 16" class="desktop-image-fix" />

스프레드시트에 응답 로드가 완료되면 메뉴의 `기초세팅` 버튼을 구동합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_17.webp" alt="슬라이드 17" class="desktop-image-fix" />

분석할 설문지의 탭 이름을 입력 창에 명확히 입력해 주면, 분석에 필요한 하위 파이프라인 시트들이 자동으로 동적 생성됩니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_18.webp" alt="슬라이드 18" class="desktop-image-fix" />

생성된 **'채점기준표'**에 교사가 직접 설계한 평가 영역, 성취 기준, 채점 루브릭을 명료하게 구조화하여 써넣습니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_19.webp" alt="슬라이드 19" class="desktop-image-fix" />

루브릭을 다 작성하고 `채점표 생성`을 작동시키면, 학생 명단과 응답 텍스트가 일목요연하게 나열된 메인 채점 공간이 빌드됩니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_20.webp" alt="슬라이드 20" class="desktop-image-fix" />

설문지에 적힌 학생들의 고유 식별 정보와 구글 메일 정보가 연동 테이블 형식으로 정렬된 모습입니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_21.webp" alt="슬라이드 21" class="desktop-image-fix" />

채점하려는 학생들의 행을 체크박스로 선택한 후 `채점 시작`을 누르면 백엔드 Apps Script에서 설정된 API를 통해 AI 연산이 루브릭별로 병렬 실행됩니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_22.webp" alt="슬라이드 22" class="desktop-image-fix" />

평가 루브릭에 의거해 감점된 요인과 그 지적 근거, 그리고 잘한 점에 대한 서술식 피드백이 실시간으로 표출됩니다. AI가 단순히 점수만 주는 것이 아니라 채점 근거를 투명하게 제시함으로써 **'설명가능한 AI(XAI)'**의 가치를 일선 교실에 구현합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_23.webp" alt="슬라이드 23" class="desktop-image-fix" />

만약 AI가 수행한 분석의 정밀도가 아쉽다면, 요구사항 컬럼에 지침(프롬프트)을 추가하여 감점 범위나 가점 조건을 구체화한 뒤 재채점을 구동해 피드백의 질을 지속적으로 튜닝할 수 있습니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_24.webp" alt="슬라이드 24" class="desktop-image-fix" />

교사가 최종적으로 채점 점수와 피드백 문구를 검토 및 수정한 뒤, 이메일 통보 단계인 `[채점결과 안내메시지]`를 작동시킵니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_25.webp" alt="슬라이드 25" class="desktop-image-fix" />

안내 메시지를 발송할 대상을 개별 선택한 후 `[선택 메시지 발송]`을 누르면, 점수 요약표와 서술형 채점 평결문이 개별 학생의 이메일로 즉시 자동 전송됩니다. 이로써 채점과 개인별 결과 피드백이 완전히 끝납니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_26.webp" alt="슬라이드 26" class="desktop-image-fix" />

여기서 멈추지 않고, 학기 말 생기부 기재를 돕기 위한 보조 도구로 `[기록물작성] -> [기록물작성준비]`를 제공합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_27.webp" alt="슬라이드 27" class="desktop-image-fix" />

새로 열린 시트에서 해당 수행평가 중 포착된 학생들의 강점, 역량, 기재 방향에 대한 세부 요구사항을 설정합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_28.webp" alt="슬라이드 28" class="desktop-image-fix" />

`작성시작`을 클릭하면, 설문 응답 내용과 채점표상에 누적된 서술형 피드백을 기반으로 학생부 세특 기록용 기초 텍스트 초안이 자동 완성됩니다. 교사는 이를 검토하고 보정하여 최종 생기부를 기입합니다.

---

## 4. 결과 데이터로부터 수업과 평가 리디자인하기

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_29.webp" alt="슬라이드 29" class="desktop-image-fix" />

이러한 자동화 파이프라인의 종착지는 단순히 일을 편하게 끝내는 행정적 편리성에 그치지 않습니다. 핵심은 마지막 29번 슬라이드에 담긴 **'질문의 역산 체인'**입니다.

- **"의미 있는 기록을 얻기 위해 평가는 어떠해야 했는가?"**
- **"채점이 용이하고 정확하게 작동하기 위해 루브릭은 어떻게 세분화되어야 했는가?"**
- **"그런 좋은 평가를 학생들이 해내기 위해 실제 수업은 어떤 방식으로 배움을 제공해야 했는가?"**

생기부 기록과 채점의 병목을 기술적으로 뚫어줌으로써, 교사는 역으로 자신의 루브릭을 가다듬고, 새로운 서논술형 문항을 설계하며, 궁극적으로 교실 수업의 설계 자체를 능동적으로 재구성(Redesign)할 수 있는 인지적 자원과 동력을 확보하게 됩니다.

---

## 5. 기타 업무 자동화 및 인프라 개선 현황

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_30.webp" alt="슬라이드 30" class="desktop-image-fix" />

기타 아젠다에서는 지난주 마무리했던 수행평가의 피드백과 학교 행정 업무의 실무 개선 유틸리티 배포 결과를 공유합니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_31.webp" alt="슬라이드 31" class="desktop-image-fix" />

지난 수행평가였던 '구글 슬라이드 발표 수행평가'의 최종 통계입니다. 대다수의 학생이 협업 슬라이드 제작과 영상 녹화까지 훌륭하게 수행했으나, 한 학급당 평균 5명 수준의 미제출 혹은 발표 거부 학생이 존재했습니다. 디지털 포용성과 개별 지도 차원에서 이 학습 부진 혹은 불안 학생들을 어떻게 견인할 것인지가 내년도 과제로 남았습니다.

<img src="/posts/attachments/20260627/20260627_%EC%8B%A0%EB%9D%BC%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_32.webp" alt="슬라이드 32" class="desktop-image-fix" />

보안 행정의 실무 자동화 모범 사례입니다. 교육청 지침으로 내려온 개인용 컴퓨터 내의 취약 보안 프로그램(AnySign4PC) 점검 업무를 해결하기 위해, 간단한 윈도우 스크립트 기반의 무설치 실행 프로그램(.exe)을 자체 제작하여 쿨메신저로 전 교사에게 배포했습니다. 

교사가 메신저 안에서 해당 파일을 단 한 번 클릭하면 백엔드에서 프로그램 유무와 최신 버전 업데이트 상태를 즉시 진단하여 구글 폼으로 점검 결과값을 자동 발송해 줍니다. 이로 인해 불필요하게 소모되던 교사들의 정보부 보안 회신 업무 소요 시간을 획기적으로 단축시켰습니다.

---

## 💬 질의응답 (Q&A)

**Q: AI가 분석하고 초안을 잡는 서논술형 채점 결과에 대해 학생들이 거부감을 느끼거나 공정성 시비를 걸지 않나요?**  
**A:**  
- **신라 선생님**: 대놓고 "AI가 채점했으니 그대로 받아들이라"고 발송하지 않습니다. 시스템적으로 AI가 초안을 정교하게 제안하면, 교사가 반드시 눈으로 일일이 재검토하고 부당한 감점이나 엇나간 피드백 문구를 수정한 뒤 발송합니다.
- 오히려 학생들 입장에서는 단순 수치 등급만 띡 통보받는 기존 평가 방식에 비해, 자신이 작성한 어떤 문장에서 감점이 되었고 무엇을 보강해야 하는지 AI 서술 피드백을 통해 촘촘하게 설명받기 때문에 결과의 수용성과 납득도가 훨씬 높았습니다.

**Q: 크롬북이나 태블릿을 교실 수업에서 전면 활용할 때 학생들이 AI를 켜고 에세이를 그대로 복사 및 붙여넣기(Ctrl+C, Ctrl+V) 하는 치팅 행위를 기술적으로 걸러낼 방법이 있을까요?**  
**A:**  
- **백제 선생님**: 현실적으로 100% 무결하게 치팅을 차단하는 기술적 검출기는 존재하지 않습니다. 탐지 솔루션을 우회하는 프롬프트가 매번 우후죽순 나오기 때문입니다. 가장 원칙적이고 강력한 방법은 애플 교실 앱이나 크롬북의 **'Kiosk(시험 모드)'**를 활용해 외부 LLM이나 웹사이트로 접근하는 통로를 네트워크 수준에서 일시 차단하는 제어를 동반하는 것입니다.
- **신라 선생님**: 기술적 제한도 중요하지만, 평가의 본질을 '암기된 결과물 제출'에서 '실시간 교실 내 작성 과정 관찰'로 재설계해야 합니다. 글을 직접 썼다 지우는 타임라인 로그를 구글 문서 히스토리로 확인하거나, 교사의 면대면 질의를 융합하여 평가의 안전망을 짜야 합니다.

---

## 🔗 연관 글
- 백제 선생님의 블로그 글: [LLM-Wiki: 개인 지식 관리(PKM)의 새로운 패러다임](/posts/my-blog/2026-06-27-Baekje-LLM-Wiki-and-Knowledge-Management)
- 백제 선생님의 이전 글: [센스의 철학과 장상호의 순수 교육학으로 바라본 AI 시대의 배움](/posts/my-blog/2026-06-20-Baekje-Sense-Philosophy-and-Pure-Education)
- 신라 선생님의 이전 글: [학교 필수 소프트웨어 정립과 업무 워크플로우 재설계](/posts/my-blog/2026-06-20-Silla-Desktop-Software-and-Workflow-Redesign)
