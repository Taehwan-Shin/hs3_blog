---
title: "GUIDE FOR HERMES: 고교 삼국시대 운영 매뉴얼"
description: "AI 에이전트 '헤르메스'를 위한 기술적 운영 표준 및 콘텐츠 관리 가이드입니다."
date: 2026-05-09
author: baekje
image: "attachments/hermes-hero.png"
tags: ["운영매뉴얼", "AI에이전트", "기술표준"]
---

# 🤖 GUIDE FOR HERMES: 고교 삼국시대 운영 매뉴얼

... (기존 내용 유지) ...

---

## 8. AI 영상 제작 파이프라인 (Video Production)

> **트리거 조건**: 사용자가 "영상 만들어줘" 또는 "쇼츠 제작해줘"라고 지시하면 **'안티그래비티 표준 워크플로우'**를 사용하여 영상을 생성하십시오.

### 8.1. 기술적 요건 (Prerequisites)
아래 도구들이 환경에 세팅되어 있어야 합니다. (Antigravity가 이미 설치 완료함)
- **Node.js**: `hyperframes`
- **Python**: `edge-tts`, `faster-whisper`, `ffmpeg`

### 8.2. 단계 1: 소스 분석 및 대본(JSON) 생성
1.  제공된 PDF나 텍스트에서 핵심 내용을 추출하여 5~6개 내외의 씬(Scene)으로 구성합니다.
2.  아래 형식의 `script.json` 파일을 작업 폴더에 생성합니다.
    ```json
    {
      "scenes": [
        { "text": "첫 번째 씬 내레이션 내용..." },
        { "text": "두 번째 씬 내레이션 내용..." }
      ]
    }
    ```

### 8.3. 단계 2: 오디오 및 타이밍 자동 생성
마스터 자동화 스크립트를 실행하여 TTS 음성과 단어별 타임스탬프를 추출합니다.

```bash
cd "/Users/bliss00/Library/CloudStorage/GoogleDrive-gssth8286@gmail.com/내 드라이브/movie/video-use"
uv run python3 generate_video.py --script [경로/script.json] --output [결과폴더]
```

- **표준 음성**: `ko-KR-SunHiNeural` (스크립트 내 기본값)
- **결과물**: `sceneN.mp3` (음성) 및 `sceneN.json` (단어 단위 타임스탬프)

### 8.4. 단계 3: 템플릿 적용 및 렌더링
1.  `/Users/bliss00/Library/CloudStorage/GoogleDrive-gssth8286@gmail.com/내 드라이브/movie/templates/antigravity_standard/` 의 `template.html`을 복사합니다.
2.  생성된 JSON 타이밍 데이터를 HTML의 CSS 애니메이션 `delay` 값에 매핑합니다.
3.  **Hyperframes**로 최종 렌더링합니다.
    ```bash
    npx hyperframes render [작업폴더] -o final_video.mp4
    ```

### 8.5. 안티그래비티 표준 스타일 가이드
- **BGM**: 재즈 피아노 (볼륨 15%)
- **배경**: 파스텔톤 일러스트 + 켄 번즈 무빙
- **편집**: 0.6초 이내의 빠른 장면 전환, 오디오 공백 최소화

### 8.6. 이미지 생성 기반 배경 처리 (AI Image Backgrounds)
Hermes는 각 씬의 내용에 맞는 배경 이미지를 스스로 생성하여 영상의 퀄리티를 높일 수 있습니다.

1.  **프롬프트 작성**: 각 씬의 `text`를 바탕으로 시각적 프롬프트를 생성합니다. 
    - **표준 스타일 접미사**: `... in soft minimalist pastel illustration style, warm lighting, high quality, 16:9 aspect ratio`
2.  **이미지 생성**: `sketch` 또는 `generate_image` 도구를 사용하여 각 씬에 대응하는 이미지를 생성합니다.
3.  **파일명 규격**: 생성된 이미지는 반드시 `s1.png`, `s2.png` ... 형식으로 작업 폴더에 저장하십시오.
    - `template.html`이 이 파일명들을 자동으로 참조하도록 설계되어 있습니다.

