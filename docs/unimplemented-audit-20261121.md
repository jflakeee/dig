# DIG 미구현 설계 및 구현 증거 감사 — 2026-11-21

기준: main e594d97 (P14). P15 회전 대응은 feature/p15-rotation-regression에서 검증 중이며 main 미반영. 이 문서는 코드·설계 정적 대조 결과이며 실기기 검증이 아니다.

## 상태 기준
- 구현: 소스와 자동 테스트/배포 이력이 존재함. 실기기 완료를 의미하지 않음.
- 부분: 핵심 기능은 있으나 목표·수용 기준 중 미완료가 있음.
- 미구현: 현재 확인된 소스에서 해당 기능 구현 근거가 없음.
- 확인 필요: 문서만으로 기능 완료 또는 실제 동작을 확정할 수 없음.

| 항목 | 현재 상태 | 코드/설계 근거 | 남은 수용 기준 | 우선순위 |
|---|---|---|---|---|
| 복셀 지형·채굴·충돌 | 구현, 실기기 확인 필요 | src/terrain.ts, src/main.ts, tests/browser-smoke.mjs | 장시간 채굴·경계 충돌 실기기 검증 | P0 |
| 저장·구형 저장 호환·동시 탭 보호 | 구현, 실제 브라우저 확인 필요 | src/save.ts, src/profileStore.ts, docs/p11-compatibility.md | Safari 저장 차단·장시간 재접속 검증 | P0 |
| 모바일 조이스틱·가로/세로 배치 | 구현, 실기기 확인 필요 | src/input.ts, src/main.ts, tests/browser-smoke.mjs | iOS Safari/Android 동시 터치·회전·안전영역 확인 | P0 |
| 화면 회전 중 입력 취소 | P15 검증 중 | feature/p15-rotation-regression | 최신 Browser smoke/CI 통과 후 병합 | P0 |
| 4개 광산·화산 자원·전설 장비 | 구현 | src/mineProfile.ts, src/expandedWorld.ts, src/legendary.ts, docs/p11-world.md | 실제 모바일 도달성·획득/장착 체감 검증 | P1 |
| 5번째 광산(결정 성역) | 미구현 | docs/p11-world.md | 광산 ID/해금/지형/저장 마이그레이션/브라우저 테스트 | P1 |
| 최종 유물·엔딩 | 미구현 | docs/p11-world.md | 완료 상태 영속성·중복 보상 방지·엔딩 연출 | P1 |
| 엔딩 후 자유 탐험 | 미구현 | docs/p11-world.md | 재시작 강제 없음·기존 장비/광산 보존 | P1 |
| 제작 아이템 효용 | 부분, 기능별 검증 필요 | src/crafting.ts, src/craftEffects.ts, docs/release-readiness.md | 모든 레시피가 실제 채굴/탐험에 주는 효과 테스트 | P1 |
| 성능 목표·시각 품질 | 부분 | src/quality.ts, docs/p9-performance.md, docs/p7-art-direction.md | 실기기 FPS·발열·장시간 세션·스크린샷 비교 | P1 |
| Smooth terrain | 미구현 | docs/map-systems-20261118.md | 밀도/충돌/굴착 일치하는 독립 프로토타입 | P2 |
| 자동화·별도 퀘스트·설정 | 미구현 또는 확인 필요 | docs/map-systems-20261118.md, src/objectives.ts | 기능 범위 승인 후 독립 수용 기준 정의 | P3 |
| Android 네이티브 패키징 | 미구현 | package.json, docs/map-systems-20261118.md | 빌드·서명·실기기 설치/실행 | P3 |

## 중복 정의·문서 부채
- src/mineCatalog.ts는 3개 광산 정의를 포함하나 현재 게임은 4개 광산을 제공함. src/mineProfile.ts와 사용처를 확인하기 전 임의 삭제/통합 금지.
- docs/map-systems-20261118.md와 docs/project-stage-detect-20261118.md는 초기 스냅샷이다. 그 당시 N(미구현) 표시는 현재 상태가 아님.
- README 개발 현황은 P12까지만 표기되어 P13/P14 완료 및 P15 진행 상태를 반영해야 함.

## 개발 순서와 릴리스 게이트
1. P15: 회전 중 조이스틱/채굴/시점 입력 취소 테스트 통과; main 병합 전 최신 브라우저 CI 확인.
2. P16: iOS Safari·Android 실기기 10분 이상 조작/저장/성능 확인. 자동 Chromium 성공과 분리 보고.
3. P17: 광산 5와 최종 유물. 기존 v1/v2/v3 저장 및 4개 광산 보존, 광산 전환/중복 보상 테스트.
4. P18: 엔딩 및 자유 탐험. 완료 상태의 원자적 저장과 재진입 회귀 검사.
5. P19: 제작 효용·경제 시뮬레이션·장시간 성능/시각 품질 게이트.

원칙: 기존 main과 Pages 배포 보존, 구형 저장 비파괴, 브랜치 CI·Chromium·실기기·배포를 별도 상태로 보고.
