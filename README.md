# DIG ⛏️

**모바일 우선 3D 채굴·탐험 게임** · Three.js + TypeScript · 브라우저에서 바로 플레이

[![Build and deploy](https://github.com/jflakeee/dig/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/jflakeee/dig/actions/workflows/build.yml)
[![Dependency audit](https://github.com/jflakeee/dig/actions/workflows/security.yml/badge.svg?branch=main)](https://github.com/jflakeee/dig/actions/workflows/security.yml)

[🎮 게임 플레이](https://jflakeee.github.io/dig/) · [📋 개발 기록](docs/map-systems-20261118.md) · [🐛 문제 제보](https://github.com/jflakeee/dig/issues) · [⚙️ GitHub Actions](https://github.com/jflakeee/dig/actions)

> 설치 없이 실행하는 1인칭 복셀 채굴 프로토타입입니다. 개발 중인 게임으로, 모바일 기기별 성능과 조작감은 달라질 수 있습니다.

## 실행 버전

| 버전 | 실행 주소 |
| --- | --- |
| 클래식 | [현재 게임](https://jflakeee.github.io/dig/) |
| 통합설계 시험판 · 첫 드릴과 첫 포탈 | [시험 플레이](https://jflakeee.github.io/dig/next/) |
| 2026-11-25 보존판 | [클래식](https://jflakeee.github.io/dig/versions/2026-11-25/) · [4D 시제품](https://jflakeee.github.io/dig/versions/2026-11-25/dig-4d.html) |

시험판은 화면을 드래그해 방향을 바꾸고, 일반 암석 3개로 첫 드릴을 제작합니다. 드릴을 장착하면 시야 방향으로 계속 전진하며, 메뉴를 열거나 포탈을 지나도 운행이 이어집니다. 청크 끝에서는 그대로 다음 암반을 채굴합니다. 포탈 방향은 시야 안에서는 원형 표식, 시야 밖에서는 화면 가장자리의 화살표로 표시합니다.

## 클래식 게임 소개

땅을 파고 광물을 모아 장비를 강화하면서 새로운 광산을 탐험하세요.

- **4개 광산:** 지형과 자원이 다른 광산을 탐험하고 다음 지역을 해금합니다.
- **채굴과 성장:** 곡괭이·드릴·삽으로 채굴하고, 광물을 판매해 장비를 강화합니다.
- **제작:** 채굴 자원으로 유용한 아이템을 제작합니다.
- **화산 광산과 전설 장비:** 희귀 자원을 모아 전설 장비 3종을 제작·장착합니다. 해당 도구를 **+5**까지 강화해야 제작할 수 있습니다.
- **탐험 기록:** 동굴 발견, 탐험 목표와 진행 상황을 확인합니다.
- **저장:** 브라우저 로컬 저장소에 진행 상황을 저장합니다. 저장 실패·충돌에 대한 보호 로직이 포함되어 있습니다.

## 플레이 방법

| 조작 | PC | 모바일 |
| --- | --- | --- |
| 이동 | **W / A / S / D** | 왼쪽 가상 조이스틱 |
| 시점 이동 | 화면 드래그 | 화면 드래그 |
| 채굴 | **Space** 또는 채굴 버튼 | 오른쪽 **DIG** 버튼 |
| 장비·제작·광산 이동 | 화면 버튼 | 화면 버튼 |

화면의 **Sell all**, **Craft**, 광산 이동 메뉴를 사용해 성장할 수 있습니다. 일부 작업은 지상에서만 가능합니다.

**[▶ DIG 플레이하기](https://jflakeee.github.io/dig/)**

## 실행 환경

- 최신 Chromium 기반 브라우저 권장
- WebGL 사용 가능 환경 필요
- 모바일 터치 조작 지원
- 진행 상황은 **현재 브라우저·기기**의 로컬 저장소에 보관됩니다. 브라우저 데이터를 삭제하거나 다른 기기에서 접속하면 저장 기록이 이어지지 않을 수 있습니다.

## 자주 묻는 질문

**게임이 검은 화면으로 표시되나요?** WebGL을 지원하는 최신 브라우저에서 다시 열고, 브라우저의 하드웨어 가속 설정을 확인해 보세요. 기기·브라우저 정보와 함께 문제를 제보하면 도움이 됩니다.

**저장 데이터는 어디에 있나요?** 현재 접속한 브라우저의 로컬 저장소에 저장됩니다. 시크릿 모드, 사이트 데이터 삭제, 다른 브라우저·기기에서는 기존 진행 상황이 보이지 않을 수 있습니다. 중요한 진행 상황이 있다면 브라우저 저장 데이터를 지우지 마세요.

**광물을 팔거나 장비를 제작할 수 없나요?** 일부 판매·제작 기능은 지상에서만 사용할 수 있습니다. 먼저 지상으로 이동한 뒤 다시 시도하세요.

**휴대전화에서 조작이 불편한가요?** 왼쪽 조이스틱으로 이동하고 화면을 드래그해 시점을 돌립니다. 화면을 가로로 돌리면 조작 공간을 더 확보할 수 있지만 기기별 차이가 있습니다.

## 개발 환경

- **엔진 / 렌더링:** Three.js
- **언어:** TypeScript
- **빌드:** Vite
- **오디오:** plinkfx
- **배포:** GitHub Pages
- **검증:** Node.js 테스트, Chromium/Playwright 브라우저 스모크 테스트, GitHub Actions

### 로컬 실행

Node.js **22** 기준:

```bash
git clone https://github.com/jflakeee/dig.git
cd dig
npm install
npm run dev
```

터미널에 표시되는 로컬 주소로 접속합니다.

프로덕션 빌드:

```bash
npm run build -- --base=/dig/
```

자동화된 단위 테스트:

```bash
node --experimental-strip-types --test tests/*.test.mjs
```

브라우저 스모크 테스트는 Playwright와 빌드된 게임을 제공하는 로컬 미리보기 서버가 필요합니다. 실제 CI 구성은 [browser.yml](.github/workflows/browser.yml)을 참고하세요.

## 개발 중인 차기 월드 설계 (미구현)

하늘과 지표면이 없는 3차원 무한 지하 월드, 매점 건물 대신 메뉴형 상점, 원거리 청크 초기화, 채굴로 새로 노출된 블록의 광물 실시간 결정을 설계했습니다. **현재 플레이 가능한 main 버전에는 아직 적용되지 않았습니다.**

- [최신 설계 문서](docs/infinite-underground-world-20261122.md)
- [프로젝트 메모리·결정사항](docs/PROJECT_MEMORY.md)
- [온라인 3종 모드 설계 — 개발 보류](docs/online-multiplayer-modes-20261123.md)

## 개발 및 배포 현황

| 단계 | 내용 |
| --- | --- |
| P0–P10 | 채굴, 저장, 광산, 성장, 탐험 및 성능 개선 |
| P11 | 4번째 화산 광산, 희귀 자원, 전설 장비, 저장 호환성 |
| P12 | 모바일 조이스틱 이동 범위 개선 및 브라우저 회귀 검사 |
| P13 | 모바일 가로 화면 회귀 테스트 및 배포 완료 |
| P14 | 모바일 세로 화면 회귀 테스트 및 배포 완료 |
| P15 | 화면 회전 입력 안정화 작업 브랜치 검증 중 |

`main`에 변경사항이 반영되면 [Build and deploy](.github/workflows/build.yml)가 GitHub Pages 배포를 실행합니다. **코드 커밋, 자동 테스트, 배포 성공, 실제 기기 검증은 서로 다른 단계**이며, Actions의 최신 실행 결과를 확인하세요.

## 문서

- [미구현 설계 감사 및 우선순위 (2026-11-21)](docs/unimplemented-audit-20261121.md)
- [초기 시스템 구조 스냅샷 (2026-11-18)](docs/map-systems-20261118.md)
- [P11 월드 확장](docs/p11-world.md)
- [희귀 자원](docs/p11-rare-resources.md)
- [전설 장비](docs/p11-legendary-equipment.md)
- [저장 호환성](docs/p11-compatibility.md)
- [성능 개선 기록](docs/p9-performance.md)
- [릴리스 준비 사항](docs/release-readiness.md)

## 피드백

버그나 개선 의견은 [GitHub Issues](https://github.com/jflakeee/dig/issues)에 남겨주세요. 기기 종류, 브라우저, 재현 단계가 있으면 원인 분석에 도움이 됩니다.

---

**DIG** — 파고, 발견하고, 강화하세요.
