const { test, expect } = require('@playwright/test');
const { login, gotoAdminPage, gotoEditmode,createForms } = require('./helpers');
/*
test('Home page test', async ({ page }) => {
  await page.goto('http://localhost:8000/en/');
});
*/
/*********************************************************************** Log in page ******************************************/
/*
no Wrapping
*/
/*
test('Log in page test', async ({ page }) => {
  const userName ='admin'
  const Password ='devLab08@'
  await page.goto('http://localhost:8000/Util/Login?ReturnUrl=/en/');
  
    // Locate input by xPath
  const usernameInput = await page.$('//*[@id="UserName"]');
  await usernameInput.fill(userName);

  const passwordInput = await page.$('//*[@id="Password"]');
  await passwordInput.fill(Password);
  
  const loginButton = await page.$('//*[@id="Submit"]');
  await loginButton.click();
  
  // Assert Admin page 
  await page.$('//*[@id="epi-quickNavigator-clickHandler"]');

  //console.log('Hello Vile');
});
*/
/*
test('Log in page test - CSS selector', async ({ page }) => {
  const userName ='admin'
  const Password ='devLab08@'
  await page.goto('http://localhost:8000/Util/Login?ReturnUrl=/en/');
  
    // Locate input by CSS Selector
  const usernameInput = await page.$('#UserName');
  await usernameInput.fill(userName);

  const passwordInput = await page.$('#Password');
  await passwordInput.fill(Password);
  
  const loginButton = await page.$('#Submit');
  await loginButton.click();
  
   // Assert Admin page 
  await page.$('#epi-quickNavigator-clickHandler');
  
});
*/
/*
test('Log in page test - get by id', async ({ page }) => {
  const userName ='admin'
  const Password ='devLab08@'
  await page.goto('http://localhost:8000/Util/Login?ReturnUrl=/en/');
  
    // Locate input by CSS Selector
  const usernameInput = await page.locator('[id="UserName"]');
  await usernameInput.fill(userName);

  const passwordInput = await page.locator('[id="Password"]');
  await passwordInput.fill(Password);
  
  const loginButton = await page.locator('[id="Submit"]');
  await loginButton.click();

   // Assert Admin page 
  await page.locator('[id="epi-quickNavigator-clickHandler"]');

});

test('Log in page test - Attribute id', async ({ page }) => {
  const userName ='admin'
  const Password ='devLab08@'
  await page.goto('http://localhost:8000/Util/Login?ReturnUrl=/en/');
  
    // Locate input by Id
  const usernameInput = await page.$('[id="UserName"]');
  await usernameInput.fill(userName);

  const passwordInput = await page.$('[id="Password"]');
  await passwordInput.fill(Password);
  
  const loginButton = await page.$('[id="Submit"]');
  await loginButton.click();

   // Assert Admin page 
  await page.locator('[id="epi-quickNavigator-clickHandler"]');

});
*/

/*
2- Wrap login into a function in Helpers library.
*/  

test('Go to login page', async ({ page }) => {
	// Use the login function
	await login(page);
	// Verify login by checking for the presence of a specific element after login
    await expect(page.locator('[id="epi-quickNavigator-clickHandler"]')).toBeVisible();
});

/*********************************************************************** Admin menu ******************************************/

test('Test the Admin page', async ({ page }) => {
	await gotoAdminPage(page);
	// Edit on left menu:
	
	await expect(page.locator('//*[@id="epi-navigation-root"]/header/div/section[1]/div[3]')).toHaveText('Optimizely');
	
	const sidebarLink = page.locator('#sideBarNavigationRoot').locator('div:nth-child(2) > div > a');
	await expect(sidebarLink).toBeVisible();

	// Using shorten xPath:
	const elementEdit = await page.locator('xpath=//*[@id="sideBarNavigationRoot"]//div[2]/div/a');
	await elementEdit.waitFor();  // Wait until the element is available for the next action
	await elementEdit.click();
	
	// The first element is found and clicked
	const elements = await page.$$('#sideBarNavigationRoot >> div:nth-child(2) > div > a');
	if (elements.length > 0) {
	  await elements[0].click();  // Click the first element found by the XPath
	}
	
	// Toggle navigation pane
	await expect(page.locator('xpath=//*[@id="uniqName_52_59"]/span[1]')).toBeVisible();
	await expect(page.locator('xpath=//*[@id="uniqName_52_59"]/span[1]')).toBeEnabled();
	
	const elementToggle = await page.locator('xpath=//*[@id="uniqName_52_59"]/span[1]');
	await elementToggle.waitFor();  // Wait until the element is available for the next action
	await elementToggle.click();

	
	// pin
	const elementPin = await page.locator('xpath=//*[@id="dijit_form_ToggleButton_4"]/span[1]');
	await elementPin.waitFor();  // Wait until the element is available for the next action
	await elementPin.click();

	// verify that the setting icon is visitable


	/*
	const elements = await page.$$('//*[@id="sideBarNavigationRoot"]//div[2]/div/a');
	if (elements.length > 0) {
	  await elements[0].click();  // Click the first element found by the XPath
	}
	*/
});

/*********************************************************************** Edit mode ******************************************/
/*
test('Test the Edit mode', async ({ page }) => {
	await createForms(page);
});
*/


