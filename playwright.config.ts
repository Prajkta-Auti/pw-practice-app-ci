import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options'
import { off } from 'process';


 require ('dotenv').config();

export default defineConfig<TestOptions>({
  timeout:40000,
  //globalTimeout:60000,

 
  retries: process.env.CI ? 2 : 1,
  
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

       
      },
    ],

    ['json',{outputFile:'test-results/jsconReport.json'}],
           // [ "allure-playwright"],
            ['html']
],

  use: {
     globalsQaURL:'https://www.globalsqa.com/demo-site/draganddrop/',
      baseURL:process.env.DEV==='1'? 'http://localhost:4200/'
             : process.env.STAGING==='1'? 'http://localhost:4202/'
             : 'http://localhost:4200/',

    
    trace: 'on-first-retry',
     screenshot: "only-on-failure",
    actionTimeout:5000,
    navigationTimeout:5000,
    video:{
    mode:'off',
    size:{width:1920,height:1000}
          }

  },

 
  projects: [
    {
      name: 'chromium',
     
    },

    {
      name: 'firefox',
      use:{
        browserName:'firefox',
         video:{
    mode:'off',
    size:{width:1920,height:1000}
         }
      }
    },
    {
      name:'mobile',
      testMatch:'testMobile.spec.ts',
      use:{
        ...devices['iPhone 13 Pro']
      }

    }
  ],
  webServer:{
    command:'npm run start',
    url:"http://localhost:4200/",
     timeout: 120 * 1000,
  }
});
