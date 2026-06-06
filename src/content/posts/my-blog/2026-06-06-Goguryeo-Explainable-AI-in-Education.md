---
title: "AI 채점의 블랙박스와 설명가능한 AI(XAI-ED)"
description: "AI 수행평가 채점의 불안감을 극복하기 위한 '검토 가능한 투명성' 설계와 교사 판단 보존 하네스(Harness) 시스템 도입"
date: 2026-06-06
author: "goguryeo"
tags: ["XAI-ED", "설명가능한AI", "평가하네스", "수행평가채점", "개인정보보호"]
image: "/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_01.webp"
category: "my-blog"
---

# 📊 AI 채점의 블랙박스와 설명가능한 AI(XAI-ED)

안녕하세요, 고구려입니다.

지난 발표에 이어 오늘 저는 AI를 활용해 실제 수행평가 채점을 진행하며 맞닥뜨린 생생한 고민과 기술적 돌파구를 나누고자 합니다. 

기술을 도입하면서 "와, 채점이 정말 편하다"라고 감탄하는 동시에, 마음 한편에 찾아오는 이상한 불안감의 실체를 추적하고, 이를 극복하기 위한 '교육용 설명가능한 AI(XAI-ED)' 설계 모델을 제안해 드립니다.

---

## 📑 목차
1. **출발점**: 채점의 편함과 불안함 사이
2. **핵심 갈등**: 투명성과 자동화의 딜레마
3. **해법**: 검토 가능한 투명성(XAI-ED)의 5대 요소
4. **시스템 구조**: 절차 나누기와 교사 판단 보존 하네스(Harness)
5. **개인정보 대책**: 로컬 연산과 PII 가명화 매핑

---

## 1. 출발점: 채점의 편함과 불안함 사이

<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_01.webp" alt="슬라이드 1" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_02.webp" alt="슬라이드 2" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_03.webp" alt="슬라이드 3" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_04.webp" alt="슬라이드 4" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_05.webp" alt="슬라이드 5" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_06.webp" alt="슬라이드 6" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_07.webp" alt="슬라이드 7" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_08.webp" alt="슬라이드 8" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_09.webp" alt="슬라이드 9" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_10.webp" alt="슬라이드 10" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_11.webp" alt="슬라이드 11" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_12.webp" alt="슬라이드 12" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_13.webp" alt="슬라이드 13" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_14.webp" alt="슬라이드 14" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_15.webp" alt="슬라이드 15" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_16.webp" alt="슬라이드 16" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_17.webp" alt="슬라이드 17" class="desktop-image-fix" />

저는 이번에 지난 5월 29일에 치러진 1학년 대수 수행평가 채점에 AI 파이프라인을 직접 도입해 활용해 보았습니다. 

빅쿼리(BigQuery) 프로젝트를 통해 수합한 학생들의 구글 문서 텍스트 데이터를 추출하여, 미리 약속한 채점 루브릭과 AI 프롬프트 틀에 밀어 넣었습니다. 

AI가 점수를 척척 계산해 내고 세부 피드백을 단 몇 초 만에 생성하는 것을 보며 '정말 편하다'는 감정이 드는 것과 거의 동시에, 무척 기이한 불안감이 엄습하기 시작했습니다. 

바로 **"이 기계가 과연 학생의 글을 제대로 읽고 채점한 것이 맞나?"** 하는 의구심이었습니다.

---

## 2. 핵심 갈등: 투명성과 자동화의 딜레마

<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_18.webp" alt="슬라이드 18" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_19.webp" alt="슬라이드 19" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_20.webp" alt="슬라이드 20" class="desktop-image-fix" />

우리가 흔히 범하는 실책은 AI 채점 시스템을 블랙박스 형태로 운영하는 데 있습니다. 

