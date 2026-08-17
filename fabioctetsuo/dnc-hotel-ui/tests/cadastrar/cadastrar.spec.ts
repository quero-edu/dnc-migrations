import { test, expect } from '@playwright/test';

test('Deve cadastrar um usuário com sucesso!', async ({ page }) => {
  await page.goto('http://localhost:3001/cadastrar');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hotel DNC/i);
  await page.getByLabel(/digite o nome completo/i).fill('Teste DNC');
  await page.getByLabel(/e-mail/i).fill('teste@dnc.com.br');
  await page.getByLabel(/^senha/i).fill('12345');
  await page.getByLabel(/confirmar senha/i).fill('12345');
  await page.getByLabel(/^sim/i).click()
  await page.getByRole('button', { name: /^cadastrar-se/i }).click()
  await expect(page).toHaveURL('http://localhost:3001/login')
});