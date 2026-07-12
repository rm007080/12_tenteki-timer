# 点滴タイマー 引継ぎメモ

## 現在地

- MVP v1.0 は完了済み。
- 標準ワークスペース化は完了済み。
- MVP本体は `app/src/` に実装済み。
- 計算ロジック確認用の静的テストは `app/tests/calculation-test.html` にある。
- Service Worker、manifest、仮アイコンを含む静的PWA構成は実装済み。
- 秒針ガイド機能と秒針ガイド簡素化は実装済み。
- 現行Service Workerのキャッシュ名は `tenteki-timer-v5`。
- セキュリティレビューを実施済み(`doc/analysis/security-review.md`)。CSPメタタグ追加、SW登録の `app.js` 移設、仕様必須の秒時計注記追加、タブ復帰時の秒針再同期を実装済み。
- Service Workerの旧キャッシュ削除対象は、`tenteki-timer-` で始まるCacheだけに限定済み。
- GitHub Pages URLで主端末スモーク確認済み。
- iPhone / Android 両方でホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算を確認済み。
- 秒針ガイドを常時表示の現在秒時計へ置き換える改善は実装済み。
- `04_byoshin-only-plan.md` は `codex-plan-review` 済み。シニアエンジニア観点と UI/UX 観点のサブレビューを実施し、最終的に P0/P1/P2 0件を確認済み。
- 現在秒時計化後のロジックテスト、構文確認、ブラウザ確認、v3からv4へのPWA更新確認、オフライン表示・計算確認は完了済み。
- 現時点の次テーマは未設定。

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
- 秒針時計化を実装し、起動直後から結果パネル下部に常時表示される現在秒時計へ置き換えた。
- 時計盤に 0, 5, 10 ... 55 の数字、60本目盛り、5秒ごとの長い目盛りを表示した。
- 計算連動の次目印、2つ先目印、色付き範囲、凡例、対象外表示、ガイド状態文を削除した。
- 前回結果表示を結果側の小さな表示欄へ移し、計算成功時に消えるようにした。
- `calc.js` に `getSecondClockState(nowMs)` を追加し、`getSecondGuideState()` とガイド専用戻り値を削除した。
- Service Workerのキャッシュ名を `tenteki-timer-v4` に更新した。
- `specs/requirements.md`、`overview.md`、`tech-stack.md`、`01_implementation-plan.md`、`README.md`、`AGENTS.md`、`todo/now.md` を現在秒時計仕様へ更新した。

## 次の1テーマ

現時点の次テーマは未設定。

新しい計画を追加する場合は `doc/architecture/00_plan-template.md` を使い、`PWA更新確認` を必ず埋める。

## 未完了・未検証

- 現時点で把握している未完了タスクはない。
- 次の改善テーマは未設定。

## 確認済み

- `app/tests/calculation-test.html`: 秒針時計化後のブラウザ実行で `25 / 25 件成功`。
- `node --check app/src/app.js`: 秒針時計化後に成功。
- `node --check app/src/calc.js`: 秒針時計化後に成功。
- `node --check app/src/service-worker.js`: 秒針時計化後に成功。
- `git diff --check`: 秒針時計化後に成功。
- 320px / 360px 幅のフレーム検証で横スクロールなし、時計SVG幅200px、60本目盛り、12個の数字を確認。
- ダークテーマの主要時計色はCSS値から、本文14.82:1、補助文9.01:1、秒針13.01:1、1秒目盛り11.05:1、盤面外周3.33:1を確認。
- 初期表示で時計盤が表示され、時計の毎秒更新が live region のテキストを更新しないことを確認。
- 入力変更・入力エラー時に前回結果表示が結果側に出ること、次の計算成功時に消えることを確認。
- v3キャッシュ導入済み状態からv4へ更新でき、更新後に `tenteki-timer-v3` が削除され `tenteki-timer-v4` だけになることを確認。
- v4更新後、ローカルHTTPサーバー停止状態でも時計盤付き表示と計算ができることを確認。
- 秒針ガイド簡素化時に、320x640 / 360x640 のダーク表示で `N > 2` / `N = 2` / `N = 1` を確認済み。
- 秒針ガイド簡素化時に、ライト/ダークの主要コントラストをCSS値から確認済み。
- Service Worker v4の静的確認: `CACHE_NAME` は `tenteki-timer-v4`、削除対象は `cacheName !== CACHE_NAME && cacheName.startsWith('tenteki-timer-')`。
- 秒針ガイド簡素化時に、v2キャッシュ導入済み状態からv3へ更新できることを確認済み。
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

`localhost:4180` は環境によって `::1` 側へ解決され、`--bind 127.0.0.1` のサーバーに届かず `ERR_CONNECTION_REFUSED` になる場合がある。確認URLは `http://127.0.0.1:4180/app/src/` を優先する。

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

起動したPowerShellが分からない場合は、4180番ポートを使っているプロセスIDだけを止める。

```powershell
$serverPid = (Get-NetTCPConnection -LocalPort 4180 -State Listen -ErrorAction SilentlyContinue).OwningProcess
if ($serverPid) { Stop-Process -Id $serverPid }
```

停止後はもう一度 `Get-NetTCPConnection -LocalPort 4180 -State Listen -ErrorAction SilentlyContinue` を実行し、何も表示されないことを確認する。

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
