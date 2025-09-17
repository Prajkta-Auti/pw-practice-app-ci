import {expect, test} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

test.beforeEach(async({page})=>{
 await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting',async({page})=>{
    const SuccessButton=page.locator('.bg-success')
    //await SuccessButton.click()
    //const SuccessButtontext=await SuccessButton.textContent()
    // await SuccessButton.waitFor({state:"attached"})
    // const SuccessButtontext=await SuccessButton.allTextContents()
    // expect(SuccessButtontext).toContain('Data loaded with AJAX get request.')
    await expect(SuccessButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})

})

test('alernative waiting',async({page})=>{
       const SuccessButton=page.locator('.bg-success')
       //waitForElement
      // await page.waitForSelector('.bg-success')

       //waitfor Particulor response
      // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

      //wait for network calls not recommended
      await page.waitForLoadState('networkidle')

       const SuccessButtontext=await SuccessButton.allTextContents()
       expect(SuccessButtontext).toContain('Data loaded with AJAX get request.')
})

test.skip('timeout',async({page})=>{
    //test.setTimeout(10000)
    test.slow()
    const SuccessButton=page.locator('.bg-success')
    await SuccessButton.click({timeout:16000})
   //await SuccessButton.click()
})