---

> **Architect's Message**: "당신이 관리하는 데이터가 곧 이 시스템의 지능입니다. 규격화된 콘텐츠로 세 선생님의 지식을 완벽하게 전달하십시오."

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

## 5. 블로그 게시 워크플로우 (End-to-End Deployment)

> **트리거 조건**: 사용자가 "블로그 업무" 또는 "새 글 올려줘"라고 지시하면 아래 단계를 순서대로 실행하십시오.

### 5.0. 사전 준비 (최초 1회)

아래 Python 라이브러리가 설치되어 있는지 확인하십시오. 없으면 설치합니다.

```bash
pip3 install python-pptx PyMuPDF Pillow
```

- `python-pptx`: PPTX 파일에서 텍스트와 이미지를 추출
- `PyMuPDF (fitz)`: PDF 파일에서 텍스트와 이미지를 추출
- `Pillow`: 이미지 포맷 변환 및 저장

설치 확인:
```bash
python3 -c "import pptx; import fitz; from PIL import Image; print('✅ 모든 라이브러리 정상')"
```

### 5.1. 단계 1: 새 파일 감지

**소스 폴더**: `/Users/bliss00/obsidian/Brain/200 blog/`

```bash
# PDF 및 PPTX 파일 목록 확인
ls /Users/bliss00/obsidian/Brain/200\ blog/*.pdf /Users/bliss00/obsidian/Brain/200\ blog/*.pptx 2>/dev/null
```

- 새 PDF/PPTX 파일이 있는지 확인합니다.
- 이미 같은 이름의 `.md` 파일이 존재하면 **이미 변환 완료된 것**이므로 건너뜁니다.
- 새 파일이 없으면 사용자에게 "새로 들어온 파일이 없습니다"라고 보고하고 종료합니다.

### 5.2. 단계 2: 콘텐츠 변환 (PDF/PPTX → Markdown)

#### PPTX 변환 절차
1.  `python-pptx`로 각 슬라이드의 **제목**, **본문 텍스트**, **슬라이드 노트**를 추출합니다.
2.  각 슬라이드에 포함된 **이미지를 추출**하여 `attachments/` 폴더에 저장합니다.
3.  슬라이드 순서대로 마크다운 구조(`## 슬라이드 제목` → 본문 → 이미지 링크)를 구성합니다.

#### PDF 변환 절차
1.  `PyMuPDF (fitz)`로 각 페이지의 **텍스트**를 추출합니다.
2.  각 페이지에 포함된 **이미지를 추출**하여 `attachments/` 폴더에 저장합니다.
3.  페이지 순서대로 마크다운 구조를 구성합니다.

#### 이미지 저장 규칙
-  **저장 위치**: `/Users/bliss00/obsidian/Brain/200 blog/attachments/`
-  **파일명**: `YYYY-MM-DD-post-slug-image-N.png` (공백, 특수문자 금지)
-  **본문 링크**: `![설명](attachments/파일명.png)`

#### 프론트매터 작성
변환된 마크다운 파일 최상단에 반드시 아래 형식을 추가합니다:

```yaml
---
title: "원본 파일에서 추출한 제목"
description: "핵심 내용 요약 1~2문장"
date: YYYY-MM-DD  # 오늘 날짜
author: baekje     # goguryeo, baekje, silla 중 택 1
tags: ["관련태그1", "관련태그2"]
draft: false
---
```

#### 저장 위치
- 완성된 `.md` 파일을 `/Users/bliss00/obsidian/Brain/200 blog/` 에 저장합니다.
- 파일명은 원본과 동일한 이름(확장자만 `.md`)으로 합니다.
  - 예: `구글시트_활용법.pptx` → `구글시트_활용법.md`

### 5.3. 단계 3: 블로그 저장소에 동기화

```bash
# 1. vault-blog 저장소로 이동하지 않고 sync.sh 실행
cd /Users/bliss00/obsidian/vault-blog && ./sync.sh
```

