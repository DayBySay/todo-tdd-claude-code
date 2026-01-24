# Todo App Architecture

## ディレクトリ構成

```
src/
├── components/     # UI コンポーネント
│   ├── TodoInput.tsx    # Todo 入力フォーム
│   ├── TodoItem.tsx     # 個別 Todo 表示
│   ├── TodoList.tsx     # Todo リスト表示
│   ├── TodoFilter.tsx   # フィルタ切り替え
│   └── TodoCount.tsx    # 未完了カウント表示
├── hooks/          # カスタムフック
│   └── useLocalStorage.ts  # LocalStorage 永続化
├── types/          # 型定義
│   └── todo.ts     # Todo, FilterType
├── utils/          # ユーティリティ関数
│   ├── filterTodos.ts     # フィルタリング処理
│   └── countActiveTodos.ts # 未完了カウント
├── App.tsx         # ルートコンポーネント（状態管理）
└── main.tsx        # エントリーポイント
```

## コンポーネント階層

```
App (状態管理: todos, filter)
├── TodoInput
│   └── onAdd コールバックで新規 Todo を親に通知
├── TodoList
│   └── TodoItem[]
│       ├── onToggle コールバックで完了状態切り替え
│       └── onDelete コールバックで削除
├── TodoFilter
│   └── onFilterChange コールバックでフィルタ変更
└── TodoCount
    └── count を props で受け取り表示
```

## データフロー

```
[ユーザー操作]
      ↓
[子コンポーネント] → コールバック実行
      ↓
[App] → 状態更新 (setTodos / setFilter)
      ↓
[useLocalStorage] → LocalStorage に永続化
      ↓
[再レンダリング] → 子コンポーネントに props 伝播
```

- **単方向データフロー**: React の標準パターンに従う
- **状態の一元管理**: App コンポーネントが全状態を保持
- **イベントの上方伝播**: 子はコールバックで親に通知

## 状態管理

| 状態 | 保持場所 | 永続化 | 説明 |
|-----|---------|--------|------|
| `todos` | App (useLocalStorage) | LocalStorage | Todo リスト |
| `filter` | App (useState) | なし | 現在のフィルタ条件 |

### useLocalStorage フック

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```

- 初期化時に LocalStorage から値を読み込み
- 値更新時に自動で LocalStorage に書き込み
- LocalStorage が使えない環境では通常の useState として動作

## 型定義

### Todo

```typescript
interface Todo {
  id: string       // ユニーク識別子
  text: string     // Todo のテキスト
  completed: boolean // 完了状態
}
```

### FilterType

```typescript
type FilterType = 'all' | 'active' | 'completed'
```

## ユーティリティ関数

### filterTodos

```typescript
function filterTodos(todos: Todo[], filter: FilterType): Todo[]
```

フィルタ条件に応じた Todo リストを返す。

### countActiveTodos

```typescript
function countActiveTodos(todos: Todo[]): number
```

未完了の Todo 数を返す。
