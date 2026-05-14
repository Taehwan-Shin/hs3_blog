---
title: "Hermes Agent: 시스템 접근권이 있는 자율 에이전트 활용 가이드"
description: "Hermes Agent의 아키텍처부터 고급 활용 전략, 실무 자동화 워크플로우까지 총망라한 마스터 가이드"
date: 2026-04-29
author: baekje
image: "/posts/attachments/hermes-hero.webp"
tags: ["AI", "Hermes Agent", "자동화", "기술가이드"]
---

이 가이드는 [[200 blog/readme|고교 삼국시대 운영 지침]]에 따라 작성되었습니다.

# Hermes Agent — 최고 수준의 활용 가이드

> **작성일:** 2026-04-29  
> **대상:** Hermes Agent를 효과적으로 활용하고 싶은 모든 사용자  
> **핵심 메시지:** Hermes는 채팅봇이 아닌 **시스템 접근권이 있는 자율 에이전트**입니다. 이 보고서는 그 잠재력을 최대한 끌어내는 방법을 다룹니다.

---

## 목차

1. [Hermes Agent란 무엇인가](#1-hermes-agent란-무엇인가)
2. [아키텍처와 핵심 개념](#2-아키텍처와-핵심-개념)
3. [기본 활용법](#3-기본-활용법)
4. [심층 활용 전략](#4-심층-활용-전략)
5. [스ILLS 시스템 — 지능의 축적](#5-skills-시스템--지능의-축적)
6. [하이라이트 — 수준 높은 고급 활용법](#6-하이라이트--수준-높은-고급-활용법)
7. [최신 스킬 카테고리 매핑](#7-최신-스킬-카테고리-매핑)
8. [실무 자동화 워크플로우](#8-실무-자동화-워크플로우)
9. [프롬프트 작성 법칙](#9-프롬프트-작성-법칙)
10. [트러블슈팅 & 팁](#10-트러블슈팅--팁)

---

## 1. Hermes Agent란 무엇인가

Hermes Agent는 [Nous Research](https://github.com/NousResearch/hermes-agent)에서 개발한 **오픈소스 AI 에이전트 프레임워크**입니다. Claude Code, OpenAI Codex, OpenClaw과 같은 카테고리에 속합니다.

### 차별화 요소

| 특징 | 일반 채팅봇 | **Hermes Agent** |
|------|-----------|-----------------|
| 파일 시스템 | ❌ 접근 불가 | ✅ `read_file`, `write_file`, `patch`, `search_files` 등 |
| 터미널 | ❌ | ✅ `terminal`로 명령어 실행 |
| 브라우저 | ❌ | ✅ `browser_*` 도구로 자동화 |
| 지속 메모리 | ❌ 매 세션 초기화 | ✅ `memory`로 preferences/learnings 보존 |
 | 다중 에이전트 | ❌ | ✅ `delegate_task`로 서브에이전트 파생 |
| 크론 예약 | ❌ | ✅ `cronjob`으로 자동 실행 |
| 메시징 게이트웨이 | ❌ | ✅ Telegram, Discord, Slack 등 10+ 플랫폼 |
| 프레이머 독립성 | ❌ | ✅ 20+ 제공자 (OpenRouter, Anthropic, OpenAI, Qwen, local 등) |
| 스킬 시스템 | ❌ | ✅ 76+ 스킬, 자체 작성·발행 가능 |

### 핵심哲学

> **"Tool access + persistent memory + delegate = autonomous agent"**

Hermes의 힘은 **외부 도구에 대한 접근권** + **세션 간 지속성** + **대규모 병렬 delegated execution**의 조합에서 나옵니다.

---

## 2. 아키텍처와 핵심 개념

### 핵심 구성 요소

```
┌────────────────────────────────────────────┐
│                 User                       │
└──────────────┬─────────────────────────────┘
               │ message
┌──────────────▼─────────────────────────────┐
│           Hermes Agent Core                │
│  ┌──────────┬──────────┬───────────────┐   │
│  │ System   │ Memory   │ Skill Router  │   │
│  │ Prompt   │ (USER    │ (auto-load    │   │
│  │ Builder  │ profile, │  matching      │   │
│  │          │ lessons, │  on trigger)   │   │
│  │          │ skills)  │               │   │
│  ├──────────┼──────────┼───────────────┤   │
│  │  Agent    │ Tool     │ Compression   │   │
│  │  Loop    │ Registry │ (context mgmt)│   │
│  └──────────┴──────────┴───────────────┘   │
└──────────────┬─────────────────────────────┘
     ╱    ║    ╲    ║    ╲    ║    ╲    ║
   File  Term  Browser  Delegate  Cron  MCP
   System            Automation  Scheduling Servers
```

### 설정 파일 구조

| 경로 | 용도 |
|------|------|
| `~/.hermes/config.yaml` | main environment config |
| `~/.hermes/.env` | API keys and secrets |
| `$HERMES_HOME/skills/` | Installed skills |
| `~/.hermes/sessions/` | Session transcripts |
| `~/.hermes/logs/` | Gateway and error logs |
| `~/.hermes/auth.json` | OAuth tokens and credential pools |

---

## 3. 기본 활용법

### 설치 및 시작

```bash
# Install
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# Quick single query — 대화 없이, 한 번에
hermes chat -q "What is the capital of France?"

# Interactive chatting (default mode)
hermes

# Interactive setup wizard
herses setup

# Health check
hermes doctor
```

### 주요 CLI 플래그

```bash
# 다른 모델로 대화
hermes -m anthropic/claude-sonnet-4

# 특정 스킬 로딩
hermes -s obsidian,architecture-diagram

# 프로필 사용
hermes -p my-profile

# 위험 명령 승인 우회
hermes -y
```

### 인-세션 슬래시 명령

| 명령 | 용도 |
|------|------|
| `/new` | 새 세션 시작 |
| `/model [이름]` | 모델 변경 |
| `/reasoning [수준]` | 추론 깊이 (none~show) |
| `/voice on/off/tts` | 음성 모드 |
| `/tools` | 도구 활성화/비활성화 |
| `/cron` | 크론 작업 관리 |
| `/fast` | 우선 처리 모드 토글 |
| `/rollback [N]` | 파일 시스템 복구 지점 복원 |
| `/save` | 대화 내보내기 |
| `/usage` |_token_ 사용량 확인 |

---

## 4. 심층 활용 전략

### 4-1. Persistent Memory 활용법

Hermes의 memory는 **사용자 프로필**과 **공유 지식**으로 구성됩니다.

```python
# 사용자 선호도 저장 (memory tool 사용)
memory(action="add", target="user",
       content="한국어로 응답. Markdown 선호. 한국어/영어 혼합 사용.")

# 환경 사실 저장
memory(action="add", target="memory",
       content="Obsidian vault는 ./Brain 폴더. 노트 형식은 YYYY-MM-DD_파일명.md.")

# 학습된 교정사항 저장
memory(action="add", target="memory",
       content="user는 'quick fix'를 싫어함. 반드시 root cause 분석부터 요구한다.")
```

**가치:** 이 정보는 향후 **모든 세션**에 자동으로 삽입됩니다. 반복 설명이 사라집니다.

### 4-2. Skill System — 지능의 확장

스킬은 **재사용 가능한 업무 절차 문서**입니다. Hermes가 관련성을 감지할 때 **자동으로 로드**합니다.

```bash
# 설치된 스킬 확인
hermes skills list

# 스킬 검색 및 설치
hermes skills search "diagram"
hermes skills install skill-id

# 스킬 업데이트
hermes skills update
```

**76개 스킬이 18개 카테고리**에 걸쳐 설치되어 있습니다:
- `autonomous-ai-agents` (claude-code, codex, opencode)
- `creative` (diagramming, image gen, comic, infographic)
- `software-development` (TDD, debugging, planning, subagent)
- `mlops` (fine-tuning, evaluation, serving, model surgery)
- `research` (arXiv, blog watcher, Polymarket)
- `note-taking` (Obsidian, Apple Notes)
- `media` (spotify, YouTube, music generation)
- 등등...

**자동 트리거가 핵심:** Hermes는 사용자 입력을 분석하여 관련 스킬을 자동으로 로드합니다. `skill "이름"` 명령으로 수동으로 로드할 수도 있습니다.

### 4-3. delegate_task — 다중 에이전트 병렬 실행

가장 강력한 기능 중 하나입니다. 독립적인 서브에이전트를 파생하여 **병렬 작업**을 실행합니다.

```python
# 여러 서브에이전트에게 작업 위임 (병렬)
delegate_task(
    goal="Implement user authentication",
    context="""
    프로젝트: ~/myapp, Python/FastAPI
    - requirements.txt에 bcrypt, python-jose가 있음
    - 기존 models/ 폴더: user.py, product.py
    """,
    tasks=[
        {
            "goal": "Create User model with email and password fields",
            "context": "src/models/ 폴더에 새 파일 생성",
            "toolsets": ["terminal", "file"]
        },
        {
            "goal": "Write API tests for auth endpoints",
            "context": "src/api/routes.py 구조 참고",
            "toolsets": ["terminal", "file"]
        },
        {
            "goal": "Update README with new endpoints",
            "context": "기존 README.md 참조",
            "toolsets": ["file"]
        }
    ]
)
```

**서브에이전트와 `hermes` 프로세스 직접 생성의 차이:**

| | `delegate_task` | 직접 `hermes` 프로세스 |
|-|-----|-----|
| 분리 | 대화 분리, 공유 프로세스 | 완전 독립 프로세스 |
| 지속 시간 | 분 단위 | 시간/일 단위 |
| 도구 접근 | 부모의 하위 집합 | 전체 도구 |
| 상호작용 | 없음 | 있음 |
| 사용 케이스 | 빠른 병렬 서브태스크 | 장기 자율 미션 |

### 4-4. Cron Jobs — 자동화 스케줄링

```bash
# 매일 아메바에 크론 작업 등록
cronjob(action="create",
        name="Daily Obsidian Health Check",
        schedule="0 9 * * *",  # 매일 9:00
        prompt="Check Obsidian vault for broken links, orphaned files, and generate a daily report.",
        skills=["obsidian-vault-maintenance"],
        deliver="origin")       # 결과물을 현재 채스로 전달

# 매주 금요일 논문 요약
cronjob(action="create",
        name="Weekly arXiv Summary",
        schedule="every Friday",
        prompt="Search arXiv for recent papers in [topic], summarize top 5, save to ~/research/weekly.md",
        skills=["arxiv", "obsidian"],
        deliver="origin")

# 크론 작업 관리
cronjob(action="list")    # 작업 목록
cronjob(action="pause", job_id="...")  # 일시정지
cronjob(action="resume", job_id="...")  # 재개
cronjob(action="remove", job_id="...")  # 삭제
cronjob(action="run", job_id="...")    # 즉시 실행
```

---

## 5. Skills 시스템 — 지능의 축적

### 스킬이 작동하는 방식

```
사용자 입력 → Hermes가 관련성 감지 → 매칭 스킬 자동 로드 → SKILL.md의 절차 실행
```

### 주요 스킬 요약 (설치된 것들)

#### 🏗️ 소프트웨어 개발 스킬

| 스킬 | 설명 |
|------|------|
| `writing-plans` | 다중 단계 작업에 대한 상세 구현 계획 작성 (작은 태스크로 분해, 정확한 파일 경로, 완전한 코드 예제) |
| `subagent-driven-development` | 계획 실행 — 각 작업마다 서브 에이전트 발송, 2단계 검토 (명세 준수 → 코드 품질) |
| `test-driven-development` | RED-GREEN-REFACTOR 사이클. 테스트 먼저 실패 → 최소 코드로 통과 |
| `systematic-debugging` | 4단계 근본 원인 조사 — 증상 수정이 아닌 **근본 원인**에서 수정 |
| `requesting-code-review` | 사전 커밋 검증 파이프라인 |

#### 🎨 크리에이티브 스킬

| 스킬 | 설명 |
|------|------|
| `architecture-diagram` | 다크 테마 SVG 소프트웨어 아키텍처 다이어그램 |
| `excalidraw` | 손글씨 스타일 다이어그램 (excalidraw.com 호환) |
| `baoyu-infographic` | 21가지 레이아웃 + 21가지 스타일의 정보그래픽 |
| `manim-video` | 3Blue1Brown 스타일 수학적 애니메이션 |
| `ascii-art` | pyfiglet (571 폰트) ASCII 아트 |
| `pixel-art` | 레트로 픽셀 아트 (NES, PICO-8 등) |
| `popular-web-designs` | Stripe, Linear, Vercel 등 54개 실제 웹사이트 디자인 시스템 |

#### 🔬 MLOps / AI 스킬

| 스킬 | 설명 |
|------|------|
| `axolotl` | LLM 미세 tuning (LoRA, QLoRA, DPO/KTO/ORPO) |
| `fine-tuning-with-trl` | 강화 학습 기반 SFT, DPO, PPO/GRPO |
| `unsloth` | 2-5x 빠른 미세 tuning, 50-80% 메모리 절감 |
| `serving-llms-vllm` | vLLM으로 LLM 프로덕션 배포 |
| `evaluating-llms-harness` | 60+ 학술 벤치마크 (MMLU, HumanEval, GSM8K 등) |
| `dspy` | 선언적 AI 시스템 프로그래밍 |
| **`obliteratus`** ⭐ | **LLM의 거부 행동 제거 (mechanistic interpretability 기반)** |
| `segment-anything-model` | 제로샷 객체 segmentation |
| `weights-and-biases` | ML 실험 추적 및 시각화 |

#### 🗒️ 노트 / PKM 스킬

| 스킬 | 설명 |
|------|------|
| `obsidian` | Obsidian 노트 읽기/검색/생성 |
| `obsidian-pkm-analysis` | 지식 생태계 분석 — 프로젝트, 관심사, 워크플로우 패턴 추출, 전략 로드맵 생성 |
| `obsidian-vault-maintenance` | 깨진 위키링크 진단/수정, 양방향 링크 최적화 |
| `apple-notes` | Apple Notes 관리 |
| `apple-reminders` | Apple Reminders 관리 |

#### 📋 기타 주요 스킬

| 스킬                | 설명                            |
| ----------------- | ----------------------------- |
| `dogfood`         | 웹 앱 체계적 QA 테스트 — 버그 보고, 증거 캡처 |
| `youtube-content` | YouTube 자막 추출 → 요약/챕터/블로그포스트  |
| `spotify`         | 음악 재생/검색/플레이리스트 관리            |
| `polymarket`      | 예측 시장 데이터 조회                  |
| `arxiv`           | 학술 논문 검색 (arXiv)              |
| `godmode`         | LLM jailbreak API (적대적 테스트용)  |
| `maps`            | 위치 정보 (지오코딩, 경로, POI 검색)      |
| `powerpoint`      | .pptx 파일 생성/수정/분석             |
| `nano-pdf`        | 자연어 지시로 PDF 편집                |
| `himalaya`        | IMAP/SMTP 이메일 관리              |

---

## 6. 하이라이트 — 수준 높은 고급 활용법

### 6-1. OBLITERATUS — LLM 모델 Surgery ⭐ (최신 기술)

**개념:** 기계적 해석학(Mechanistic Interpretability) 기법으로 **공개 LLM의 거부 행동(guardrails)을 제거**합니다. 재훈련 없이 모델 가중치에서 refusal 방향을 추출해 절제합니다.

**어떻게 작동하는가:**
- diff-in-means, SVD, LEACE, SAE 분해 등의 기법으로 모델 가중치에서 거부 방향을 **수술적으로 추출**
- 9가지 CLI 메소드 (basic → advanced → aggressive → surgical → optimized 등)
- 28개 분석 모듈 (alignment 식별, concept 기하학, anti-Ouroboros 자가회복 위험 점수 등)
- 116개 모델 프리셋, 5개 컴퓨트 티어

**실무 활용:**

```bash
# 설치 (사용자 동의 필요 — ~5-10GB 의존성)
git clone https://github.com/elder-plinius/OBLITERATUS.git
cd OBLITERATUS && pip install -e .

# VRAM 확인
python3 -c "import torch; print(f'VRAM: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB')"

#最佳 메소드 추천
obliteratus recommend llama-3-8b

# 실제 abliteration
obliteratus obliterate qwen3-8b --method advanced --quantization 4bit --output-dir ./abliterated

# 검증
obliteratus report results.json  # refusal rate, perplexity, KL divergence 확인
```

**적용 시나리오:**
- 오픈소스 LLM을 로컬에서 제약 없이 사용したい
- RAG 파이프라인에서 모델의 불필요한 거부 줄이기
- 학술 연구: 모델 안전성 분석, alignment 연구

> ⚠️ **AGPL-3.0 라이선스:** CLI 호출만 가능. 라이브러리 import 불가.

### 6-2. Subagent-Driven Development — 2단계 검증 프로세스 ⭐

**핵심 원리:** 각 작업마다 **새로운 서브 에이전트** + **명세 준수 검토** → **코드 품질 검토**

```
계획 → Task1 서브에이전트 → Spec Review(✅) → Quality Review(✅) → Task1 완료
     → Task2 서브에이전트 → Spec Review(❌) → Fix → Spec Review(✅) → Quality Review(✅) → Task2 완료
     → 통합 검토 → 완료
```

**왜 새로운 에이전트인가?**
- 누적된 상태의 컨텍스트 오염 방지
- 각 에이전트가 깨끗하고 포커스된 컨텍스트 획득
- 작업 간 코드/이유 오류 없음

**작업 분해 원칙:** 각 작업 = 2-5분 집중 작업

| 너무 큼 (❌) | 적절한 크기 (✅) |
|-------------|-----------------|
| "로그인 시스템 구현" | "User 모델에 email 및 password_hash 필드 추가" |
| | "bcrypt로パスワードハ싱 유틸리티 생성" |
| | "로그인 엔드포인트 작성" |
| | "JWT 토큰 생성기 추가" |

### 6-3. Writing-Plans — 완전한 구현 계획 작성

```
사용자 요구 → Writing-Plans(스킬) → 상세 구현 계획 → subagent-driven-development 실행
```

**계획 문서 구조:**

```markdown
# [기능명] 구현 Plan

> For Hermes: Use subagent-driven-development skill.

**Goal:** 한 문장으로 설명
**Architecture:** 2-3문장
**Tech Stack:** 주요 기술

---

### Task 1: User 모델 생성
**Objective:** email 필드가 있는 User 모델

**Files:**
- Create: `src/models/user.py`
- Test: `tests/models/test_user.py`

**Step 1: 비정상 테스트 작성**
```python
def test_user_has_email():
    user = User(email="test@example.com")
    assert user.email == "test@example.com"
```

**Step 2: 테스트 실행하여 실패 확인**
```bash
pytest tests/models/test_user.py::test_user_has_email -v
# expected: FAIL
```

**Step 3: 최소 구현**
```python
class User:
    def __init__(self, email: str):
        self.email = email
```

**Step 4: 통과 확인**
```bash
pytest tests/models/test_user.py -v
# expected: 1 passed
```

**Step 5: 커밋**
```bash
git add src/models/user.py tests/models/test_user.py
git commit -m "feat: add User model with email field"
```
```

### 6-4. Claude Code 오케스트레이션 ⭐

Hermes가 직접 **Claude Code를 하위 프로세스로 오케스트레이션**할 수 있습니다.

```python
# Print Mode (비대화식, 자동화용 — 선호)
terminal(
    command="claude -p 'Add error handling to all API calls in src/' "
            "--allowedTools 'Read,Edit' --max-turns 10",
    workdir="/path/to/project",
    timeout=120
)

# PTY Mode (대화식, 다중 턴)
terminal(command="tmux new-session -d -s claude-work -x 140 -y 40")
terminal(command="tmux send-keys -t claude-work 'cd /path/to/project && claude' Enter")
terminal(command="sleep 5 && tmux send-keys -t claude-work 'Refactor auth to use JWT' Enter")
terminal(command="sleep 15 && tmux capture-pane -t claude-work -p -S -50")

# 병렬 Claude Code 인스턴스 (3개 동시에)
tasks = [
    "claude -p 'Fix backend auth bug' --allowedTools 'Read,Edit' --max-turns 10",
    "claude -p 'Write API integration tests' --allowedTools 'Read,Write,Bash' --max-turns 15",
    "claude -p 'Update API documentation' --allowedTools 'Read,Edit' --max-turns 5",
]
```

**Print Mode vs PTY Mode 선택 기준:**

| 상황 | Print Mode `-p` | PTY Mode (tmux) |
|------|----------------|-----------------|
| 한 번 작업 | ✅ | |
| 다중 턴 대화 | | ✅ |
| CI/스크립팅 | ✅ | |
| `/compact`, `/model` 명령 필요 | | ✅ |
| 인간-인-더-루프 결정 | | ✅ |
| 탐색적 코딩 | | ✅ |

### 6-5. Observian Vault 분석 (PKM 분석)

**`obsidian-pkm-analysis` 스킬**으로 지식 생태계를 분석합니다:

```
Phase 1: 구조적 매핑 (모든 파일 및 폴더 매핑)
Phase 2: 프로필 추출 (프로젝트, 관심사, 작업 습관)
Phase 3: 핵심 도메인 심층 분석
Phase 4: 패턴 인식 (시작→포기→재시작 사이클, 고아 노트 등)
Phase 5: 3단계 지식 개발 로드맵 제안
    Phase 1 — Connect (내부 통합)
    Phase 2 — Create (외부 표현)
    Phase 3 — Publish (외부 검증)
```

**분석에서 발견되는 패턴 유형:**
- 프로젝트 수명 주기 패턴 (시작 → 포기 → 재시작 사이클)
- 지식 흐름 패턴 (수집 → 분석 → ? — 이후에 무슨 일이?)
- 도메인 간 교차점
- 미사용 자산 (풍부한 콘텐츠가 연결되지 않음)
- 콘텐츠 간극 (관심 있지만 미탐구 주제)
- 고아 노트 (들어오는/나오는 링크 없음)

### 6-6. 도메인 간 조합 활용 (최고 수준의 활용)

여러 스킬을 조합하면 시너지가 발생합니다:

| 조합 | 결과 |
|------|------|
| `obsidian-pkm-analysis` + `youtube-content` | 지식베이스 분석 → 관련 YouTube 콘텐츠 추천 |
| `architecture-diagram` + `writing-plans` | 아키텍처 결정 → 다이어그램 자동 생성 → 구현 계획 |
| `obsidian-vault-maintenance` + cronjob | 일일vault 건강체크 자동화 |
| `dogfood` + `systematic-debugging` | 웹 앱 QA + 체계적 버그 조사 |
| `obliteratus` + `serving-llms-vllm` |abliterated 모델 → 프로덕션 배포 |
| `evaluating-llms-harness` + `fine-tuning-with-trl` | 미세 tuning 실험 + 평가 추적 |

---

## 7. 최신 스킬 카테고리 매핑

### 7-1. AI/ML 파이프라인 (최신)

```
olliteratus (거부제거) → fine-tuning-with-trl (학습) → unsloth 가속화
    → evaluating-llms-harness (평가) → serving-llms-vllm (배포)
    → dspy (시스템 프로그래밍)
```

이 전체 파이프라인을 Hermes가 **자동으로 연결**합니다:

1. **OBLITERATUS**로 모델의 거부 거동 제거
2. **Unsloth**로 2-5x 빠른 미세 tuning 실행
3. **TRL/FineTuning**로 DPO/SFT 학습
4. **LM Eval Harness**로 60+ 벤치마크에서 평가
5. **vLLM**으로 프로덕션 배포
6. **DSPy**로 시스템 프로그래밍

### 7-2. 크리에이티브 파이프라인

```
popular-web-designs (인스피레이션) → architecture-diagram / excalidraw (다이어그램)
    → manim-video (애니메이션) → ascii-art (레이어)
    → baoyu-comic / infographic (지식 시각화)
```

### 7-3. 연구 파이프라인

```
arxiv (논문검색) → polymarket (시장 데이터) → blogwatcher (피드모니터링)
    → youtube-content (비디오분석) → dedup (연구정리)
```

### 7-4. 개발 워크플로우

```
user 요구 → writing-plans (계획) → subagent-driven-development (실행)
    → test-driven-development (검증) → requesting-code-review (검토)
    → systematic-debugging (디버깅) → github-pr-workflow (병합/PR)
```

---

## 8. 실무 자동화 워크플로우

### 워크플로우 1: 기능 개발 (요구사항 → 구현 → 리뷰)

```
1. 사용자: "로그인 기능 추가해줘"
2. Hermes: writing-plans 스킬 로드 → 상세 계획 생성
3. Hermes: subagent-driven-development 스킬 로드 → 각 작업마다 서브에이전트
4. 각 작업: TDD 스킬 → 테스트 먼저 실패 → 최소 코드
5. 완성 후: code-review 스킬 → spec 준수 + 품질 검증
6. 최종: PR 생성
```

### 워크플로우 2: 버그 수정 (증상 → 근본원인 → 수정)

```
1. 사용자: "서버에서 500 에러 발생"
2. Hermes: systematic-debugging 스킬 로드
3. Phase 1: 오류 메시지 분석 → 재현 → 최근 변경사항 확인 → 데이터 흐름 추적
4. Phase 2: 유사 작업 코드 비교 → 차이점 식별
5. Phase 3: 가설 수립 → 최소화 테스트 → 단일 변수
6. Phase 4: 회귀 테스트 작성 → 근본원인 수정 → 전체 테스트 통과 확인
7. 3회 이상 실패 시: 아키텍처 재검토 제안
```

### 워크플로우 3: 지식베이스 관리

```
1. cronjob: 매일 아침 vault 진단
2. obsidian-vault-maintenance: 깨진 링크 자동 수정
3. obsidian-pkm-analysis: 분기별 지식 생태계 분석
4. 추천: 미연결 노트 연결, 콘텐츠 간극 보고
```

### 워크플로우 4: 웹 앱QA

```
1. 사용자: "[URL] 테스트해줘"
2. Hermes: dogfood 스킬 로드
3. Phase 1: 테스트 범위 정의 → 사이트맵 빌드
4. Phase 2: 페이지 자동 탐색 → 상호작용 테스트
5. Phase 3: 각 버그에 대해 스크린샷+console 기록
6. Phase 4: 분류 (심각도: Critical/High/Medium/Low)
7. Phase 5: 구조적 보고서 작성
```

---

## 9. 프롬프트 작성 법칙

### 효과적인 프롬프트 구조

```
[작업 종류] + [목표] + [참조 파일/경로] + [특정 제약사항]
```

**좋은 예시:**
> "src/api/auth.py의 로그인 엔드포인트를 리뷰해줘. 시스템atic-debugging 스킬을 사용해. 
> 특히 토큰 검증 로직(25-45행)과 에러 처리(60-75행)에 집중하고, 
> JWT 관련 보안 이슈가 있는지 확인해줘."

**나쁜 예시:**
> "로그인 기능 확인해줘"

### 스킬 강제 로드

```
"obsidian-pkm-analysis 스킬을 사용해 ~/Brain을 분석해줘"
"architecture-diagram 스킬로 API 아키텍처 다이어그램 만들어줘"
```

### 백그라운드 태스크

```python
# 길고 느린 작업을 백그라운드로
terminal(command="hermes chat -q 'analyze my entire Obsidian vault and generate a knowledge report'", 
         background=true, notify_on_complete=true)
```

---

## 10. 트러블슈팅 & 팁

### 자주 발생하는 문제

| 문제 | 해결 |
|------|------|
| 도구가 보이지 않음 | `hermes tools list` → 활성화 → `/reset` |
| 모델/제공자 오류 | `hermes doctor` → `hermes login` |
| 스킬이 로드 안 됨 | `hermes skills list` → `hermes skills config` → `/skill 이름` 수동 로드 |
| 게이트웨이 죽음 | `systemctl --user reset-failed hermes-gateway` |
| Docker 백엔드 문제 | `hermes doctor`로 설정 확인 |
| 맥락 한계 | `/context`로 현재 상태 확인 → `/compact`로 압축 |
| 컨텍스트 창 70%+ | 품질 저하 시작 → `/compact` 즉시 |
| 컨텍스트 창 85%+ | **즉시** `/compact` 또는 `/clear` — 환각 위험 급증 |

### 고급 팁

| 팁                        | 설명                                               |
| ------------------------ | ------------------------------------------------ |
| **컨텍스트 창 건강 모니터링**       | `/context`로 확인. 70%+면 `/compact`                 |
| **credential pool 활용**   | `hermes auth add`로 여러 키 관리 → 자동 회전               |
| **프로필 분리**               | `hermes profile create work/personal` — 업무/개인 분리 |
| **작업트리 모드**              | `-w` 플래그로 병렬git 격리                               |
| **체크포인트**                | `--checkpoints`로 파일 시스템 스냅샷 → `/rollback`로 복원    |
| **STT/TTS 음성**           | `hermes setup`으로 설정 → `/voice on`                |
| **MCP 서버**               | `hermes mcp add`로 외부 도구 연결 (데이터베이스, API 등)       |
| ** hooks (Claude Code)** | `.claude/settings.json`에서 자동 훅 설정 — 자동 포맷팅, 린터 등 |

### 성능 최적화

1. **단일 작업에는 `-p` (print mode) 사용** — 더 깔끔, 빠른 실행
2. **`--max-turns` 설정** — 무한 루프 방지
3. **`--allowedTools` 제한** — 불필요한 도구 로드 줄임
4. **컨텍스트 압축 proactive하게** | 70% 임계치 전 | `/compact` |
5. **세션마다 새 세션** — 5시간 세션 →Distinct 작업은 새 컨텍스트가 더 효율적 |
6. **`hermes insights`로 사용 분석** — 패턴 파악 및 최적화 |

---

## 부록: 핵심 명령어 레퍼런스

### 설치 확인
```bash
hermes doctor
hermes status
hermes model
hermes config
```

### 스킬 관리
```bash
hermes skills list
hermes skills search query
hermes skills config  # 플랫폼별 활성화
hermes skills update
hermes skills browse  # 전체 등록표 보기
hermes skills tap add <repo>  # 커스텀 리포지토리 추가
```

### 도구 관리
```bash
hermes tools list
hermes tools enable NAME
hermes tools disable NAME
```

### 세션 관리
```bash
hermes sessions list
hermes sessions browse
hermes sessions stats
hermes sessions prune --older-than 30  # 30일 이상 정리
hermes sessions export output.jsonl  # 내보내기
```

### 프로필
```bash
hermes profile list
hermes profile create NAME
hermes profile use NAME
```

### 크론
```bash
hermes cron list
hermes cron create SCHEDULE  # '30m', 'every 2h', '0 9 * * *'
hermes cron edit ID
```

### MCP
```bash
hermes mcp list
hermes mcp add NAME -- URL-or-Command
hermes mcp test NAME
```

---

> **마무리:** Hermes Agent는 단순한 채팅 인터페이스가 아니라, **전체 시스템에 접근하고, 지속적 학습하고, 다중 에이전트를 오케스트레이션할 수 있는 자율 시스템**입니다. 이 가이드의 핵심 개념 — persistent memory, skill automation, subagent parallelism, automated workflows — 을 일상 워크플로우에 통합하면, 반복 작업은 거의 자동으로 처리하고, 고부가가치 의사결정에 집중할 수 있습니다.