* **과정이 전혀 보이지 않으면**: AI에게 모든 권한을 위임하니 교사 입장에선 편할 수 있으나, 학생의 기회와 진로에 중대한 영향을 주는 평가의 세부 판단 근거를 알 길이 없어 신뢰도가 급격히 하락합니다.
* **과정을 전부 다 공개하면**: 모든 판단 로그를 일목요연하게 띄워주니 교사는 안심하겠지만, 교사가 결국 학생들의 글과 로그를 처음부터 끝까지 다 대조하며 다시 읽어봐야 하므로, 굳이 자동화를 시도한 목적과 가치가 완전히 상실됩니다.

우리가 도달해야 할 타협점은 100% 완전 투명성이 아닙니다. 교사의 한정된 에너지를 효과적으로 안배하여 전문적 의사결정을 지원하는 **'검토 가능한 수준의 투명성'**입니다.

---

## 3. 해법: 검토 가능한 투명성(XAI-ED)의 5대 요소

<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_21.webp" alt="슬라이드 21" class="desktop-image-fix" />

이러한 문제의식을 바탕으로, 교육 분야에서 부각되고 있는 **'설명가능한 교육용 인공지능(XAI-ED)'** 프레임워크를 분석하여 실제 채점 대시보드 화면에 다음 5가지 핵심 요소를 반드시 포함하도록 설계했습니다.

1. **적용된 채점 기준**: AI가 해당 항목을 채점할 때 참조한 고정 루브릭 조항 표시.
2. **읽은 학생 텍스트**: 전체 학생 답안 중 AI가 판단의 근거로 실질적으로 스캔한 특정 영역을 보여주어 누락이나 오독을 예방.
3. **근거 문장**: 점수 부여 및 정성 피드백을 도출해 낸 학생 본문 내의 실제 텍스트 출처 하이라이트.
4. **불확실성 지표**: AI 스스로 판단의 애매함을 인지하는 신뢰도(Confidence Score) 지표를 제공하여 신뢰도가 낮을 경우 교사에게 즉각 알림.
5. **확인 필요 지점**: AI가 채점 도중 오류를 의심한 영역을 교사 승인 및 수정 대상판으로 격상하여 교사의 시간 집중.

---

## 4. 시스템 구조: 절차 나누기와 교사 판단 보존 하네스(Harness)

<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_22.webp" alt="슬라이드 22" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_23.webp" alt="슬라이드 23" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_24.webp" alt="슬라이드 24" class="desktop-image-fix" />

좋은 에이전트는 결코 처음부터 끝까지 혼자 알아서 해치우는 형태가 될 수 없습니다. 

전체 프로세스의 각 단계를 잘게 쪼개고, 매 단계마다 상태 전이(State)를 기록하여 교사가 점검할 수 있는 **'Trace' 구조**를 띠어야 합니다.

이에 따라 채점 시스템은 다음과 같이 4단계로 나누어 조립하여 구동합니다.
* **1단계**: 학생 답안 데이터를 수집하고 안내 문구를 필터링하여 순수 텍스트만 추출.
* **2단계**: 조립된 고정 지식 DB(전체 루브릭, Few-shot 예시 풀)를 호출하여 AI에게 검토를 요구.
* **3단계**: AI가 분류한 결과와 하이라이트된 근거 문장을 기반으로 점수 피드백 초안 작성.
* **4단계**: AI가 메타적으로 점검해 판단 신뢰도가 낮거나 오독 가능성이 포착된 이상 학생만을 교사가 재검토하여 최종 승인.

우리가 지향해야 할 도구의 정체성은 단순한 자동화 채점기가 아닙니다. 교사의 숭고한 판단 기준을 온전히 저장하고, 재사용하고, 객관적으로 검증할 수 있도록 단단히 동여매는 **'교사 판단 보존 하네스(Harness)'**가 되어야 합니다.

---

## 5. 개인정보 대책: 로컬 연산과 PII 가명화 매핑

<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_25.webp" alt="슬라이드 25" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_26.webp" alt="슬라이드 26" class="desktop-image-fix" />
<img src="/posts/attachments/20260606/20260606%20%EA%B3%A0%EA%B5%AC%EB%A0%A4%20%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_slide_27.webp" alt="슬라이드 27" class="desktop-image-fix" />

이 채점 플로우의 마지막 관문은 개인정보 보호 기조(PII)의 확보였습니다. 

