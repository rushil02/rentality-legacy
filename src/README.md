# Code Structure and Application Architecture

Easy to read code is better than only smart code.

### URLs
Do not use trailing slashes.

### Views
TODO: Architecture

Checklists to create each view functionality -

##### CheckList A (in order)
* Check if User has View Permissions
* Input Validations
* Object/Queryset Fetch logic
* Check if User has Object level Permissions
* Check if Business logic / Functionality is applicable to fetched Object 
* Apply Business Logic / Functionality
* Return appropriate Response

###### CheckList B
* Each check-item in 'Checklist A' has appropriate Exception handling
* Create apt entry/entries in Activity Log
* Create apt entry/entries in Error Log
* Code is clear of any debugging, print statement, etc.



## Useful APIs
Refer to - ./utils/README.md
