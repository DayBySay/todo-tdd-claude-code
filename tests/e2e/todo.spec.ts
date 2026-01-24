import { test, expect } from '@playwright/test'

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Todo追加', () => {
    test('テキスト入力欄が表示される', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await expect(input).toBeVisible()
    })

    test('Enterキーで Todo を追加できる', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      await expect(page.getByText('Buy milk')).toBeVisible()
    })

    test('空文字では追加されない', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.press('Enter')

      const listItems = page.locator('li')
      await expect(listItems).toHaveCount(0)
    })

    test('追加後、入力欄がクリアされる', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      await expect(input).toHaveValue('')
    })

    test('追加された Todo は未完了状態', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      const checkbox = page.getByRole('checkbox')
      await expect(checkbox).not.toBeChecked()
    })
  })

  test.describe('Todo一覧表示', () => {
    test('追加した Todo がリスト表示される', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')
      await input.fill('Walk the dog')
      await input.press('Enter')

      await expect(page.getByText('Buy milk')).toBeVisible()
      await expect(page.getByText('Walk the dog')).toBeVisible()
    })

    test('各 Todo にチェックボックスがある', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      const checkbox = page.getByRole('checkbox')
      await expect(checkbox).toBeVisible()
    })

    test('各 Todo に削除ボタン（×）がある', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      const deleteButton = page.getByRole('button', { name: '×' })
      await expect(deleteButton).toBeVisible()
    })

    test('Todo がない場合は空のリスト', async ({ page }) => {
      const listItems = page.locator('li')
      await expect(listItems).toHaveCount(0)
    })
  })

  test.describe('Todo完了トグル', () => {
    test('チェックボックスクリックで完了/未完了切替', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      const checkbox = page.getByRole('checkbox')
      await checkbox.click()
      await expect(checkbox).toBeChecked()

      await checkbox.click()
      await expect(checkbox).not.toBeChecked()
    })

    test('完了 Todo はテキストに打ち消し線', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      const checkbox = page.getByRole('checkbox')
      await checkbox.click()

      const todoText = page.locator('li span').filter({ hasText: 'Buy milk' })
      await expect(todoText).toHaveCSS('text-decoration', /line-through/)
    })
  })

  test.describe('Todo削除', () => {
    test('削除ボタンクリックで Todo 削除', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      const deleteButton = page.getByRole('button', { name: '×' })
      await deleteButton.click()

      await expect(page.getByText('Buy milk')).not.toBeVisible()
    })
  })

  test.describe('フィルタリング', () => {
    test.beforeEach(async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Active task')
      await input.press('Enter')
      await input.fill('Completed task')
      await input.press('Enter')

      const checkboxes = page.getByRole('checkbox')
      await checkboxes.nth(1).click()
    })

    test('All フィルタで全 Todo 表示', async ({ page }) => {
      await page.getByRole('button', { name: 'All' }).click()

      await expect(page.getByText('Active task')).toBeVisible()
      await expect(page.getByText('Completed task')).toBeVisible()
    })

    test('Active フィルタで未完了のみ表示', async ({ page }) => {
      await page.getByRole('button', { name: 'Active' }).click()

      await expect(page.getByText('Active task')).toBeVisible()
      await expect(page.getByText('Completed task')).not.toBeVisible()
    })

    test('Completed フィルタで完了のみ表示', async ({ page }) => {
      await page.getByRole('button', { name: 'Completed' }).click()

      await expect(page.getByText('Active task')).not.toBeVisible()
      await expect(page.getByText('Completed task')).toBeVisible()
    })

    test('デフォルトは All', async ({ page }) => {
      await page.goto('/')
      const allButton = page.getByRole('button', { name: 'All' })
      await expect(allButton).toHaveClass(/selected/)
    })

    test('現在のフィルタがハイライト表示', async ({ page }) => {
      const activeButton = page.getByRole('button', { name: 'Active' })
      await activeButton.click()
      await expect(activeButton).toHaveClass(/selected/)

      const completedButton = page.getByRole('button', { name: 'Completed' })
      await completedButton.click()
      await expect(completedButton).toHaveClass(/selected/)
    })
  })

  test.describe('カウント表示', () => {
    test('未完了 Todo 数を表示', async ({ page }) => {
      await expect(page.getByText('0 items left')).toBeVisible()
    })

    test('1件の場合 "1 item left"', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')

      await expect(page.getByText('1 item left')).toBeVisible()
    })

    test('複数件の場合 "X items left"', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')
      await input.fill('Walk the dog')
      await input.press('Enter')

      await expect(page.getByText('2 items left')).toBeVisible()
    })

    test('完了するとカウントが減る', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Buy milk')
      await input.press('Enter')
      await input.fill('Walk the dog')
      await input.press('Enter')

      await expect(page.getByText('2 items left')).toBeVisible()

      const checkbox = page.getByRole('checkbox').first()
      await checkbox.click()

      await expect(page.getByText('1 item left')).toBeVisible()
    })
  })

  test.describe('複合操作', () => {
    test('追加→完了→フィルタ確認', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')

      // 追加
      await input.fill('Buy milk')
      await input.press('Enter')
      await input.fill('Walk the dog')
      await input.press('Enter')
      await input.fill('Read a book')
      await input.press('Enter')

      await expect(page.getByText('3 items left')).toBeVisible()

      // 完了
      const checkboxes = page.getByRole('checkbox')
      await checkboxes.first().click()
      await checkboxes.nth(2).click()

      await expect(page.getByText('1 item left')).toBeVisible()

      // フィルタ確認
      await page.getByRole('button', { name: 'Active' }).click()
      await expect(page.getByText('Walk the dog')).toBeVisible()
      await expect(page.getByText('Buy milk')).not.toBeVisible()
      await expect(page.getByText('Read a book')).not.toBeVisible()

      await page.getByRole('button', { name: 'Completed' }).click()
      await expect(page.getByText('Walk the dog')).not.toBeVisible()
      await expect(page.getByText('Buy milk')).toBeVisible()
      await expect(page.getByText('Read a book')).toBeVisible()

      await page.getByRole('button', { name: 'All' }).click()
      await expect(page.getByText('Walk the dog')).toBeVisible()
      await expect(page.getByText('Buy milk')).toBeVisible()
      await expect(page.getByText('Read a book')).toBeVisible()
    })
  })

  test.describe('LocalStorage 永続化', () => {
    test('Todo を追加してリロード → 復元される', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Persistent task')
      await input.press('Enter')

      await expect(page.getByText('Persistent task')).toBeVisible()

      await page.reload()

      await expect(page.getByText('Persistent task')).toBeVisible()
    })

    test('Todo を完了にしてリロード → 完了状態が維持される', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Complete me')
      await input.press('Enter')

      const checkbox = page.getByRole('checkbox')
      await checkbox.click()
      await expect(checkbox).toBeChecked()

      await page.reload()

      const reloadedCheckbox = page.getByRole('checkbox')
      await expect(reloadedCheckbox).toBeChecked()
    })

    test('Todo を削除してリロード → 削除が反映される', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Delete me')
      await input.press('Enter')
      await input.fill('Keep me')
      await input.press('Enter')

      await expect(page.getByText('Delete me')).toBeVisible()
      await expect(page.getByText('Keep me')).toBeVisible()

      const deleteButtons = page.getByRole('button', { name: '×' })
      await deleteButtons.first().click()

      await expect(page.getByText('Delete me')).not.toBeVisible()
      await expect(page.getByText('Keep me')).toBeVisible()

      await page.reload()

      await expect(page.getByText('Delete me')).not.toBeVisible()
      await expect(page.getByText('Keep me')).toBeVisible()
    })

    test('フィルター状態はリロードで All にリセットされる', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?')
      await input.fill('Active task')
      await input.press('Enter')
      await input.fill('Completed task')
      await input.press('Enter')

      const checkboxes = page.getByRole('checkbox')
      await checkboxes.nth(1).click()

      await page.getByRole('button', { name: 'Completed' }).click()
      await expect(page.getByRole('button', { name: 'Completed' })).toHaveClass(/selected/)

      await page.reload()

      await expect(page.getByRole('button', { name: 'All' })).toHaveClass(/selected/)
      await expect(page.getByText('Active task')).toBeVisible()
      await expect(page.getByText('Completed task')).toBeVisible()
    })
  })
})
