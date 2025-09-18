import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from '../Page-Objects/helperBase'

export class NavigationPage extends HelperBase{
   
    readonly formLayOutMenuItem:Locator
    readonly datePickerMenuItem:Locator
    readonly smartTableMenuItem:Locator
    readonly toastrMenuItem:Locator
    readonly tootltipMenuItem:Locator

    constructor(page:Page){
        super(page)
        this.formLayOutMenuItem=page.getByText('Form Layouts')
        this.datePickerMenuItem=page.getByText('Datepicker')
         this.smartTableMenuItem=page.getByText('Smart Table')
         this.toastrMenuItem=page.getByText('Toastr')
         this.tootltipMenuItem=page.getByText('Tooltip')

    }
    async forLayoutPage(){
    await this.page.getByText('Forms').click()
    await this.formLayOutMenuItem.click()
    await this.waitforNumberofSeconds(2)

    }
    async datePickerPage(){
     
     await this.selectgroupMenuItem('Forms')
     await this.page.waitForTimeout(1000)
         await this.datePickerMenuItem.click()
        
         
         
    }
    async smartTablePage(){
         await this.selectgroupMenuItem('Tables & Data')
         await this.smartTableMenuItem.click()
      
    }
     async toastrPage(){
       await this.selectgroupMenuItem('Modal & Overlays')
     await this.toastrMenuItem.click()
    }
     async tooltipPage(){
     await this.selectgroupMenuItem('Modal & Overlays')
        await this.tootltipMenuItem.click()
       
    }
    private async selectgroupMenuItem(groupItemTitle:string){
        const GroupMenuItem=this.page.getByTitle(groupItemTitle)
        const expandedState=await GroupMenuItem.getAttribute('aria-expanded')
        if(expandedState=="false")
            await GroupMenuItem.click()
    }
}
