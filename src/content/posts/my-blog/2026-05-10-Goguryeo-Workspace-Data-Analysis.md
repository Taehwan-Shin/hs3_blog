---
title: "데이터로 읽는 학교, 분석으로 돕는 교사"
description: "구글 클라우드와 BigQuery를 활용한 학습 이력 분석 및 교무 행정 자동화 실험"
pubDate: 2026-05-10
author: "goguryeo"
tags: ["데이터분석", "BigQuery", "GCP", "교무행정자동화"]
image: "attachments/20260509/20260509%20고구려%20발표자료_slide_01.png"
category: "my-blog"
---

# 📊 데이터로 읽는 학교, 분석으로 돕는 교사

안녕하세요, '고교 삼국시대' 세미나의 고구려입니다. 오늘은 학교 현장에서 생성되는 방대한 데이터를 어떻게 관리하고, 이를 통해 교육적 통찰을 얻을 수 있을지에 대한 저의 실험 과정을 공유하겠습니다.

---

## 📑 목차
1. **데이터 수집 인프라 구축**: 워크스페이스 분석의 시작
2. **클라우드 연동과 파이프라인**: 180일의 한계 극복
3. **데이터 정제와 마트화**: AI가 이해하기 쉬운 구조 만들기
4. **결과 활용 및 자동화 모색**: 현장 교사 연수와 한계점

---

## 1. 데이터 수집 인프라 구축: 워크스페이스 분석의 시작

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_01.png" alt="슬라이드 1" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_02.png" alt="슬라이드 2" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_03.png" alt="슬라이드 3" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_04.png" alt="슬라이드 4" class="rounded-lg shadow-md hover-zoom" />
</div>

구글 클라우드와 제미나이(Gemini), 그리고 BigQuery를 활용하여 학교의 다양한 데이터를 끌어오고 분석하는 작업을 시작했습니다. 자동화가 우리에게 어떤 이점을 줄 수 있을지 기대 반, 두려움 반으로 접근했습니다.

현재 클래스룸에 있는 과제와 문서들을 분석하기 위해 데이터 수집을 시작했고, 오픈 코드를 통해 약 <b><span class="highlight-text">96% 정도 수집이 완료</span></b>된 상태입니다.

특히 중요한 포인트는 구글 워크스페이스 클라우드에 <b>로그가 180일까지만 저장</b>된다는 점입니다. 누적된 데이터를 장기적으로 분석하려면 반드시 <b>BigQuery 연동 기능을 미리 활성화</b>해 두어야 합니다.

실제로 추출한 클래스룸 데이터 원본은 <b><span class="highlight-text">헤더가 엄청나게 많고 복잡</span></b>하여 그대로 사용하기엔 무리가 있습니다. 따라서 필요한 핵심 정보만을 정제하는 파이프라인 구축이 필수적입니다.

---

## 2. 데이터 정제와 마트화: AI가 이해하기 쉬운 구조 만들기

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_05.png" alt="슬라이드 5" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_06.png" alt="슬라이드 6" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_07.png" alt="슬라이드 7" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_08.png" alt="슬라이드 8" class="rounded-lg shadow-md hover-zoom" />
</div>

단순히 문서의 텍스트만 가져오는 것이 아닙니다. 학생들의 <b>문서 수정 횟수나 복사 붙여넣기 횟수</b> 같은 정량적인 데이터까지 모두 추출하도록 AI에게 요청했습니다. 

처리할 데이터의 양이 워낙 방대하다 보니, AI 에이전트가 스스로 판단하여 PowerShell 기반의 <b><span class="highlight-text">병렬 처리 코드</span></b>를 생성하고 실행하도록 했습니다. 덕분에 작업 시간이 획기적으로 단축되었습니다.

여기서 핵심 개념은 바로 <b>'데이터 마트(Data Mart)'</b>입니다. 원천 데이터를 AI가 즉각적으로 이해하고 꺼내 쓸 수 있도록 중간 테이블 형태로 정비하는 과정입니다.

로컬 PC에 저장된 CSV 파일은 엑셀에서 한글 인코딩 문제가 발생할 수 있지만, 메모장이나 파이썬 환경의 <b><span class="highlight-text">텍스트 에디터에서는 데이터가 완벽하게 보존</span></b>됩니다.

---

## 3. 결과 활용 및 상세 분석

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_09.png" alt="슬라이드 9" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_10.png" alt="슬라이드 10" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_11.png" alt="슬라이드 11" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_12.png" alt="슬라이드 12" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_13.png" alt="슬라이드 13" class="rounded-lg shadow-md hover-zoom" />
</div>

데이터 안에는 클래스룸 ID와 문서 ID가 모두 매핑되어 있어, <b>App Script 호출 시 별도의 검색 없이 즉시 활용</b>이 가능합니다. 

특히 <b><span class="highlight-text">73원이라는 매우 저렴한 비용</span></b>으로 대규모 데이터 분석을 수행할 수 있다는 점은 현장 적용 가능성을 시사합니다.

학생의 수행평가 참여도를 분석할 때, 교사의 피드백 이후 학생의 수정 과정을 추적하는 <b>'피드백 루프(Feedback Loop)'</b> 분석은 과정 중심 평가의 핵심적인 데이터가 됩니다. 

또한, 구글 드라이브 API를 통해 <b><span class="highlight-text">문서 작성 소요 시간이나 접속 이력을 추적</span></b>함으로써, 학생들의 실제 학습 패턴을 더욱 정교하게 파악할 수 있습니다.

---

## 4. 자동화 모색과 현장의 과제

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_14.png" alt="슬라이드 14" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_15.png" alt="슬라이드 15" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_16.png" alt="슬라이드 16" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_17.png" alt="슬라이드 17" class="rounded-lg shadow-md hover-zoom" />
  <img src="attachments/20260509/20260509%20고구려%20발표자료_slide_18.png" alt="슬라이드 18" class="rounded-lg shadow-md hover-zoom" />
</div>

보안 이슈가 걱정된다면 <b><span class="highlight-text">로컬 AI 서버 환경</span></b>을 구축하여 데이터를 안전하게 관리하는 대안을 고려해볼 수 있습니다. 

정리된 데이터를 기반으로 <b>생활기록부 초안을 자동 생성</b>하는 워크플로우를 준비하고 있으며, 이를 직관적으로 확인할 수 있는 <b>대시보드 솔루션</b> 또한 구상 중입니다.

최근 교내 연수를 통해 이러한 기술을 소개했는데, 많은 선생님들께서 데이터 분석의 필요성에는 공감하셨지만 <b>검은색 터미널 창(CLI)에 대한 심리적 두려움</b>이 크다는 사실을 확인했습니다. 

결국 현장의 확산을 위해서는 <b>안티그래비티와 같이 직관적이고 쉬운 GUI 에이전트</b>가 필수적임을 다시금 느꼈습니다. 감사합니다.

---

## 🔗 연관 글
- 메인 세미나: [[20260509_고교삼국시대_세미나]]
- 백제 선생님의 블로그 글: [[2026-05-10-Baekje-AI-Generalization]]
- 신라 선생님의 블로그 글: [[2026-05-10-Silla-Magic-of-AI-Agents]]
