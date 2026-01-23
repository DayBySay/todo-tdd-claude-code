---
description: TDDフルサイクル開発を自律実行
---

# フルサイクル開発開始

specs/requirements.md の全機能をTDDで実装する。
完了条件を満たすまで自律的にループを継続する。

## 実行手順

### 1. 環境確認
```bash
npm install
npx playwright install chromium
```

### 2. 要件確認
specs/requirements.md を読み、実装する機能リストを把握する。

### 3. 機能ごとにTDDサイクル実行

以下の機能を順番に実装する：
1. Todo追加
2. Todo一覧表示
3. Todo完了トグル
4. Todo削除
5. フィルタリング
6. カウント表示

各機能について以下を繰り返す：

#### A. ユニットテスト作成（RED）
- tests/unit/ にテストファイル作成
- `npm run test:unit` で**失敗を確認**
- 失敗しなければテストが不十分なので修正

#### B. 実装（GREEN）
- src/ にコンポーネント・ロジック実装
- `npm run test:unit` で**パスを確認**
- 失敗したら修正してリトライ

#### C. E2Eテスト作成
- tests/e2e/ にPlaywrightテスト作成
- `npm run test:e2e` で確認
- 失敗したら実装を修正してリトライ

#### D. リファクタリング
- コード品質改善（重複除去、命名改善）
- 全テスト再実行でパス確認

### 4. 完了判定

以下のコマンドを実行：
```bash
npm run test:unit && npm run test:e2e && npm run typecheck && npm run lint
```

**全て成功（exit code 0）するまで Step 3 に戻る。**

## 完了条件
- `npm run test:unit` → exit code 0
- `npm run test:e2e` → exit code 0
- `npm run typecheck` → exit code 0
- `npm run lint` → exit code 0
- specs/requirements.md の全チェックボックスが実装済み

## 注意事項
- 途中で止まらない
- テストが落ちたら原因を特定し、修正し、再実行
- 完了条件を全て満たすまでループを継続