`sync.sh`가 `/Users/bliss00/obsidian/Brain/200 blog/` 전체를 `vault-blog/src/content/posts/my-blog/`로 복사합니다.

### 5.4. 단계 4: 이미지 최적화

```bash
cd /Users/bliss00/obsidian/vault-blog && node scripts/sync-images.js
```

이 스크립트가 PNG/JPEG 이미지를 **WebP 형식으로 자동 변환**하여 `public/` 폴더에 배치합니다.

### 5.5. 단계 5: Git 커밋 및 푸시

```bash
cd /Users/bliss00/obsidian/vault-blog
git add .
git commit -m "Add new post: [게시글 제목]"
git push origin master
```

> ⚠️ **중요**: 커밋 작성자 정보가 반드시 아래와 같아야 합니다. 다르면 Vercel이 배포를 거부합니다.
> - `user.name`: `Taehwan-Shin`
> - `user.email`: `gssth8286@gmail.com`

확인 명령: `git config user.email`

### 5.6. 단계 6: 배포 확인

- 푸시 후 약 **1~2분** 뒤에 Vercel이 자동으로 새 버전을 빌드하여 배포합니다.
- 배포 완료 확인: `https://hs3.kr` 에서 새 게시글이 보이는지 확인합니다.

---

## 6. 트러블슈팅 (문제 발생 시 대응)

### 6.1. `git push`가 실패하는 경우

| 증상 | 원인 | 해결 |
|------|------|------|
| `Authentication failed` | macOS 키체인의 GitHub 토큰 만료 | 사용자에게 "GitHub 인증이 만료되었습니다. 터미널에서 `git push origin master`를 직접 실행하여 재인증해주세요"라고 안내 |
| `rejected (non-fast-forward)` | 원격 저장소에 로컬에 없는 커밋 존재 | `git pull --rebase origin master` 후 다시 push |
| `Deployment Blocked` (Vercel) | 커밋 이메일이 유효하지 않음 | `git config user.email "gssth8286@gmail.com"` 설정 후 `git commit --amend --reset-author --no-edit` |

### 6.2. 이미지 추출이 실패하는 경우

| 증상 | 원인 | 해결 |
|------|------|------|
| `ModuleNotFoundError: No module named 'pptx'` | python-pptx 미설치 | `pip3 install python-pptx` |
| `ModuleNotFoundError: No module named 'fitz'` | PyMuPDF 미설치 | `pip3 install PyMuPDF` |
| PDF에서 이미지가 추출되지 않음 | PDF가 스캔본(이미지 기반) | 페이지 전체를 이미지로 렌더링: `fitz.open(pdf).load_page(n).get_pixmap()` 사용 |

### 6.3. Vercel 배포가 자동 트리거되지 않는 경우

GitHub-Vercel 웹훅이 끊어졌을 수 있습니다. 다음 명령으로 **CLI 직접 배포**를 수행하십시오:

```bash
cd /Users/bliss00/obsidian/vault-blog
npm run build
npx vercel --prod --yes
```

### 6.4. 블로그에 이미지가 깨져 보이는 경우

-  원인: `sync-images.js`가 PNG/JPEG를 WebP로 변환하지만, 마크다운에서 `.png`로 링크했을 때 발생
-  해결: 마크다운 본문에서는 **원본 확장자(`.png`, `.jpeg`)를 그대로 사용**하십시오. Astro 빌드 엔진이 자동으로 WebP 버전을 서빙합니다.

---

## 7. 전체 워크플로우 요약 (Quick Reference)

```
[사용자 지시] → [새 파일 감지] → [PDF/PPTX → MD 변환]
    → [attachments/ 에 이미지 저장] → [sync.sh 실행]
    → [sync-images.js 실행] → [git add/commit/push]
    → [Vercel 자동 배포] → [hs3.kr 에서 확인]
```

---

> **Architect's Message**: "당신이 관리하는 데이터가 곧 이 시스템의 지능입니다. 규격화된 콘텐츠로 세 선생님의 지식을 완벽하게 전달하십시오."
