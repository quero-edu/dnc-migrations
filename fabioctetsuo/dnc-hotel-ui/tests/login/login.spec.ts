import { test, expect } from '@playwright/test';

test('Deve realizar a autenticação com sucesso!', async ({ page }) => {
  await page.goto('http://localhost:3001/');

  await expect(page).toHaveURL('http://localhost:3001/login');
  
  await page.getByLabel(/e-mail/i).fill('fabio@teste.com');
  await page.getByLabel(/^senha/i).fill('12345');
  await page.getByRole('button', { name: /^continuar/i }).click()
  
  await expect(page).toHaveURL('http://localhost:3001/')
});

test('Deve manter o usuário na tela de login caso senha inválida!', async ({ page }) => {
  await page.goto('http://localhost:3001/');

  await expect(page).toHaveURL('http://localhost:3001/login');
  
  await page.getByLabel(/e-mail/i).fill('fabio@teste.com');
  await page.getByLabel(/^senha/i).fill('senhainvalida');
  await page.getByRole('button', { name: /^continuar/i }).click()
  
  await expect(page).toHaveURL('http://localhost:3001/login')
});

test('Deve pedir pra preencher campos obrigatórios!', async ({ page }) => {
  await page.goto('http://localhost:3001/');

  await expect(page).toHaveURL('http://localhost:3001/login');
  
  await page.getByLabel(/e-mail/i).fill('fabio@teste.com');
  await page.getByRole('button', { name: /^continuar/i }).click()
  
  await expect(page).toHaveURL('http://localhost:3001/login')
  await expect(page.getByLabel(/^senha/i)).toBeFocused()
});