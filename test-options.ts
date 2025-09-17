import {test as base} from '@playwright/test'
import{PageManager} from '../pw-practice-app/.vscode/Page-Object/pageManager'

export type TestOptions={
    globalsQaURL:string
    formLayoutPage:string
    pageManager:PageManager

}
export const test=base.extend<TestOptions>({
    globalsQaURL:['',{option:true}],
    formLayoutPage:[async({page},use)=>{
         await page.goto('/')
         await page.getByText('Forms').click()
         await page.getByText('Form Layouts').click()
        await use('')
        console.log('teardown')
    },{auto:true}],
    pageManager: async({page},use)=>{
        const pm=new PageManager(page)
        await use(pm)

    }
})