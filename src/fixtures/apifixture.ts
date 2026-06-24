import { test as baseTest } from '@playwright/test';
import { ApiHelper } from '../api/APIHelper';

//define types for api fixtures
type ApiFixtures= {
    apiHelper: ApiHelper;
}
   
baseTest.extend<ApiFixtures>{{
    
    
    apiHelper:async({request}, use)=>{
        let apiHelper= new ApiHelper(
            request,
            process.env.API_BASE_URL
        )
        await use(apiHelper);
    },

})