import {expect, test} from '@playwright/test'

test.beforeEach(async({page})=>{
 await page.goto('/')
    await page.getByText('Forms').click()
     await page.getByText('Form Layouts').click()
})

test('the first test',async ({page})=>{
   
     await page.getByText('Form Layouts').click()

})
test('Navigate to date picker page test',async ({page})=>{
    
     await page.getByText('DatePicker').click()

})
test('Locator Syntax rule',async({page})=>{
    //by tagname
   await page.locator('input').first().click()
    //by id user #
     page.locator('#inputEmail1')
    //by class: Use . at first
    page.locator('.shape-rectangle')
    //by placeholder
    page.locator('[placeholder="Email"]')
       //combo by different selector
       page.locator('input[placeholder="Email"].shape-rectangle')
       //by xpath(Not recommended)
          page.locator('//[@id="input"]')

          //partial text
           page.locator(':text("Using")')

           //by exact
              page.locator(':text-is("Using the grid")')
})
test('User facing locator',async({page})=>{
    await page.getByRole('textbox',{name:'Email'}).first().click()
     await page.getByRole('button',{name:'Sign in'}).first().click()
     await page.getByLabel('Email').first().click()
     await page.getByPlaceholder('Jane Doe').click()
     await page.getByText('Using the Grid').click()
     await page.getByTestId("SignIn").click()
     //await page.getByTitle('IoT Dashboard').click()

})
test('Locating Child element',async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    await page.locator('nb-card').getByRole('button',{name:'Sign in'}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()

})
test('Locating parent element',async({page})=>{
    await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:'Email'}).first().click()
    await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:'Email'}).first().click()
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:'Email'}).click()
    await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:'Password'}).click()
    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox',{name:'Password'}).click()
})

test('Reusing locators',async({page})=>{
    const basicForm=page.locator('nb-card',{hasText:"Basic form"})
    const email=basicForm.getByRole('textbox',{name:'Email'})
    await email.fill('test@test.com')
     await basicForm.getByRole('textbox',{name:'Password'}).fill('Welcome@123')
     await basicForm.locator('nb-checkbox').click()
     await basicForm.getByRole('button',{name:'Submit'}).first().click()
     await expect(email).toHaveValue('test@test.com')
   })
   test('extracting value',async({page})=>{
    //single text values
    const basicForm=page.locator('nb-card',{hasText:"Basic form"})
    const buttonText= await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')
    //all text values
    const allRadioButton=await page.locator('nb-radio').allTextContents()
      expect(allRadioButton).toContain('Option 1')
      //input value
      const emailField= basicForm.getByRole('textbox',{name:'Email'})
     await emailField.fill('test@test.com')
     const emailValue= await emailField.inputValue()
     expect(emailValue).toEqual('test@test.com')
     //get attribute value
     const placeholderValue=await emailField.getAttribute('placeholder')
     expect(placeholderValue).toEqual('Email')
   })

      test('Assertions',async({page})=>{
        //General Assertion
        const value=5
        expect(value).toEqual(5) 
         
     const button= page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')
     const buttonText=await button.textContent()

     expect(buttonText).toEqual('Submit')
      //locator assertion
       await expect(button).toHaveText('Submit')
       //Soft Assertion
       await expect.soft(button).toHaveText('Submit4')
       await button.click()
      })