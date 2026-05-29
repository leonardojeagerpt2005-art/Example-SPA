# Rick and Morty SPA

## Description

Rick and Morty SPA is a Single Page Application (SPA) built with JavaScript, HTML, CSS, Vite, and Axios. The application consumes data from the Rick and Morty API and allows users to browse characters, episodes, and locations without reloading the page.

The project also includes a local CRUD system using LocalStorage, allowing users to create, edit, and delete fictional characters.

---

## Features

### SPA Navigation
- Dynamic routing without page reloads.
- Browser History API support.
- Custom 404 page for unknown routes.

### Characters
- Fetch characters from the Rick and Morty API.
- Create custom fictional characters.
- Edit existing characters.
- Delete characters.
- Store custom data using LocalStorage.

### Episodes
- View episode information.
- Display episode code, air date, and number of characters.

### Locations
- View location information.
- Display location type, dimension, and number of residents.

### Contacts
- Interactive contact form.

### About
- Information page about the project.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Vite
- Axios
- LocalStorage
- Rick and Morty API

---

## Project Structure

```plaintext
src/
│
├── assets/
│   ├── js/
│   │   ├── components/
│   │   │   ├── characterCard.js
│   │   │   └── navbar.js
│   │   │
│   │   ├── pages/
│   │   │   ├── home.js
│   │   │   ├── episodes.js
│   │   │   ├── locations.js
│   │   │   ├── contacts.js
│   │   │   └── about.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── characterService.js
│   │   │   └── httpClient.js
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   │
│   │   └── views/
│   │       ├── home.html
│   │       ├── contacts.html
│   │       ├── about.html
│   │       └── navbar.html
│   │
│   ├── router.js
│   └── main.js
│
└── index.html
```

---

## Application Flow Diagram

The following diagram illustrates the navigation and workflow of the application.

> Replace the image below with your own flowchart.

![Application Flow Diagram](./assets/images/flow-diagram.png)

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

```bash
npm install
```

### Run the project

```bash
npm run dev
```

The application will be available at:

```plaintext
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://rickandmortyapi.com/api
VITE_CONTENT_TYPE=application/json
VITE_TIME_OUT=5000
```

---

## CRUD Functionality

### Create
Add new fictional characters.

### Read
Display characters from both the API and LocalStorage.

### Update
Edit existing characters and save changes locally.

### Delete
Remove local characters or hide API characters using a local blacklist.

---

## API Endpoints

The application uses the following endpoints from the Rick and Morty API:

```plaintext
/character
/episode
/location
```

---

## Learning Objectives

This project was developed to practice:

- Single Page Applications (SPA)
- JavaScript Modules
- API Consumption with Axios
- Routing Systems
- LocalStorage Management
- CRUD Operations
- Dynamic DOM Manipulation

---

## Screenshots

### Home Page

![Home Page](./assets/images/home.png)

### Episodes Page

![Episodes Page](./assets/images/episodes.png)

### Locations Page

![Locations Page](./assets/images/locations.png)

---

## Author

Developed as an academic project for learning modern JavaScript development concepts.

**Author:** Leonardo Jose Perez Chacon
