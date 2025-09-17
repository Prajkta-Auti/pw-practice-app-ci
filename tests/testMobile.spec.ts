import {expect, test} from '@playwright/test'
test('Input Fields',async({page}, testinfo)=>{
    await page.goto('/')
    if(testinfo.project.name == 'mobile'){
       await page.locator('.sidebar-toggle').click()
    }
    
    //await page.locator('.sidebar-toggle').click()
     await page.getByText('Forms').click()
     await page.getByText('Form Layouts').click()   
     await page.locator('.sidebar-toggle').click()
    const usingGridEmailInput=page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"})
    await usingGridEmailInput.fill('test@test.com')
    await usingGridEmailInput.clear()
    await usingGridEmailInput.pressSequentially('test@test.com')
    
})