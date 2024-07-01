// helpers.js
const { expect } = require('@playwright/test');

async function login(page) {
  const userName = 'admin';
  const password = 'devLab08@';
  const url ='http://localhost:8000/Util/Login?ReturnUrl=/en/'

  // Navigate to the login page
  await page.goto(url);

  // Locate input by CSS Selector and fill it
/*
  const usernameInput = await page.$('#UserName');
  await usernameInput.fill(userName);

  const passwordInput = await page.$('#Password');
  await passwordInput.fill(password);
*/

	await page.fill('#UserName', userName);
	await page.fill('#Password', password);

  // Click the login button
/*
  const loginButton = await page.$('#Submit');
  await loginButton.click();
*/
	await page.click('#Submit');
	
  // Optionally, wait for navigation or some post-login element to appear
  //await page.$('//*[@id="epi-quickNavigator-clickHandler"]');
  
  // Wait for a post-login element to appear to ensure login is successful
  await page.waitForSelector('#epi-quickNavigator-clickHandler');
  
}
async function gotoAdminPage(page) {
	await login(page);	
	// Go to the Admin page 
	//await page.locator('[id="epi-quickNavigator-clickHandler"]').click();
	await page.click('#epi-quickNavigator-clickHandler');
	
	//const element = await page.getByText('CMS Edit');
	//await element.click();
	await page.getByText('CMS Edit').click();
	
	// Verify CMS Admin page is shown by checking for specific elements 
	// Icons Optimizely, CMS on main menu:
	await expect(page.getByText('Optimizely')).toBeVisible();
	await expect(page.getByText('CMS')).toBeVisible();
	// or
	await page.waitForSelector('text=Optimizely');
	await page.waitForSelector('text=CMS');
}	
async function gotoEditmode(page) {
	await gotoAdminPage(page);
	// Click the sidebar link to go to Edit mode
	const sidebarLink = await page.locator('#sideBarNavigationRoot').locator('div:nth-child(2) > div > a');
	await sidebarLink.click();
	
	// Verify specific elements in the Edit mode
	//Verify Options menu is shown
	await expect(page.locator('#dijit_form_DropDownButton_15_label')).toBeVisible();
	//Verify Toggle navigation pane is shown
	await expect(page.locator('//*[@id="uniqName_52_59"]/span[1]')).toBeVisible();
	//Toggle Assets pane 
	await expect(page.locator('#uniqName_52_62 > span.dijitReset.dijitInline.dijitIcon.epi-iconFolders')).toBeVisible();
}	
async function createForms(page) {
	await gotoEditmode(page);
	//Click on Toggle Assets pane 
	await page.click('#uniqName_52_62 > span.dijitReset.dijitInline.dijitIcon.epi-iconFolders');
	
	//Click on Pin
	await page.click('#dijit_form_ToggleButton_8 > span.dijitReset.dijitInline.dijitIcon.epi-iconPin');

	//Click on Forms
	await page.click('#uniqName_52_120 > span.dijitReset.dijitInline.dijitIcon.epi-iconCreateSharedBlock');
}	
module.exports = { login, gotoAdminPage, gotoEditmode, createForms };

