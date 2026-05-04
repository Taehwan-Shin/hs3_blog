# PDF/PPTX → Blog 포스트 → GitHub Push 작업 가이드

## 📋 작업 흐름

```
Source PDF/PPTX → Text Extraction → Blog Post (Markdown) → Vercel Deploy → Git Push
```

---

## ⚠️ 자주 겪은 오류와 해결책

### 1. 로컬 파일 탐색 실패
**오류**: `read_file`로 `/Users/bliss00/obsidian/...` 같은 호메디렉토리를 직접 찾지 못함.
**원인**: VM의 `/workspace`가 호스트의 `/Users/bliss00/obsidian/`에 mount됨.
**해결**: `/workspace` 밑에서 `find` 후 실제 경로 파악

### 2. Keynote 내보내기 → 텍스트 0바이트
**오류**: PDF/PPTX에서 pymupdf가 0바이트 반환.
**원인**: Keynote에서 **이미지로 내보내기**했기 때문에 텍스트 레이어 없음.
**해결**:
- Keynote에서 **파일 → 내보내기 → PowerPoint** 선택 (텍스트 포함)
- 또는 Keynote에서 **파일 → 내보내기 → PDF ( 텍스트 포함 / 고품질 인쇄용)**
- 이미지 기반이라면 Vision으로 수동 분석

### 3. OCR 도구 설치 실패
**오류**: `easyocr` → "No space left on device" (PyTorch 의존성 과다)
**해결**:
- `tesseract-ocr-kor`는 `/usr/share/tesseract-ocr/5/tessdata/kor.traineddata`가 없어서 `lang='ko'` 로드시 실패
- OCR 대신 `pymupdf`로 텍스트 추출이 가능한 PDF는 무조건 먼저 사용

### 4. 파일명 한글 문제 (치명적)
**오류**: `서논술 평가도구.md` 같은 한글 파일명 → git에서 `\354\213\244` 식 유니코드 이스케이프
**원인**: Git이 한글 파일명을 UTF-8 바이트 시퀀스로 인식
**해결**:
- 파일명은 `(YYYY-MM-DD)english-title.md` 형식 (한글 없이, 날짜 접두사 포함)
- 이미지 경로만 `attachments/`로 접근하면 됨

### 5. GitHub Push — Fine-grained PAT vs Classic PAT (매우 중요!)
**오류**: `gh_pat_...` 토큰으로 HTTPS push → "Invalid username or token"
**원인**: GitHub는 HTTPS Git push에 **Classic PAT**(`ghp_...`)만 허용. Fine-grained PAT는 API/gh CLI 전용.

**해결**:
```bash
# 올바른 인증 방식
git remote set-url origin https://oauth2:ghp_CLASSIC_TOKEN@github.com/OWNER/REPO.git
git push origin master
```

### 6. Vercel 배포 실패
**오류**: commit author email 검증 실패 (`hermes-agent@google.com`은 비유효)
**원인**: Hermes의 초기 git config가 유효하지 않은 이메일 설정됨.
**해결**:
```bash
cd /workspace/vault-blog
git config --local user.email "gssth8286@gmail.com"
git config --local user.name "Baekje"
git rebase --exec 'git commit --amend --reset-author --no-edit' <base-commit>
git push --force origin master
```

---

## ✅ 성공 노하우 (무조건 지켜야 할 체크리스트)

### 문서 작성 전 필수 확인
| 항목 | 확인 방법 |
|------|----------|
| PDF 텍스트 포함? | `pymupdf.open()` 후 `page.get_text().strip()` 길이 확인 |
| 0바이트면 → Keynote 재내보내기 또는 수동 분석 |
| 파일명 영어 사용 | `( 날짜 )english-title.md` 형식 |

### GitHub Push 필수 순서
```bash
# 1. Classic PAT만 HTTPS에 사용 가능 (ghp_ 로 시작)
# 2. author email 유효한지 확인 (실제 이메일이어야 함)
# 3. rebase로 모든 commit author 일관되게
# 4. force push
```

### 이미지 처리 가이드
- pymupdf로 이미지 추출 가능 (고해상도)
- 하지만 이미지만 있는 경우 Vision 도구로 수동 분석이 유일한 대안
- EasyOCR는 VM 환경에서 설치 실패 (PyTorch 의존성 과다 → ~400MB)

---

## 🚀 앞으로의 더 간편한 요청 방법

이 작업을 더 쉽게 요청하려면 다음 서식을 사용하세요:

### 추천 요청 템플릿

```
[문서변환] path/to/file.pdf → blog 포스트
필진: (goguryeo/baekje/silla 중 선택)
```

예시:
```
[문서변환] 서논술 평가도구.pdf → blog 포스트
필진: 백제
```

### 자동 처리되는 내용
- ✅ 파일명 영어로 자동 변환 (`(YYYY-MM-DD)title.md`)
- ✅ pymupdf 텍스트 추출 시도 → 실패 시 OCR/Vision 시도
- ✅ GUIDE_FOR_HERMES.md 기준에 맞는 프론트매터 포함
- ✅ 필진 페르소나 적용
- ✅ git commit + push 자동 처리

### 사전 설정 요구사항 (1회만 필요)
1. **Classic PAT 발급**: https://github.com/settings/tokens?type=classic → `repo` 권한 체크
2. **git config 설정**: 유효한 이메일과 이름으로
3. **이미지 기반 PDF 경계**: Keynote → 텍스트 포함 export로 내보내기

### 메모리에 저장할 항목
- git email: `gssth8286@gmail.com`
- git name: `Baekje`
- GitHub owner: `Taehwan-Shin`
- Repository: `hs3_blog`
- Vercel 빌드 자동 배포 (master push 시)
