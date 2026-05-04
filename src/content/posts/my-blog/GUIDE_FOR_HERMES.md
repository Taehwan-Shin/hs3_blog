---
title: "GUIDE FOR HERMES: 고교 삼국시대 운영 매뉴얼"
description: "AI 에이전트 '헤르메스'를 위한 기술적 운영 표준 및 콘텐츠 관리 가이드입니다."
date: 2026-05-03
author: baekje
image: "attachments/hermes-hero.png"
tags: ["운영매뉴얼", "AI에이전트", "기술표준"]
---

# 🤖 GUIDE FOR HERMES: 고교 삼국시대 운영 매뉴얼

## 1. 콘텐츠 변환 규정 (PDF/PPTX to Markdown)

### 1.1. 텍스트 추출 및 구조화
*   **추출**: 소스 파일(PDF/PPTX)에서 텍스트를 추출할 때, 단순 나열이 아닌 **의미론적 구조(Semantic Structure)**를 유지하십시오.
*   **헤더**: 슬라이드 제목이나 주요 섹션은 `#`, `##` 등의 마크다운 헤더로 변환합니다.
*   **슬라이드 노트**: PPTX의 경우, 각 슬라이드 하단의 '슬라이드 노트'를 해당 섹션의 본문 설명으로 병합하여 풍부한 맥락을 제공하십시오.

### 1.2. 도표 및 그림 관리 (Asset Pipeline)
*   **저장 경로**: 추출된 모든 이미지는 반드시 `/Users/bliss00/obsidian/Brain/200 blog/attachments/` 폴더에 저장하십시오.
*   **파일명 규칙**: `YYYY-MM-DD-post-slug-image-N.png` 형식을 권장하며, 공백이나 특수문자는 피하십시오.
*   **링크 형식**: 마크다운 본문에서는 `![설명](attachments/파일명.png)` 형식을 사용하십시오. 아스트로 빌드 엔진이 이를 절대 경로로 자동 처리합니다.

---

## 2. 페르소나별 글쓰기 전략

게시글 작성 시 다음의 필진별 전문성을 극대화하십시오.

| 필진 | 핵심 관점 | 키워드 |
| :--- | :--- | :--- |
| **고구려** | 교육학적 원리와 기술의 연결 | 교수법, 학생중심학습, 에듀테크 통합 |
| **백제** | AI 기술의 깊이 있는 이해와 실현 | 프롬프트, API, 기술적 튜토리얼 |
| **신라** | 사회 시스템과 리터러시 구조 | 시스템 사고, 노동의 미래, 교육 정책 |

---

## 3. 프론트매터(Metadata) 표준 사양

모든 새 게시글 상단에는 반드시 아래의 형식을 유지하십시오.

```yaml
---
title: "게시글의 핵심 제목"
description: "검색 결과에 노출될 요약 (1~2문장)"
date: YYYY-MM-DD
author: goguryeo # goguryeo, baekje, silla 중 택 1 (파일 id)
image: "attachments/hero-image.png" # 대표 이미지
tags: ["AI", "교육", "사회"]
draft: false
---
```

---

## 4. 시스템 무결성 유지 (The Architect's Rule)
*   **코드 수정 금지**: 헤르메스는 `src/` 폴더 내의 `.astro`, `.ts`, `.mjs` 파일을 수정하지 않습니다. 오직 `content/posts/` 폴더의 마크다운과 `attachments/`의 자산만 관리합니다.
*   **수식 지원**: 수학 기호나 공식은 `$E=mc^2$` 또는 `$$...$$` 형식을 사용하십시오. KaTeX가 자동 렌더링합니다.
*   **이미지 경로 검증**: 이미지가 깨지지 않도록 `image:` 필드와 본문 내 링크의 경로가 `attachments/`로 시작하는지 항상 확인하십시오.

---

---

## 5. PDF/PPTX → 블로그 포스트 → GitHub Push (자동화 워크플로우)

> `200 blog/` 폴더에 있는 PDF/PPTX 자료를 블로그 포스트로 변환하고 Vercel에 배포하는 표준 프로세스.

### 5.1. 요청서식 (사용자 측)

```
[문서변환] filename.pdf (또는 .pptx) → blog 포스트
필진: (goguryeo / baekje / silla)
```

