---
description: 単一機能をTDDで実装
---

# TDD実装: $ARGUMENTS

指定された機能をTDDサイクル（Red→Green→Refactor）で実装する。

## 手順

### 1. テスト作成（RED）
「$ARGUMENTS」機能のユニットテストを作成する。

- tests/unit/ にテストファイル作成
- 期待する振る舞いをテストで表現
- エッジケースも考慮

```bash
npm run test:unit
```
→ **失敗を確認**（失敗しなければテストが不十分）

### 2. 実装（GREEN）
テストを通す**最小限**のコードを実装する。

- 余計な機能を追加しない
- テストが要求するものだけ実装

```bash
npm run test:unit
```
→ **パスを確認**（失敗したら修正してリトライ）

### 3. E2Eテスト
ユーザー視点のE2Eテストを追加する。

- tests/e2e/ にテスト追加
- 実際のユーザー操作をシミュレート

```bash
npm run test:e2e
```
→ パスを確認

### 4. リファクタリング
テストがパスした状態でコード品質を改善する。

- 重複除去
- 命名改善
- 構造整理

```bash
npm run test
```
→ 全テストがパスすることを確認

### 5. 完了確認
```bash
npm run test && npm run typecheck && npm run lint
```
→ 全て成功で完了
