# 点滴タイマー 引継ぎメモ

## 現在地

- 標準ワークスペース化は完了している。
- MVP本体は `app/src/` に実装済み。
- 計算ロジック確認用の静的テストは `app/tests/calculation-test.html` にある。
- Service Worker、manifest、仮アイコンを含む静的PWA構成は実装済み。
- `app/src/` のHTTP配信、UI挙動、Service Worker登録、オフライン表示、オフライン計算は実ブラウザで確認済み。
- 秒針ガイド機能は `doc/architecture/byosingaido-plan.md` に沿って実装済み。
- 秒針ガイド簡素化は `doc/architecture/byosingaido-simplify-plan.md` に沿って実装済み。
- Service Workerのキャッシュ名は `tenteki-timer-v3` に更新済み。
- Service Workerの旧キャッシュ削除対象は、`tenteki-timer-` で始まるCacheだけに限定済み。
- `app/tests/calculation-test.html` は簡素化後も 36 / 36 件成功を確認済み。
- 320x640 / 360x640 のダーク表示で、通常間隔 `N > 2`、短間隔 `N = 2`、短間隔 `N = 1` の秒針ガイド表示を確認済み。
- 上記ブラウザ確認では、横スクロールなし、盤面内基準目盛りなし、盤面内「次」「2つ先」ラベルなし、外側凡例あり、秒針・目印・色付き範囲表示を確認済み。
- ライト/ダークの主要テキストとガイド線コントラストはCSS値から確認済み。
- ブラウザ評価コンテキストでは `navigator.serviceWorker` / `caches` が読めず、実Cache一覧によるv2→v3更新確認は未完了。
- GitHub Pages URLでの主端末スモーク確認、iPhone / Android実機ホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算は未完了。
- ローカルプレビュー、ポート起動・停止、`Directory listing for /` の切り分けは `logs/2026-05-24_local-preview-port-troubleshooting.md` に記録済み。ただし `logs/*` は `.gitignore` 対象なので、通常の `git status` には出ない。

## 最初に読むもの

1. `AGENTS.md`
2. `README.md`
3. `specs/requirements.md`
4. `doc/architecture/overview.md`
5. `doc/architecture/tech-stack.md`
6. `doc/architecture/implementation-plan.md`
7. `doc/architecture/byosingaido-plan.md`
8. `doc/architecture/byosingaido-simplify-plan.md`
9. `todo/now.md`

## 正本

- 要件: `specs/requirements.md`
- アーキテクチャ: `doc/architecture/overview.md`
- 技術スタック: `doc/architecture/tech-stack.md`
- MVP実装チェックリスト: `doc/architecture/implementation-plan.md`
- 秒針ガイド計画: `doc/architecture/byosingaido-plan.md`
- 秒針ガイド簡素化チェックリスト: `doc/architecture/byosingaido-simplify-plan.md`
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
- 秒針ガイド計画へ残P1/P2を反映し、最終レビューで P0/P1/P2 0件を確認した。
- 秒針ガイドの計算ロジック、UI、タイマー管理、Service Worker v2更新、ロジックテスト、関連文書更新を実装した。
- 秒針ガイド簡素化計画を作成し、`codex-plan-review` の指摘を反映した。
- 秒針ガイド簡素化計画をフェーズ別チェックリストへ再構成した。
- SVG盤面内の12 / 3 / 6 / 9時基準目盛りと「次」「2つ先」テキストを削除した。
- 外側凡例をSVG直前へ移し、文言を「実線: 次の目印」「破線: 2つ先の目印」に更新した。
- `app.js` からラベルDOM参照、`setLabelByAngle()`、ラベル表示制御を削除した。
- `calc.js` の `getSecondGuideState()` から `showDialLabels` を削除した。
- 目印線の長さ判定を `app.js` 側の `intervalSeconds > 2` に集約した。
- 読み上げ用固定文を「実線が次の目印、破線が2つ先の目印です」を含む文言へ更新した。
- `style.css` から `.guide-reference` と `.guide-label` を削除した。
- Service Workerのキャッシュ名を `tenteki-timer-v3` に更新した。
- Service Workerの旧キャッシュ削除対象を `tenteki-timer-` で始まるCacheだけに限定した。
- `doc/architecture/byosingaido-plan.md`、`doc/architecture/byosingaido-simplify-plan.md`、`doc/architecture/implementation-plan.md`、`todo/now.md` を現状に合わせて更新した。

