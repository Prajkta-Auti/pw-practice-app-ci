import {expect, test} from '@playwright/test'
import { delay } from 'rxjs-compat/operator/delay'
import { timeout } from 'rxjs-compat/operator/timeout'

test.beforeEach(async({page})=>{
 await page.goto('/')

    
})
test.describe('Form layout page',()=>{
   test.describe.configure({retries:0})
   test.beforeEach(async({page})=>{
    await page.getByText('Forms').click()
     await page.getByText('Form Layouts').click()

   }) 


test('Input Fields',async({page}, testinfo)=>{

    const usingGridEmailInput=page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"})
    await usingGridEmailInput.fill('test@test.com')
    await usingGridEmailInput.clear()
    await usingGridEmailInput.pressSequentially('test@test.com')
    //generic Assertion
    const inputValue=await usingGridEmailInput.inputValue()
    expect(inputValue).toEqual('test@test.com')

    //Locator Assertion
    await expect(usingGridEmailInput).toHaveValue('test@test.com')
})
test('Radio Buttons',async({page})=>{
     const usingGridForm=page.locator('nb-card',{hasText:"Using the Grid"})
    // await usingGridForm.getByLabel('Option 1').check({force:true})
     await usingGridForm.getByRole('radio',{name:'Option 2'}).check({force:true})
     const RadioButtonStatus1=await usingGridForm.getByRole('radio',{name:'Option 1'}).isChecked()
     await expect(usingGridForm).toHaveScreenshot()
    //expect(RadioButtonStatus1).toBeTruthy()
     //locator assertion
   // await expect(usingGridForm.getByRole('radio',{name:'Option 1'})).toBeChecked()

   //   await usingGridForm.getByRole('radio',{name:'Option 2'}).check({force:true})
   //   expect(await usingGridForm.getByRole('radio',{name:'Option 1'}).isChecked()).toBeFalsy()
   //    expect(await usingGridForm.getByRole('radio',{name:'Option 2'}).isChecked()).toBeTruthy()
})

})

 test('CheckBoxes',async({page})=>{
    await page.getByText('Modal & Overlays').click()
     await page.getByText('Toastr').click()
    
     await page.getByRole('checkbox',{name:"Hide on click"}).uncheck({force:true})
    
     await page.getByRole('checkbox',{name:"Prevent arising of duplicate toast"}).check({force:true})
     
     const allChekcBoxes= page.getByRole('checkbox')
     for(const box of await allChekcBoxes.all()){
        await box.uncheck({force:true})
        expect(await box.isChecked()).toBeFalsy()
     }
      })
    test('Dropdowns and list',async({page})=>{
        const dropdownMenu=page.locator('ngx-header nb-select')
        await dropdownMenu.click()
        page.getByRole('list')// when list has ul tag
        //page.getByRole('listitem')//when list has li tag
        //const optionList=page.getByRole('list').locator('nb-option')
        const optionList=page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])
        await optionList.filter({hasText:"Cosmic"}).click()
        const header=page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color','rgb(50, 50, 89)')
     
        const colors ={
        "Light":"rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic":"rgb(50, 50, 89)",
        "Corporate":"rgb(255, 255, 255)"}

           await dropdownMenu.click()
        for(const color in colors){
            await optionList.filter({hasText:color}).click()
            await expect(header).toHaveCSS('background-color',colors[color])
            if(color!='Corporate')
              await dropdownMenu.click()
        }     
      })
      
      test('Tooltips',async({page})=>{
         await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
        const tooltipCard=page.locator('nb-card',{hasText:"Tooltip Placements"})
        await tooltipCard.getByRole('button',{name:"Top"}).hover()
        const tooltip=await page.locator('nb-tooltip').textContent()
         expect(tooltip).toEqual('This is a tooltip')
      })
      
      test('Dialog box',async({page})=>{
         await page.getByText('Tables & Data').click()
         await page.getByText('Smart Table').click()
              page.on('dialog',dialog=>{
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
         })
       await page.getByRole('table').locator('tr',{hasText:"mdo@gmail.com"}).locator('.nb-trash').click()
       
       await expect(page.locator('tbody tr').first()).not.toHaveText("mdo@gmail.com")
       })

test('Table ',async({page})=>{
         await page.getByText('Tables & Data').click()
         await page.getByText('Smart Table').click()
         //how to get row by using any text in row
         const targetrow=page.getByRole('row',{name:"twitter@outlook.com"})
         await targetrow.locator('.nb-edit').click()
         await page.locator('input-editor').getByPlaceholder('Age').clear()
          await page.locator('input-editor').getByPlaceholder('Age').fill('35')
          await page.locator('.nb-checkmark').click()

          //get the row based on the value of specific col
          await page.locator(".ng2-smart-pagination-nav").getByText('2').click();
          const targetrowId=page.getByRole('row',{name:"11"}).filter({has:page.locator('td').nth(1).getByText('11')})
          // const targetrowId=page.getByRole('row',{name:"11"}).filter({has:page.locator('td').first()})
         
          await targetrowId.locator('.nb-edit').click()
           await page.locator('input-editor').getByPlaceholder('E-mail').clear()
          await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
          await page.locator('.nb-checkmark').click()
          await expect(targetrowId.locator('td').nth(5)).toHaveText('test@test.com')

          //test filters
          const ages=["20","30","40","200"]
          for(let age of ages){
            await page.locator('input-filter').getByPlaceholder('Age').clear()
            await page.locator('input-filter').getByPlaceholder('Age').fill(age)
            await page.waitForTimeout(500)
            const ageRows=page.locator('tbody tr')
            for(let row  of await ageRows.all()){
                const cellVal=await row.locator('td').last().textContent()
                if(age=="200"){
                    expect(await page.getByRole('table').textContent()).toContain("No data found")

                }
                else{
                expect(cellVal).toEqual(age)
                }

            }
        }    
})
test('DatePicker',async({page})=>{
    await page.getByText('Forms').click()
     await page.getByText('Datepicker').click()
     const calInput=page.getByPlaceholder('Form Picker')
     await calInput.click()
     let date=new Date()
     date.setDate(date.getDate()+1)
     const expectedDate=date.getDate().toString()
    
     const ExpectedMonth=date.toLocaleString('En-US',{month:"short"})
     const expectedYear=date.getFullYear()
     const dateAssert=`${ExpectedMonth} ${expectedDate}, ${expectedYear}`
     await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact:true}).click()
     await expect(calInput).toHaveValue(dateAssert)
})
      
test('Sliders',async({page})=>{

//    const tempguage= page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
//    await tempguage.evaluate(node=>{
//     node.setAttribute('cx','232.630')
//      node.setAttribute('cy','232.630')
//    })
//    await tempguage.click()

   //Mouse movement
    const tempbox= page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempbox.scrollIntoViewIfNeeded()
   const bounsingbox= await tempbox.boundingBox()
   const x=bounsingbox.x+bounsingbox.width/2
    const y=bounsingbox.y+bounsingbox.height/2
    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x+100,y)
    await page.mouse.move(x+100,y+100)
    await page.mouse.up()


})


   

