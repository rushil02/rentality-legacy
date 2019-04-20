# Code Structure and Application Architecture

**Only easy to read code is better than only smart code.**

### URLs
Do not use trailing slashes.

### Serializers
Nomenclature: {Noun:Object}{Optional:Noun:Process/Purpose}Serializer
   
They should contain any and all data communication logic, including any object's data related manipulations, eg  
- conversion or parsing
- input validation checks
- calculating and adding derived data
- setting defaults based on run-time logic
- ...

### Views
Class Nomenclature: {Noun:Object}{Optional:Verb:Process/Purpose}View
Method Nomenclature: {Optional:Noun:Object}_{Verb:Process/Purpose}_view

- For all CRUD operations always use Class based Views, as it offers better code maintainability.
- They should contain only business logic, including any process related data manipulations, eg
  - cross validation checks on inputs based on process level logic
  - CRUD of derived data across multiple objects.
  - ...

Prefer to Use DRF's APIView and not Generic Classes. They are only good for simplest of CRUD operations; for any 
complex task which involves overriding some section of behaviour of these Generic Classes - strictly use APIView.
Example - Using ListMixin and overriding the list method. Not only is this counter-productive but less verbose for any
future change/review.

Checklists to create each view functionality -

##### CheckList A (in order)
* Check if User has View Permissions
* Input Validations
* Object/Queryset Fetch logic
* Check if User has Object level Permissions
* Check if Business logic / Functionality is applicable to fetched Object 
* Apply Business Logic / Functionality
* Return appropriate Response

##### CheckList B
* Each check-item in 'Checklist A' has appropriate Exception handling
* Create apt entry/entries in Activity Log
* Create apt entry/entries in Error Log
* Code is clear of any debugging, print statement, etc.

***
#### Writing REST APIs
**These will include to be as the parameters of code review/evaluation, as they facilitate agility in development.**
* Utilise all HTTP methods (GET / POST / PUT / DELETE) appropriately.
* Write symmetrical APIs for multiple HTTP methods on the same URL, ie. What you send is what you receive!
* The above point inherently means 2 constraints,  
  - All HTTP methods in a view should evaluate with the same Serializer. Multiple URL pattens are allowed to match to 
  one View.
  - Nested Serializers cannot be used when the child serializer is read-only, particularly when the View uses PUT or 
  POST methods.   
* For all such Child serializers (which are read-only), rather use separate Serializer another API endpoint for a GET 
request.
* For all Writable Child serializers, the implementation will depend on the frontend architecture and the coupling 
between multiple components. There are two possible cases when choosing writable Nested serialization, 
  - One-to-Many/Many-to-Many: Use appropriate Custom List Serializers from `./utils/serializers.py`
  - One-to-One: Do not use Views to decouple data; write custom create/update methods in the parent Serializer.   

***
## Useful APIs
Refer to - ./utils/README.md