## 直近の確認結果

- `app/tests/calculation-test.html`: ブラウザ実行で `36 / 36 件成功`。
- `node --check app/src/app.js`: 成功。
- `node --check app/src/calc.js`: 成功。
- `node --check app/src/service-worker.js`: 成功。
- `git diff --check`: 成功。改行コード警告のみ。
- `rg` で `guide-reference`、`guide-label`、`guide-next-label`、`guide-following-label`、`setLabelByAngle` が `app/src` / `app/tests` に残っていないことを確認。
- `rg` で `showDialLabels` が `app/src` / `app/tests` に残っていないことを確認。
- 320x640 / 360x640 のダーク表示で `N > 2` / `N = 2` / `N = 1` を確認。
- ライト/ダークの主要コントラストはCSS値から確認。通常文字・ガイド線とも基準目安を満たす。
- Service Worker v3の静的確認: `CACHE_NAME` は `tenteki-timer-v3`、削除対象は `cacheName !== CACHE_NAME && cacheName.startsWith('tenteki-timer-')`。
- 静的な削除条件では `tenteki-timer-v1` / `tenteki-timer-v2` が削除対象、`tenteki-timer-v3` / `unrelated-cache` は保持対象。

## 未完了

### 次の1テーマ

v2キャッシュ導入済み状態からv3へ更新できることを実ブラウザまたは実機相当で確認し、その後GitHub Pages URLとiPhone / Android実機PWA確認を行ってMVP完了条件を閉じる。

### 残タスク

1. v2キャッシュ導入済み状態を作る。
2. v2状態からv3へ更新する。
3. Service Workerが有効化されることを確認する。
4. `tenteki-timer-v2` が削除されることを確認する。
5. 無関係Cacheが削除されないことを確認する。
6. 更新後UIが表示されることを確認する。
7. オフライン再読み込みできることを確認する。
8. オフラインで計算できることを確認する。
9. GitHub Pages `https://rm007080.github.io/12_tenteki-timer/app/src/` で主端末スモーク確認を行う。
10. iPhone / Android 両方でホーム画面追加、ホーム画面起動、初回オンライン読み込み後の機内モード切替、ホーム画面アイコンからの再起動、オフライン計算を確認する。
11. MVP完了条件を閉じられる場合は `doc/architecture/implementation-plan.md` と `todo/now.md` に反映する。

## 再開時に実行するコマンド

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

直近の確認結果は `36 / 36 件成功`。

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

## 検証方針

- ロジック確認は `app/tests/calculation-test.html` をブラウザで開く方式にする。
- Service Worker確認は `file://` ではなく、`app/src/` をローカルHTTPサーバーで配信して行う。
- 手動確認項目は `doc/architecture/byosingaido-simplify-plan.md` のフェーズ7〜8に従う。
- v2からv3への更新確認時は、v2状態のタブまたはPWAを閉じて再起動するか、DevToolsで `waiting` / `activated` 状態を確認してから再読み込みする。
- MVP完了判定では、iPhone / Android 両方でホーム画面追加とオフライン再起動後の計算を確認する。
- この環境のブラウザ評価では `navigator.serviceWorker` / `caches` が読めなかったため、実Cache更新確認はDevToolsまたは実機側で行う。

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

## 注意点

- `doc/architecture/byosingaido-simplify-plan.md` は現在の `git status` では未追跡ではなく、作業ツリー上で変更済み。
- 直近の変更ファイルは `app/src/`、`app/tests/calculation-test.html`、`doc/architecture/`、`doc/operations/`、`todo/now.md`。
- スマホ実機のホーム画面追加確認は未完了。
- MVP完了条件のうち `PWAとしてホーム画面に追加できる` は未完了のまま残す。
