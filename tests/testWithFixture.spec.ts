import {test} from '../test-options'
import{PageManager} from '../.vscode/Page-Object/pageManager'
import { NavigationPage } from '../.vscode/Page-Object/navigationPage'
import { FormLayoutPage } from '../.vscode/Page-Object/formLayoutsPage'
import{DatePickerPage} from '../.vscode/Page-Object/datePickerPage'
import {faker} from '@faker-js/faker'




test('Parameterized method',async({pageManager})=>{
  
  const randomName=faker.person.fullName()
  const RandomEmail=`${randomName.replace(" ","")}${faker.number.int(1000)}@test.com`
   
   await pageManager.onFormLayoutPage().submitUsingGridFormWithCredAndSelectOptions(process.env.USERNAME,process.env.PASSWORD,'Option 1')
   await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckBox(randomName,RandomEmail,false)
  
})