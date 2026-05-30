# 点滴タイマー 引継ぎメモ

## 現在地

- MVP v1.0 は完了済み。
- 標準ワークスペース化は完了済み。
- MVP本体は `app/src/` に実装済み。
- 計算ロジック確認用の静的テストは `app/tests/calculation-test.html` にある。
- Service Worker、manifest、仮アイコンを含む静的PWA構成は実装済み。
- 秒針ガイド機能と秒針ガイド簡素化は実装済み。
- 現行Service Workerのキャッシュ名は `tenteki-timer-v3`。
- Service Workerの旧キャッシュ削除対象は、`tenteki-timer-` で始まるCacheだけに限定済み。
- GitHub Pages URLで主端末スモーク確認済み。
- iPhone / Android 両方でホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算を確認済み。
- 新しい改善テーマとして、秒針ガイドを常時表示の秒針時計へ置き換える計画を `doc/architecture/04_byoshin-only-plan.md` に作成済み。
- `04_byoshin-only-plan.md` は `codex-plan-review` 済み。シニアエンジニア観点と UI/UX 観点のサブレビューを実施し、最終的に P0/P1/P2 0件を確認済み。
- 秒針時計化の実装は未着手。

## 最初に読むもの

1. `AGENTS.md`
2. `README.md`
3. `specs/requirements.md`
4. `doc/architecture/overview.md`
5. `doc/architecture/tech-stack.md`
6. `doc/architecture/01_implementation-plan.md`
7. `doc/architecture/04_byoshin-only-plan.md`
8. `todo/now.md`

## 正本

- 要件: `specs/requirements.md`
- アーキテクチャ: `doc/architecture/overview.md`
- 技術スタック: `doc/architecture/tech-stack.md`
- MVP実装チェックリスト: `doc/architecture/01_implementation-plan.md`
- 秒針ガイド計画: `doc/architecture/02_byosingaido-plan.md`
- 秒針ガイド簡素化チェックリスト: `doc/architecture/03_byosingaido-simplify-plan.md`
- 秒針時計化計画: `doc/architecture/04_byoshin-only-plan.md`
- 引継ぎ詳細: `doc/operations/handover.md`
- 次担当者向け短縮プロンプト: `doc/operations/Next-Agent-Prompt.md`
- ルート直下の `tenteki-timer-*.md` は使わない。現在は `archive/` に元文書がある。

## 完了済み

- 標準ワークスペース構成を作成した。
- 既存詳細文書の内容を標準ディレクトリ側へ統合し、正本化した。
- `README.md` と `AGENTS.md` に標準ディレクトリ側を正本として扱う方針を反映した。
- `doc/architecture/overview.md` と `doc/architecture/tech-stack.md` を `app/src/` 配置方針へ整合した。
- `app/src/calc.js` にDOM非依存の計算ロジックを実装した。
- `app/tests/calculation-test.html` に固定 `now` を使うロジックテストを作成した。
- `app/src/index.html` と `app/src/style.css` に1画面UIを実装した。
- `app/src/manifest.json`、`app/src/service-worker.js`、`app/src/icons/` を実装した。
- `app/src/` のHTTP配信、UI挙動、静的PWA設定、GitHub Pages想定URLを確認した。
- 実ブラウザでService Worker登録、オフライン表示、オフライン計算を確認した。
- 秒針ガイド機能の初期計画を作成し、レビュー指摘を反映した。
- 秒針ガイドの計算ロジック、UI、タイマー管理、Service Worker v2更新、ロジックテスト、関連文書更新を実装した。
- 秒針ガイド簡素化計画を作成し、レビュー指摘を反映した。
- SVG盤面内の12 / 3 / 6 / 9時基準目盛りと「次」「2つ先」テキストを削除した。
- 外側凡例をSVG直前へ移し、文言を「実線: 次の目印」「破線: 2つ先の目印」に更新した。
- `app.js` からラベルDOM参照、`setLabelByAngle()`、ラベル表示制御を削除した。
- `calc.js` の `getSecondGuideState()` から `showDialLabels` を削除した。
- 目印線の長さ判定を `app.js` 側の `intervalSeconds > 2` に集約した。
- `style.css` から `.guide-reference` と `.guide-label` を削除した。
- Service Workerのキャッシュ名を `tenteki-timer-v3` に更新した。
- Service Workerの旧キャッシュ削除対象を `tenteki-timer-` で始まるCacheだけに限定した。
- `doc/architecture/02_byosingaido-plan.md`、`doc/architecture/03_byosingaido-simplify-plan.md`、`doc/architecture/01_implementation-plan.md`、`todo/now.md` をMVP完了状態へ更新した。
- 秒針時計化計画を `doc/architecture/04_byoshin-only-plan.md` に作成した。
- 秒針時計化計画に `codex-plan-review` を実施し、レビュー指摘を反映して P0/P1/P2 0件を確認した。
- 今後の機能追加計画でPWA更新確認が漏れないよう、`doc/architecture/00_plan-template.md` を追加し、`AGENTS.md` に計画作成ルールを追記した。
- `doc/operations/handover.md` と `doc/operations/Next-Agent-Prompt.md` を秒針時計化の実装前状態へ更新した。

## 次の1テーマ

`doc/architecture/04_byoshin-only-plan.md` に沿って、既存の計算連動秒針ガイドを、計算結果と連動しない常時表示の「現在秒」時計へ置き換える。

実装時の要点:

