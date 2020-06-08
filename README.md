# TODO APP
Create, update, delete todo recording the actions into localStorage
## Commands to run application
**Run development mode:**
```sh
cd my-app
yarn

yarn start

```
Access http://localhost:3000/

**Run production mode:**
```sh

yarn build

yarn serve

```
Access http://localhost:5000/


**Run test:**
 ```sh 
yarn test
``` 
-----

## Description

Simple app for todo list. The scaffolding represented the classic guide, with js, entry point `index.js` inside `src/` folder. I decide to split pages from components, components are reusables, the pages identify the routes of application. There the 3 routes, `homepage` with the todo list, the `/detail` for edit and view a todo and `/add` for add a new todo.

### App features

From home with can add a new todo, by typing on the plus icon. We navigate to `/add` route, there is a form for creating a todo with title, description, and status, for pending or completed todo. After creating todo (I set manually delay, for UX utility, with loader feedback), navigate to hp with the new todo. We can edit todo or remove it through the two icons. Click on the todo name for completing the task.
In `/edit` route the todo can delete or update with the same UX delay.
The app is responsive, but not supported all browser, of course not explorer. Resizing the browser the app redesign the layout and its element. The main feature I think accessing the app with mobile, the app implemented the swipe right to complete a todo, with a keyframes animation.

## Recording

Recording logic that I implemented following the requirements are:
- **RECORD** btn start to record CREATE, UPDATE, DELETE actions and save to localStorage, I use localStorage beacuse it was the quick solution and it is good enough for this use case.
- **STOP** stop the recording
- **CLEAR** clear all the actions saved into localStorage
- **PLAY** reset the state to initial state with no todos, retrieve all teh actions recording after `Record` btn is typed, and dispatch all the actions with 1000ms between every action.

I understand from requiremtns, that the actions localStorage must be delete only with `CLEAR` btn so if I refresh the state of app will be reset to the initial state.

For recording implementation I think how redux works, I used the context API for shared state down the app tree, the useReducer for create a store and actions to dispatch. In this way I be able to intercept every action that will update the state, filter by its type and save to localStorage if `Record` btn is active.
In redux is simple to use a middleware to do it.
In state folder, I create a `action.js` file with all app actions, an `handler.js` file with reducers, and `index.js` for update state.
I implemented a log info, for helping me to know how the actions are dispatched. It is possible to active adding `logTodo` setted to true in localStorage.

## Stack architecture

I use styled-component, the reason is the possibility to have a component reusable and self-contained, typical of css-in-js. The second reason is the possibility to configure a theme provider with context react API to share theme styles. For routing, I used @reach-router because it is lither than react-router and it fits the scope of the app.
The detail and addTodo routes are code split using react lazy and suspence for fallback content. I also implemented ErrorBoundary with a HOC to catch an error. I used it some years ago in a big project and I think It is very helpful to avoid blank pages.
For the layout I used css grid, I think it is very powerful and removed a lot of complexity about the css and the layout responsiveness.
For testing, I used react-testing-library, that it is suggested by the react community and jest as a framework. In my opinion, I prefer cypress for layout regression and smoke tests and used jest for business logic.

## Some next features
- Performance optimization using service-worker and pwa, also webpack configuration can be modified for better result
- useMemo and useCallback are expensive, if the app is bigger they are could be helpful 
- the footer is horrible and maybe not only it :smile:
- input search for the todo filter 
 