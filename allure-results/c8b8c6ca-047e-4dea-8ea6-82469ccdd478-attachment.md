# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\amadeus.oauth2.spec.ts >> GET--get location data
- Location: tests\api\amadeus.oauth2.spec.ts:27:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | let OAUTH_CONFIG={
  4  |     tokenURL:'https://test.api.amadeus.com/v1/security/oauth2/token',
  5  |     clientId: process.env.OAUTH_CLIENT_ID!,
  6  |     clientSecret:process.env.OAUTH_CLIENT_SECRET!,
  7  |     grantType:process.env.GRANT_TYPE!
  8  | }
  9  | 
  10 | let accessToken;
  11 | test.beforeEach('post --generate the access token',async({request})=>{
  12 |     console.log("step one");
  13 |     let response=await request.post(OAUTH_CONFIG.tokenURL, {
  14 |         form:{
  15 |             grant_type: OAUTH_CONFIG.grantType,
  16 |             client_id:OAUTH_CONFIG.clientId,
  17 |             client_secret:OAUTH_CONFIG.clientSecret
  18 |         }
  19 |     });
  20 |     expect(response.status()).toBe(200);
  21 |     let jsonResponse=await response.json();
  22 |     console.log(jsonResponse);
  23 |     accessToken=jsonResponse.access_token;
  24 |     
  25 | });
  26 | 
  27 | test('GET--get location data', async({request})=>{
  28 |     //https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE
  29 |     let baseURL='https://test.api.amadeus.com';
  30 |     let endPointURL='/v1/reference-data/locations';
  31 |     console.log("Arun Pass");
  32 |     let queryParam={
  33 |         subType:'CITY,AIRPORT',
  34 |         keyword:'MUC',
  35 |         countryCode:'DE'
  36 |     };
  37 |     console.log("Arun second");
  38 |     let locationResponse=await request.get(`${baseURL}${endPointURL}`,{
  39 |         headers:{
  40 |             Authorization: 'Bearer ${accessToken}'
  41 |         },
  42 |         params: queryParam
  43 |     });
> 44 |     expect(locationResponse.status()).toBe(200);
     |                                       ^ Error: expect(received).toBe(expected) // Object.is equality
  45 |     console.log(await locationResponse.json());
  46 | });
```