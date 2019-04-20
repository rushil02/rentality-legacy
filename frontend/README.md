# Code Structure and Application Architecture

The codebase is divided in 2 categories -
* Containers
* Components

#### Containers
They are stateful and all the Business logic, Connection logic, Process flows, etc. exist here. They are not concerned 
about the layout or styling of the elements; but require to manipulate only the state and data. For any task/component,
if any of the following is required, use containers for associated component - 
* Change in layout based on self state
* Multi Step process involved before producing any usable result !Important!

They are the single source of truth for any component and are responsible for sending signal to parent container if any  
and required, with appropriate data. Example - 
* Child Container: PostalCodeAutoSuggest calls to signal an update in the parent container. 
* Child Container: AvailabilitySelector is an independent container which does not depend on the state of parent 
container.

Containers can be async using React.lazy + Suspense; although, using the provided generic API (####) is recommended.
 
#### Components
They should not have their own states, to avoid any possibility of independent behaviour of a layout element. They are
only concerned with the styling and layout of the elements.


[comment]: <> (TODO: Complete Section)
## Architecture 

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