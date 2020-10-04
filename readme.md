# Tasks Manager

- With a Trello account, get YOUR_TRELLO_KEY, YOUR_TRELLO_TOKEN (https://trello.com/app-key)
- It is assumed that a Trello board already exists, and it has a "To Do" list (it needs to be called like that)
- Retrieve the board id with `curl 'https://api.trello.com/1/members/me/boards?key={YOUR_TRELLO_KEY}&token={YOUR_TRELLO_TOKEN}'` (the `idBoard` attribute of the response)
- In the project, rename the `variables.env.sample` to `variables.env` and complete Trello variables
- `mpm install`
- Test the api with help of the `task.http` file (if you are using IntelliJ Idea -> https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html#creating-http-request-files)
