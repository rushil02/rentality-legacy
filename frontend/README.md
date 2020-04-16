#### Building from customised external packages (local)
\#1 Pack the package using npm to *.tgz format (https://docs.npmjs.com/cli/pack.html)
```
npm pack .
```
\#2 Copy compressed file to 'frontend/ext_lib/' folder.

\#3 Add entry to package.json as in the following example.
``` package.json
"dependencies": {
    "react-date-range": "file:ext_lib/react-date-range-1.0.0-beta.tgz",
}
```

\#Note: You might have to delete the node_modules folder for the new package to install. 
Known bug - https://npm.community/t/checkpermissions-missing-write-access-with-file-dependency/2922/3


#### Code Structure and Application Architecture
The File/Folder structure closely represents Django's code structure, where templates reside in each app-package. App-package
conventions are closely analogous to the naming in Django app layer, however there can be different packages depending
on the Process/Functionality. Each App package (depending on functionality) should commonly contain the following files - 
- routes.js (URL definitions)
- services.js (Transfer/Interaction layer ~ Controller) 
- models.js (DTO and validations ~ Model)
- view (~ View & Templates)       
  - [App.js] ---- Can be stateful/ or stateless depending on functionality, or can just be a dispatcher.            
  - [functionality/purpose] ---- Can use Recursive Nesting #1
    - containers (~ View)           
    - components (~ Templates)      

\#1 Recursive Nesting can be used to further break down the functionality into sub-parts before dividing into containers
 and components.
```
- src
  - routes.js [Defines URL not particulat to any package, example - globally available non-react links]
  - core
    - autoSuggestComponent
      - routes.js [URLs for current project component]
      - services.js
      - adapters.js
      - containers
        - AutoSuggest.js
      - views
        - AutoSuggest.js 
        
        - autosuggest
        - AutoSuggest.css
    - anotherCompoenent
      - ...
  - user
    - routes.js [URLs for current package]
    - services.js
    - adapters.js
    - containers
      - SignUp.js
    - components
      - SignUpForm.js
      - locationSuggest
        - LocationSuggest.js
        - LocationSuggest.css
```

#### Routes
```
// routes.js inside an app-package

import {include} from 'named-urls'

export default {
    house: include('/property', {
        formOptions: 'form-options',
        detail: 'create/edit/:houseUUID',
        edit: 'create/edit/:houseUUID',
        create: 'create/api',
        availability: include('availability', {
            list: 'list/:houseUUID',
            create: ':houseUUID',
            update: ':houseUUID/:objID',
            remove: ':houseUUID/:objID',
        }),
    }),
}
```

#### Models
Data transformation and validation

```
export class UserProfile{
    constructor (){
        this.last_name = "",
        this.billing_postcode = null,
        this.contact_num = "",
        this.first_name = "",
        this.billing_country = null,
        this.profile_pic = null,
        this.dob = null,
        this.sex = "",
        this.billing_street_address = null,
        this.email = "",
        this.account_type = ""
    }
}
```

#### Services
Connection logic

```
// Sample GET API
export function getProfileData(){
    return new Promise(function (resolve, reject){
        axios.get(reverse(routes.user.userProfile)).then(
            (result) => {
                resolve(Object.assign(new UserProfile, result.data));
            }
        ).catch(
            (result) => {
                reject(result);
            }
        );
    });
}

```

This file acn be used to mock API behaviour -
```
// Create a Promise to Mock an API.
export function getMockData(){
    // Mention type of data you are expecting to send in mocked API
    // Some Sample arg: {
    //      payloadArg: "value"
    // }

    // Return the data in the format you expect the API to work.
    return Promise.resolve({
        data: {
            foo: 'bar'
        }
    });
}
```

**Components and Containers are generally tightly coupled. Difference between Components and Containers -**

#### Containers
They are stateful and define all the Business logic, Process flows, etc. They are not concerned 
about the layout or styling of the elements; but require to manipulate only the state and data. For any task/component,
if any of the following is required, use containers for associated component - 
* Change in layout based on self state
* Multi Step process involved before producing any usable result !Important!

They are the single source of truth for any component and are responsible for sending signal to parent container if any  
and required, with appropriate data. Examples - 
* Child Container: PostalCodeAutoSuggest calls to signal an update in the parent container. 
* Child Container: AvailabilitySelector is an independent container which does not depend on the state of parent 
container.
 
#### Components
They should not have their own states, to avoid any possibility of independent behaviour of a layout element. They are
only concerned with the styling and layout of the elements.

#### Services
- Don't use `axios` directly. Use with `import axios from "utils/ServiceHelper"`.
- Each Component should have its own services.
- Create a `Service.js` or `Services/` in components directory.
- Export functions which are `Promise`. 
    * `return axios.get` for actual API calls.
    * `return Promise.resolve` or `return Promise.reject` for mocked data.
- Import only these functions for service calls.
- Use `<function>().then` or `<function>().catch` appropriately.
- Send payload to the service calls functions if required.

Refer `containers/house/SamplePage`.

[comment]: <> (TODO: Complete Section)
## Architecture

#### Cross package interaction
App packages are defined for one user flowIf you need to import a Component/Container from another package, please reconsider these alternatives - 
- Use routes 
#### Core Components Folder `src/core/`
Lists all reusable components, where each components is in it's own app-package. This package follows the above 
stated structure.   

#### Standardizations
* No trailing slashes with URLs

#### Approach towards Independent Containers
TODO
#### User Centric Design
- Making users aware of what's happening in the most abstract manner.
- Do **NOT** use success alert messages, eg 'Information saved successfully!'
* ##### Strict Use of Alerts with all APIs
* ##### Synchronised validations 
Requires rigorous optimization for server level validations  
OR an architecture paradigm which follows the 'formOptions' system in 'House: CreatePage'.
* ##### Lazy loading (don't overdo it)
* ##### Use of provided unique id as keys when creating a list of child components
In case of edits focus of browser will not change on re-render. While focus after add and delete operations can be 
manually controlled.

#### Dynamic Imports
They introduce an additional overhead on the payload, so use it when the page is above certain threshold of size. 

To get an intuitive estimate - 'House: Create Page' saved ~25% of payload for first meaningful render by using dynamic 
imports. But overall size of the page (including chunks) was increased by 3%. (Tested on 15/04/2019)

## Useful APIs

* #### Generating User Alerts

> import {alertUser} from 'containers/common/Alert';  
> alertUser.init({stockAlertType: "connectionError"});

Check 'containers/common/Alert.js' for more options.

* #### Lazy components with spin-kit loader
TODO
