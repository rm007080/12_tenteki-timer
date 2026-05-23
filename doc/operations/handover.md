# 点滴タイマー 引継ぎメモ

## 現在地

- 標準ワークスペース化は完了している。
- MVP本体は `app/src/` に実装済み。
- 計算ロジック確認用の静的テストは `app/tests/calculation-test.html` にある。
- Service Worker、manifest、仮アイコンを含む静的PWA構成は実装済み。
- `app/src/` のHTTP配信、UI挙動、Service Worker登録、オフライン表示、オフライン計算は実ブラウザで確認済み。
- 秒針ガイド機能は `doc/architecture/byosingaido-plan.md` に沿って実装済み。
- `app/tests/calculation-test.html` は 36 / 36 件成功を確認済み。
- 秒針ガイドは、計算前非表示、計算後表示、毎秒更新、前回結果表示、対象外表示、短間隔ラベル非表示、360x640 / 320x640 の横スクロールなしを確認済み。
- サーバー停止後の再読み込みで、オフライン相当でも秒針ガイド付きの計算ができることを確認済み。
- 秒針ガイド簡素化計画を `doc/architecture/byosingaido-simplify-plan.md` に作成し、`codex-plan-review` と `plan-to-checklist` を実施済み。
- 秒針ガイド簡素化計画の最終レビューは、シニアエンジニア観点・UI/UX観点ともに P0/P1/P2 0件。
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
- `app/tests/calculation-test.html` で 36 / 36 件成功を確認した。
- 秒針ガイド簡素化計画を作成し、`codex-plan-review` の指摘を反映した。
- 秒針ガイド簡素化計画をフェーズ別チェックリストへ再構成した。

## 未完了

### 次に実装するテーマ

- `doc/architecture/byosingaido-simplify-plan.md` フェーズ1〜3に沿って、秒針ガイドの盤面内表示を簡素化する。
- SVG盤面内の12/3/6/9時基準目盛りと「次」「2つ先」テキストを削除する。
- 外側凡例をSVG直前へ移し、文言を「実線: 次の目印」「破線: 2つ先の目印」にする。
- `app.js` のラベルDOM参照、`setLabelByAngle()`、ラベル表示制御を削除する。
- `calc.js` の `getSecondGuideState()` から `showDialLabels` を削除する。
- 目印線の長さ判定は `app.js` 側の `var usesLongMarkers = state.intervalSeconds > 2` として明示する。
- Service Workerのキャッシュ名を `tenteki-timer-v3` に更新する。
- Service Workerの旧キャッシュ削除は `tenteki-timer-` で始まるキャッシュだけを対象にし、無関係Cacheを削除しない。

### 実装後の確認

- `app/tests/calculation-test.html` から `showDialLabels` 前提の確認を削除し、角度・次目印・2つ先目印・範囲角度の確認は維持する。
- ローカルHTTP配信でロジックテストを全件成功させる。
- 320x640 / 360x640 × ライト/ダーク × `N > 2` / `N = 2` / `N = 1` で、横スクロールなし、秒針、次目印、2つ先目印、色付き範囲、凡例が読めることを確認する。
- v2キャッシュ導入済み状態からv3へ更新できることを確認する。
- `tenteki-timer-v2` が削除され、無関係Cacheが削除されないことを確認する。
- GitHub Pages URLで主端末スモーク確認を行う。
- iPhone / Android 両方でホーム画面追加、ホーム画面起動、初回オンライン読み込み後の機内モード切替、ホーム画面アイコンからの再起動、オフライン計算を確認する。
- MVP完了条件の最終確認を行い、完了できる場合は `doc/architecture/implementation-plan.md` と `todo/now.md` に反映する。

## 次の1テーマ

`doc/architecture/byosingaido-simplify-plan.md` に沿って、秒針ガイドの盤面内表示を簡素化し、Service Workerを `tenteki-timer-v3` へ更新したうえで、ブラウザ表示、v2導入済み状態からv3へのPWA更新、スマホ実機ホーム画面追加、MVP完了条件を確認する。

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

直近の確認結果は `36 / 36 件成功`。簡素化実装後は、`showDialLabels` 前提の確認を削除したうえで再実行する。

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

## 検証方針

- ロジック確認は `app/tests/calculation-test.html` をブラウザで開く方式にする。
- Service Worker確認は `file://` ではなく、`app/src/` をローカルHTTPサーバーで配信して行う。
- 手動確認項目は `doc/architecture/byosingaido-simplify-plan.md` のフェーズ6〜8に従う。
- v2からv3への更新確認時は、v2状態のタブまたはPWAを閉じて再起動するか、DevToolsで `waiting` / `activated` 状態を確認してから再読み込みする。
- MVP完了判定では、iPhone / Android 両方でホーム画面追加とオフライン再起動後の計算を確認する。

## 触らないもの

- `archive/` は元文書の保管場所として扱い、更新しない。
- `data/inputs/`、`app/outbox/`、`logs/` は、明確な目的がある場合以外は触らない。
- `app/tmp/` は一時作業用とし、成果物の正本にしない。
- 実装中にビルドツールや外部依存を追加しない。

## 注意点

- `doc/architecture/byosingaido-simplify-plan.md` は新規作成された計画ファイルで、現時点の `git status` では未追跡。
- 秒針ガイド簡素化の実装はまだ未着手。
- Service Worker v3更新確認は、既存v2キャッシュ導入済み状態を作ってから行う。
- スマホ実機のホーム画面追加確認は未完了。
