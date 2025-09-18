import {test} from '../test-options'
import{PageManager} from '../Page-Objects/pageManager'
import { NavigationPage } from '../Page-Objects/navigationPage'
import { FormLayoutPage } from '../Page-Objects/formLayoutsPage'
import{DatePickerPage} from '../Page-Objects/datePickerPage'
import {faker} from '@faker-js/faker'




test('Parameterized method',async({pageManager})=>{
  
  const randomName=faker.person.fullName()
  const RandomEmail=`${randomName.replace(" ","")}${faker.number.int(1000)}@test.com`
   
   await pageManager.onFormLayoutPage().submitUsingGridFormWithCredAndSelectOptions(process.env.USERNAME,process.env.PASSWORD,'Option 1')
   await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckBox(randomName,RandomEmail,false)
  
})