# 点滴タイマー

自然滴下の残量と終了予定時刻から滴下速度の目安を計算する個人利用向けPWA。

## 最初に見る場所

| 目的 | ファイル |
|------|------|
| 何を作るか | [specs/requirements.md](specs/requirements.md) |
| 全体構成 | [doc/architecture/overview.md](doc/architecture/overview.md) |
| 技術選定 | [doc/architecture/tech-stack.md](doc/architecture/tech-stack.md) |
| 実装計画テンプレート | [doc/architecture/00_plan-template.md](doc/architecture/00_plan-template.md) |
| 実装計画 | [doc/architecture/01_implementation-plan.md](doc/architecture/01_implementation-plan.md) |
| 引継ぎと運用メモ | [doc/operations/handover.md](doc/operations/handover.md) |
| 現在進行 | [todo/now.md](todo/now.md) |

## 正本

このプロジェクトでは、標準ディレクトリ側の文書を正本として扱う。

- [specs/requirements.md](specs/requirements.md): MVP v1.0 の要件定義
- [doc/architecture/overview.md](doc/architecture/overview.md): PWA構成とファイル責務
- [doc/architecture/tech-stack.md](doc/architecture/tech-stack.md): 採用技術と採用しない技術

ルート直下の `tenteki-timer-*.md` は初期作成時の元文書として残す。今後の更新は、上記の標準ディレクトリ側に反映する。

## 標準構成

```text
.
├── README.md
├── AGENTS.md
├── config.yaml
├── specs/
├── doc/
├── todo/
├── data/inputs/
├── app/
├── logs/
└── archive/
```

## このプロジェクトの形

- 主なランタイム: `HTML / CSS / JavaScript の静的PWA`
- 主な入力: `残量、終了予定時刻、滴下係数`
- 主な出力: `mL/h、滴/分、秒/滴、GitHub Pages向け静的アプリ`
- 公開形態: GitHub Pages で公開する静的PWA
- 保存方針: 個人情報、入力値、計算履歴は保存しない

## 現在の状態

- MVP v1.0 は完了済み。
- `app/src/` に静的PWAの実装ファイル一式がある。
- 計算ロジック、入力検証、丸め処理は `app/tests/calculation-test.html` と手動確認で確認済み。
- `manifest.json` と `service-worker.js` によるオフライン利用を確認済み。
- GitHub Pages URLと iPhone / Android 両方のホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算を確認済み。
- 秒針ガイドを常時表示の現在秒時計へ置き換える改善は実装済み。詳細は [doc/architecture/04_byoshin-only-plan.md](doc/architecture/04_byoshin-only-plan.md) と [doc/architecture/01_implementation-plan.md](doc/architecture/01_implementation-plan.md) のフェーズ9を参照する。
- Service Workerの現行キャッシュ名は `tenteki-timer-v4`。
