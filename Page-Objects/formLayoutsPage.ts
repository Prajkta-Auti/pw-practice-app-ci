import { expect, Locator, Page } from "@playwright/test";
export class FormLayoutPage{
   private readonly page:Page
    constructor(page:Page){
        this.page=page
    }
    async submitUsingGridFormWithCredAndSelectOptions(email:string, password:string, optionText:string){
const usingGridForm=this.page.locator('nb-card',{hasText:"Using the Grid"})
await usingGridForm.getByRole("textbox",{name:"Email"}).fill(email)
await usingGridForm.getByRole("textbox",{name:"Password"}).fill(password)
 await usingGridForm.getByRole('radio',{name:optionText}).check({force:true})
 await usingGridForm.getByRole('button').click()
    }
    /**
     * 
     * @param name should be first and last name
     * @param email enter valid email
     * @param rememberMe true or false 
     */
     async submitInlineFormWithNameEmailAndCheckBox(name:string, email:string, rememberMe:boolean){
const inlineFrom=this.page.locator('nb-card',{hasText:"Inline Form"})
await inlineFrom.getByRole("textbox",{name:"Jane Doe"}).fill(name)
await inlineFrom.getByRole("textbox",{name:"Email"}).fill(email)
if(rememberMe)
   await inlineFrom.getByRole('checkbox').check({force:true})
 await inlineFrom.getByRole('button').click()
    }
}