- 起動直後から結果パネル下部に秒針時計を表示する。
- 時計は計算結果とは完全に独立させ、滴下間隔を強調・表示しない。
- 時計盤の近くに「現在秒」と「現在時刻の秒です。滴下タイミングを示すものではありません。」を表示する。
- 既存の「次の目印」「2つ先の目印」「色付き範囲」「凡例」「対象外表示」は削除する。
- 入力変更・エラー時の「前回の計算結果」表示は、秒針周辺ではなく結果側の小さな表示欄へ移す。
- `calc.js` に `getSecondClockState(nowMs)` を必須で追加し、固定時刻で針角度を確認できるようにする。
- `app.js` は `Date.now()` を `getSecondClockState(nowMs)` に渡し、SVG属性へ反映するだけにする。
- Service Workerのキャッシュ名は `tenteki-timer-v4` に上げる。
- `AGENTS.md`、`README.md`、`todo/now.md`、引継ぎ文書に残る旧パスを番号付き文書へ統一する。
- 新しい計画を追加する場合は `doc/architecture/00_plan-template.md` を使い、`PWA更新確認` を必ず埋める。

## 未完了・未検証

- 秒針時計化のコード実装は未着手。
- `specs/requirements.md`、`overview.md`、`tech-stack.md`、`01_implementation-plan.md` の秒針時計化反映は未実施。
- `app/tests/calculation-test.html` の秒針時計テスト更新は未実施。
- Service Worker v4への更新と、v3キャッシュ導入済み状態からv4へ更新できることの確認は未実施。
- 秒針時計化後の 320px / 360px、ライト / ダーク、オフライン表示・計算確認は未実施。

## 確認済み

- `app/tests/calculation-test.html`: 秒針ガイド簡素化後のブラウザ実行で `36 / 36 件成功`。
- `node --check app/src/app.js`: 秒針ガイド簡素化後に成功。
- `node --check app/src/calc.js`: 秒針ガイド簡素化後に成功。
- `node --check app/src/service-worker.js`: 秒針ガイド簡素化後に成功。
- `git diff --check`: 秒針ガイド簡素化後に成功。
- 320x640 / 360x640 のダーク表示で `N > 2` / `N = 2` / `N = 1` を確認。
- ライト/ダークの主要コントラストをCSS値から確認。
- Service Worker v3の静的確認: `CACHE_NAME` は `tenteki-timer-v3`、削除対象は `cacheName !== CACHE_NAME && cacheName.startsWith('tenteki-timer-')`。
- v2キャッシュ導入済み状態からv3へ更新できることを確認。
- GitHub Pages `https://rm007080.github.io/12_tenteki-timer/app/src/` で主端末スモーク確認済み。
- iPhone / Android 両方でホーム画面追加、ホーム画面起動、初回オンライン読み込み後の機内モード切替、ホーム画面アイコンからの再起動、オフライン計算を確認済み。
- `doc/architecture/04_byoshin-only-plan.md` は `codex-plan-review` 済みで P0/P1/P2 0件。

## 再開時に使うコマンド

### ローカルHTTP配信

リポジトリルートで次を実行する。

```powershell
python -m http.server 4180 --bind 127.0.0.1
```

### アプリ本体

```text
http://127.0.0.1:4180/app/src/
```

`http://127.0.0.1:4180/` だけを開くと、リポジトリルートの `Directory listing for /` が表示される。これはサーバー起動失敗ではなく、URLのパスがアプリ本体まで届いていない状態。

### ロジックテスト

```text
http://127.0.0.1:4180/app/tests/calculation-test.html
```

秒針時計化実装後は、`getSecondClockState()` のテストを追加し、更新後の全件成功数を確認する。

### 構文確認

```powershell
node --check app/src/app.js
node --check app/src/calc.js
node --check app/src/service-worker.js
git diff --check
```

### ポート確認

```powershell
Get-NetTCPConnection -LocalPort 4180 -State Listen -ErrorAction SilentlyContinue
```

何も表示されなければ閉じている。自分で起動したサーバーを止める場合は、そのPowerShellで `Ctrl + C` を押す。

## 実装時の重要ルール

- HTML / CSS / JavaScript のみで実装する。
- React、ビルドツール、外部API、DB、ユーザーデータ保存APIは追加しない。
- Cache APIはService Workerがアプリ本体ファイルをオフライン利用する目的に限って使う。
- ユーザー入力値、計算結果、利用履歴を永続保存しない。
- `localStorage`、`sessionStorage`、`IndexedDB`、Cookieは使わない。
- 医療判断を代替する表現をUIやドキュメントに入れない。
- UIには「自然滴下の計算補助です。指示・施設ルールに従って確認してください。」を表示する。
- 実装本体は `app/src/` 配下に置く。
- GitHub Pages公開元はリポジトリルート、アプリURLは `/<repo>/app/src/` とする。
- PWAの `start_url`、`scope`、Service Workerのキャッシュ対象は `app/src/` 配下で相対パスが成立する形にする。

## 触らないもの

- `archive/` は元文書の保管場所として扱い、更新しない。
- `data/inputs/`、`app/outbox/`、`logs/` は、明確な目的がある場合以外は触らない。
- `app/tmp/` は一時作業用とし、成果物の正本にしない。
- 実装中にビルドツールや外部依存を追加しない。

## Git作業時の注意

- 現在、アーキテクチャ文書は番号付きファイルへ整理されている。
- `git status` では旧ファイル削除と番号付きファイル追加が見える場合がある。
- 旧パスへ戻さず、実在する番号付き文書を正として扱う。
- ユーザーが明示しない限り、`archive/` や運用データは触らない。
