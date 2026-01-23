# Todo App - TDD フルサイクル開発

Claude Code を使った自律的 TDD 開発のサンプルプロジェクト。

## 概要

このプロジェクトは、Claude Code の自律的フルサイクル開発を試すためのテンプレートです。
React + TypeScript の Todo アプリを TDD（テスト駆動開発）で実装します。

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **ユニットテスト**: Vitest + Testing Library
- **E2Eテスト**: Playwright
- **Lint**: ESLint

## セットアップ

```bash
# 依存関係インストール
npm install

# Playwright ブラウザインストール
npx playwright install chromium
```

## 使い方

### Claude Code でフルサイクル開発

```bash
claude

# フルサイクル開発を開始
> /fullcycle

# または直接指示
> CLAUDE.md の指示に従い、specs/requirements.md の全機能を
> TDDで実装してください。完了条件を全て満たすまで自律的にループしてください。
```

### 単一機能の TDD

```bash
claude

> /tdd Todo追加機能
```

### 手動でテスト実行

```bash
# 開発サーバー起動
npm run dev

# ユニットテスト
npm run test:unit

# E2Eテスト（ヘッドレス）
npm run test:e2e

# E2Eテスト（ブラウザ表示）
npm run test:e2e:ui

# 全テスト
npm run test

# 型チェック
npm run typecheck

# Lint
npm run lint
```

## プロジェクト構造

```
todo-tdd-claude-code/
├── .claude/
│   ├── commands/
│   │   ├── fullcycle.md    # /fullcycle コマンド
│   │   └── tdd.md          # /tdd コマンド
│   └── agents/
│       ├── test-writer.md  # テスト作成エージェント
│       └── implementer.md  # 実装エージェント
├── specs/
│   └── requirements.md     # 機能要件
├── src/
│   ├── components/         # Reactコンポーネント
│   ├── hooks/              # カスタムフック
│   └── types/              # 型定義
├── tests/
│   ├── unit/               # Vitest ユニットテスト
│   └── e2e/                # Playwright E2Eテスト
├── CLAUDE.md               # Claude Code 指示書
└── package.json
```

## TDD サイクル

1. **RED**: 失敗するテストを先に書く
2. **GREEN**: テストを通す最小限の実装
3. **REFACTOR**: コード品質を改善

## 完了条件

以下が全て真になるまでループ：

- `npm run test:unit` → exit code 0
- `npm run test:e2e` → exit code 0
- `npm run typecheck` → exit code 0
- `npm run lint` → exit code 0

## オプション: Ralph Loop

より確実な自律ループのために Ralph Loop プラグインを使用できます。

```bash
# Claude Code 内で
> /plugin install ralph-wiggum@claude-plugins-official
```

## ライセンス

MIT