학생의 소중한 인적 인프라가 클라우드 API를 타고 국외 서버로 유출될 위험이 있으므로, 데이터 파이프라인을 두 개의 레이어로 엄격히 차단했습니다.

* **로컬 보안 구역 (파이썬 스크립트 실행)**:
  학교 결제 계정에 연동된 내부 PC에서 구글 드라이브로부터 추출한 파일들의 원본 식별 키와 실제 학생 이름 정보를 해제하고, 대신 난수화된 임시 ID(`학생_001`, `학생_002` 등)로 대체하는 가명화 매핑 맵을 메모리상에만 생성합니다.
* **외부 통신 구역 (OpenAI/Gemini API 등)**:
  가명화 처리와 민감 정보(주민번호, 학적 정보 등) 마스킹이 끝난 순수 답안 텍스트만을 조립된 JSON 데이터 셋 형태로 넘겨주어 루브릭 조건 충족 여부(Y/N)만 분류해 오도록 합니다.

최종 계산 및 가명 처리된 난수 ID를 실제 이름으로 병합하는 역맵핑(De-anonymization) 과정은 통신이 거세된 로컬 파이썬 코드 안에서만 안전하게 실행되므로, 해외 리전 활용이나 프라이버시 침해 이슈로부터 완벽하게 자유로워질 수 있었습니다.

설명가능하고(XAI), 안전하며, 교사의 통제력(Harness)을 전제로 작동하는 차세대 평가 체계를 공교육에 더 굳건히 심어나가겠습니다. 감사합니다.

---

## 💬 질의응답 (Q&A)

**Q: AI가 채점 과정에서 범하는 대표적인 '잘못된 설명의 함정'이나 오역의 구체적인 예시가 있나요?**  
**A:** 예컨대, 대수 수행평가에서 수학적 수식을 입력할 때 특수 문자나 LaTeX 문법으로 입력한 구간이 텍스트 파싱 과정에서 깨져 누락되는 일이 종종 있었습니다. 이 경우 AI는 "학생이 해당 수학적 수식을 미기재했다"라고 판단하여 대수분석 점수를 부당하게 감점하고 그럴듯한 이유를 사후에 그럴싸하게 꾸며냅니다. 이것이 '사후 정당화(Post-hoc) 함정'입니다. 저희가 만든 하네스 도구에서는 이러한 이상 탐지 및 누락 가능성을 메타 룰에 의해 교사에게 '확인 필요'로 보고하므로, 교사가 원본 구글 문서를 한 번 더 클릭하여 검증하고 오류를 바로잡을 수 있었습니다.

**Q: 구글 앱스 스크립트(GAS)를 쓰지 않고 파이썬 로컬 코드로 돌린 것의 이점은 무엇인가요?**  
**A:** GAS는 구글 클라우드 인프라 제한상 1회 실행 시간이 최대 30분으로 한정되어 있습니다. 채점 대상이 수백 명에 달하면 연산 속도가 느려 도중에 강제 중단되므로 여러 번 트리거를 돌려야 하는 행정 번거로움이 있었습니다. 반면 로컬 PC에서 파이썬과 GPT-4o-mini API를 조율하여 구동하자 전체 300명이 넘는 학생의 채점과 피드백 피처 처리가 10분도 걸리지 않고 훨씬 안전하고 신속하게 마무리되었습니다.

---

## 🔗 연관 글
- 백제 선생님의 블로그 글: [AI 시대, 효율보다 '의미'를 남기는 질문의 힘](/posts/my-blog/2026-06-06-Baekje-Homo-Ludens-and-Human-Edge)
- 신라 선생님의 블로그 글: [로컬 에이전트 구축과 학교 시스템 리디자인](/posts/my-blog/2026-06-06-Silla-DGX-Spark-and-Flow-Design)
- 고구려 선생님의 이전 글: [AI 시대의 역량 평가와 수학적 비계(Scaffolding) 설정](/posts/my-blog/2026-05-29-Goguryeo-AI-Scaffolding-in-Mathematics)
