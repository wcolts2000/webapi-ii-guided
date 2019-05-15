# RESTful API examples

not using RESTful using RESTful

/listAllHubs GET /hubs
/createHub POST /hubs
/updateHub PUT /hubs/:id
/deleteHub DELETE /hubs/:id
/listHubsMessages GET /hubs/:id/meesages
/countHubMessages Get /hubs/:id/messages {with an extra count property in th return object}

## Refactoring to use routers

- created a server.js file and extracted all the express server code from index, leaving index to only be concerned with listening on the port

- extract all the /api/hubs endpoints into its own hubs-router file

- we instantiate a router via express.Router() and export that, importing it into the server.js file

- we append the url address we want to use for those endpoints into the server.use method and extract those from the rout file

## Query parameters example

> https://www.google.com/search
> ?
> source = hp
> &
> ei = b7vRXK3JJ -
> mx0PEPt4uTkAQ&q = lambda+school
