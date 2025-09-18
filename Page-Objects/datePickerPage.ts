import { expect, Locator, Page } from "@playwright/test";
export class DatePickerPage{
   private readonly page:Page
    constructor(page:Page){
        this.page=page
    }
    async selectCommonDatePickerDateFromToday(numberofDaysToday:number){
     const calInput=this.page.getByPlaceholder('Form Picker')
     await calInput.click()
    const dateAssert= await this.selectDateInCalender(numberofDaysToday)
    
     await expect(calInput).toHaveValue(dateAssert)
    }
       async selectDatePickerWithRangeFromToday(startDaysToday:number,endDaysToday:number){
        const calInput=this.page.getByPlaceholder('Range Picker')
         await calInput.click()
         const dateAssertStart= await this.selectDateInCalender(startDaysToday)
         const dateAssertEnd= await this.selectDateInCalender(endDaysToday)
         const datetoAssert=`${dateAssertStart} - ${dateAssertEnd}`
         await expect(calInput).toHaveValue(datetoAssert)
    
    
       }
    private async selectDateInCalender(numberofDaysToday:number){
 let date=new Date()
     date.setDate(date.getDate()+numberofDaysToday)
     const expectedDate=date.getDate().toString()
    
     const ExpectedMonth=date.toLocaleString('En-US',{month:"short"})
     const expectedYear=date.getFullYear()
     const dateAssert=`${ExpectedMonth} ${expectedDate}, ${expectedYear}`
     await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate,{exact:true}).click()
     return dateAssert
    }
}