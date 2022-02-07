import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/form1");
});

test.describe("画面遷移テスト", () => {
  test("ページタイトルの確認", async ({ page }) => {
    const t = await page.title();
    expect(t).toBe("react-testing");
  });
  test("form1へ入力後、画面遷移", async ({ page }) => {
    await page.fill("text=FirstName", "Kazuhiro");
    await page.fill("text=LastName", "Yamahita");
    await page.locator("text=次の画面へ").click();
    const url = await page.url();
    expect(url).toBe("http://localhost:3000/form2");
  });

  test("バリデーションエラーの場合、画面遷移しない", async ({ page }) => {
    await page.fill("text=FirstName", "Kazuhiro");
    await page.fill("text=LastName", "");
    await page.locator("text=次の画面へ").click();
    const url = await page.url();
    expect(url).toBe("http://localhost:3000/form1");
  });
});
