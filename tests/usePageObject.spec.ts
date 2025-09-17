import {expect, test} from '@playwright/test'
import{PageManager} from '../.vscode/Page-Object/pageManager'
import { NavigationPage } from '../.vscode/Page-Object/navigationPage'
import { FormLayoutPage } from '../.vscode/Page-Object/formLayoutsPage'
import{DatePickerPage} from '../.vscode/Page-Object/datePickerPage'
import {faker} from '@faker-js/faker'

test.beforeEach(async({page})=>{
 await page.goto('/')

    
})
test('Navigate to form page @smoke',async({page})=>{
   const pm= new PageManager(page)
   
   await pm.navigateTo().forLayoutPage()
   await pm.navigateTo().datePickerPage()
   await pm.navigateTo().smartTablePage()
   await pm.navigateTo().toastrPage()
   await pm.navigateTo().tooltipPage()  
}) 

test('Parameterized method',async({page})=>{
  const pm= new PageManager(page)
  const randomName=faker.person.fullName()
  const RandomEmail=`${randomName.replace(" ","")}${faker.number.int(1000)}@test.com`
   await pm.navigateTo().forLayoutPage()
   await pm.onFormLayoutPage().submitUsingGridFormWithCredAndSelectOptions(process.env.USERNAME,process.env.PASSWORD,'Option 1')
   await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckBox(randomName,RandomEmail,false)
   await page.screenshot({path:'screenshots/formLayoutsPage.png'})
   // await pm.navigateTo().datePickerPage()
   // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
   // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6,18)

})