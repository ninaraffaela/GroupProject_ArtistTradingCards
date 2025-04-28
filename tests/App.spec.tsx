import { test, expect } from '@playwright/test';

test.describe('Artist Trading Cards App', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('should load the app and display the title', async ({ page }) => {
    await expect(page.locator('h1.app-title')).toHaveText('Artist Trading Cards');
  });

  test('should add a new artist card', async ({ page }) => {
    // Fill out the form
    await page.fill('input[name="name"]', 'Billie Eilish');
    await page.fill('input[name="age"]', '21');
    await page.fill('input[name="genre"]', 'Pop');
    await page.fill('input[name="albumsSold"]', '50');
    await page.fill('input[name="origin"]', 'Los Angeles, USA');
    await page.fill('input[name="recordlabel"]', 'Interscope Records');
    await page.fill('input[name="imageUrl"]', 'https://example.com/billie.jpg');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify the card is added
    const cardTitle = page.locator('.artist-card .card-title');
    await expect(cardTitle).toHaveText('Billie Eilish');
  });

  test('should edit an existing artist card', async ({ page }) => {
    // Add a card first
    await page.fill('input[name="name"]', 'Billie Eilish');
    await page.fill('input[name="age"]', '21');
    await page.fill('input[name="genre"]', 'Pop');
    await page.fill('input[name="albumsSold"]', '50');
    await page.fill('input[name="origin"]', 'Los Angeles, USA');
    await page.fill('input[name="recordlabel"]', 'Interscope Records');
    await page.fill('input[name="imageUrl"]', 'https://example.com/billie.jpg');
    await page.click('button[type="submit"]');

    // Click the edit button
    await page.click('.artist-card .edit-button');

    // Update the form
    await page.fill('input[name="name"]', 'Billie Eilish Updated');
    await page.click('button[type="submit"]');

    // Verify the card is updated
    const cardTitle = page.locator('.artist-card .card-title');
    await expect(cardTitle).toHaveText('Billie Eilish Updated');
  });

  test('should delete an artist card', async ({ page }) => {
    // Add a card first
    await page.fill('input[name="name"]', 'Billie Eilish');
    await page.fill('input[name="age"]', '21');
    await page.fill('input[name="genre"]', 'Pop');
    await page.fill('input[name="albumsSold"]', '50');
    await page.fill('input[name="origin"]', 'Los Angeles, USA');
    await page.fill('input[name="recordlabel"]', 'Interscope Records');
    await page.fill('input[name="imageUrl"]', 'https://example.com/billie.jpg');
    await page.click('button[type="submit"]');

    // Click the delete button
    await page.click('.artist-card .delete-button');

    // Verify the card is deleted
    const cardGrid = page.locator('.card-grid');
    await expect(cardGrid).not.toContainText('Billie Eilish');
  });

  test('should save and load cards from local storage', async ({ page }) => {
    // Add a card first
    await page.fill('input[name="name"]', 'Billie Eilish');
    await page.fill('input[name="age"]', '21');
    await page.fill('input[name="genre"]', 'Pop');
    await page.fill('input[name="albumsSold"]', '50');
    await page.fill('input[name="origin"]', 'Los Angeles, USA');
    await page.fill('input[name="recordlabel"]', 'Interscope Records');
    await page.fill('input[name="imageUrl"]', 'https://example.com/billie.jpg');
    await page.click('button[type="submit"]');

    // Save cards to local storage
    await page.click('button.save-button');

    // Reload the page
    await page.reload();

    // Load cards from local storage
    await page.click('button.load-button');

    // Verify the card is loaded
    const cardTitle = page.locator('.artist-card .card-title');
    await expect(cardTitle).toHaveText('Billie Eilish');
  });
});