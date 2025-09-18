import { expect, Locator, Page } from "@playwright/test";
export class HelperBase{
    readonly page:Page
   constructor(page:Page){
        this.page=page}
        async waitforNumberofSeconds(timeseconds:number){
            await this.page.waitForTimeout(timeseconds*1000)
        }
}