.PHONY: dev test test-unit test-e2e typecheck check install

# 開発サーバー起動
dev:
	npm run dev

# 全テスト実行
test:
	npm run test

# ユニットテストのみ
test-unit:
	npm run test:unit

# E2Eテストのみ
test-e2e:
	npm run test:e2e

# 型チェック
typecheck:
	npm run typecheck

# CI/完了条件チェック（全検証）
check:
	npm run typecheck
	npm run lint
	npm run test

# 依存関係インストール
install:
	npm install
