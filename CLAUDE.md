# Todo App - TDD フルサイクル開発

## プロジェクト概要
React + TypeScript の Todo アプリを TDD で自律開発する

## 技術スタック
- React 18 + TypeScript
- Vite（ビルド）
- Vitest + Testing Library（ユニットテスト）
- Playwright（E2Eテスト）

## 開発ルール

### TDD サイクル（Red → Green → Refactor）
1. **RED**: 失敗するテストを先に書く
2. **GREEN**: テストを通す最小限の実装
3. **REFACTOR**: 重複除去、命名改善

### テスト階層
- **Unit**: 個別コンポーネント・関数のロジック（tests/unit/）
- **E2E**: ユーザー視点での操作フロー（tests/e2e/）

## コマンド
```bash
npm run dev          # 開発サーバー起動 (http://localhost:5173)
npm run test:unit    # ユニットテスト
npm run test:e2e     # E2Eテスト（ヘッドレス）
npm run test:e2e:ui  # E2Eテスト（ブラウザ表示）
npm run test         # 全テスト
npm run typecheck    # 型チェック
npm run lint         # ESLint
```

## 自律開発フロー

### 機能ごとのサイクル
```
specs 確認 → Unit テスト作成 → 失敗確認 → 実装 → パス確認
         → E2E テスト作成 → 失敗確認 → 修正 → パス確認
         → リファクタリング → 全テストパス確認
         → 次の機能へ
```

### 完了条件（EXIT_SIGNAL）
以下が**全て**真になるまでループを継続：
- [ ] `npm run test:unit` が exit code 0
- [ ] `npm run test:e2e` が exit code 0
- [ ] `npm run typecheck` が exit code 0
- [ ] `npm run lint` が exit code 0
- [ ] specs/requirements.md の全機能が実装済み

## ファイル配置ルール
- コンポーネント: `src/components/`
- カスタムフック: `src/hooks/`
- 型定義: `src/types/`
- ユニットテスト: `tests/unit/`
- E2Eテスト: `tests/e2e/`

## テスト命名規則
- ユニットテスト: `*.test.tsx` または `*.test.ts`
- E2Eテスト: `*.spec.ts`

## 禁止事項
- テストを書かずに実装を始めること
- 失敗を確認せずに実装に進むこと
- テストをスキップ/コメントアウトすること
- 完了条件を満たさずに終了すること