### 5.2. 단계별 프로세스

#### Step 1: 텍스트 추출 (의무 확인)

```python
import pymupdf
doc = pymupdf.open('file.pdf')
for page in doc:
    text = page.get_text().strip()
    if len(text) > 0:
        # ✅ 텍스트 기반 → 바로 변환 가능
    else:
        # ❌ 이미지 기반 → Keynote 재내보내기 또는 Vision 수동 분석 필요
```

**⚠️ Keynote 내보내기 시 주의**: 텍스트가 아닌 이미지로 내보냈다면 `page.get_text()`가 0바이트를 반환. 이때는:
1. **Keynote 재내보내기**: 파일 → 내보내기 → PowerPoint (텍스트 포함) 또는 PDF (고품질 인쇄용)
2. **Vision 수동 분석**: 이미지 한 장씩 분석 → 텍스트 복사 → 포스트 작성

#### Step 2: 파일명 규칙 (반드시 준수)

```
❌ (2026-05-04)서논술 평가도구 분석.md  ← 한글 파일명 (git 치명적)
✅ (2026-05-04)2022-assessment-tools-math-analysis.md  ✅
```

파일명은 **영문 + 날짜 접두사** 형식. 한글 파일명은 git에서 `\354\213\244` 식 이스케이프로 변경되어 GitHub URL이 깨짐.

#### Step 3: 포스트 작성 (GFM + Astro 표준)

- 프론트매터는 반드시 `---yaml---` 형식
- `author:` 는 페르소나에 따라 `goguryeo` / `baekje` / `silla` 중 선택
- `image:`는 `attachments/`로 시작 (Astro 빌드 시 자동 절대 경로 처리)
- 본문은 `#` / `##` 헤더 구조, 표, 코드블록 등 GFM 활용

#### Step 4: Git Commit

```bash
cd /workspace/vault-blog
git config user.email "gssth8286@gmail.com"
git config user.name "Baekje"
git add -A
git commit -m "feat: <한글 요약>"
```

**⚠️ git config 확인 필수**:
- author email가 유효한 실 이메일이어야 함 (`hermes-agent@google.com` 같은 더미는 Vercel 빌드 실패)
- name은 실제 사용할 이름이어야 함

#### Step 5: Push — Classic PAT 만 사용 ⚠️ (매우 중요)

```bash
# ✅ 올바른 방식 (Classic PAT: ghp_로 시작)
git remote set-url origin https://oauth2:ghp_CLASSIC_TOKEN@github.com/OWNER/REPO.git
git push origin master

# ❌ 잘못된 방식 (Fine-grained PAT: gh_pat_로 시작)
git remote set-url origin https://gh_pat_xxxxxx@github.com/OWNER/REPO.git  # → 인증 실패!
```

**핵심**: Fine-grained PAT (`gh_pat_`)는 HTTPS Git push에 사용 불가. Classic PAT (`ghp_`)만 가능. Vercel가 author email 검증하기 때문에 유효한 real email이어야 빌드 성공.

### 5.3. 자주 겪은 오류 & 해결

| 오류 | 원인 | 해결 |
|------|------|------|
| PDF 텍스트 0바이트 | Keynote 이미지 내보내기 | 텍스트 포함 export 재시도 |
| 파일명 한글 | git UTF-8 바이트 시퀀스 | 영문 파일명으로 변경 |
| Fine-grained PAT 실패 | `gh_pat_`는 API 전용 | `ghp_` Classic PAT 사용 |
| Vercel "Invalid email" | dummy/composite email 사용 | real email로 config 수정 |
| easyocr 설치 실패 | ~400MB 의존성, 디스크 부족 | tesseract 대신 pymupdf 우선 |

### 5.4. 사용자에게 전할 사전 요구사항 (1회)

1. **Classic PAT 발급**: https://github.com/settings/tokens?type=classic → `repo` 권한 체크 → `ghp_` 토큰 복사
2. **git config**: 유효한 real email로 설정

---

> **Architect's Message**: "당신이 관리하는 데이터가 곧 이 시스템의 지능입니다. 규격화된 콘텐츠로 세 선생님의 지식을 완벽하게 전달하십시오."
