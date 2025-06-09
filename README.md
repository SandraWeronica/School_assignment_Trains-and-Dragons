# Trains and Dragons

## Overview

A fun web-application where users can search, book and plan a trip with the site's trains

### Purpose and Target group

- **Purpose:** For users to book travelplans easily
- **Target group:** People who likes dragons and events that correlates with that theme, and who would like to travel to those events.

## Installation and Setup

### Prerequisites

Make sure the following is installed before you start:

- Node.js
- Git
- A modern browser (Chrome, Firefox)

### Clone the Repo

```bash
git clone https://gitlab.com/alex.raunert/malmo1-react-boiler.git
```

### Install Dependencies

```bash
npm install
```

eller

```bash
npm i
```

### Start the Developmentserver

```bash
npm run dev
```

The Application is now running on http://localhost:5173/ (via Vite)

### Start JSON-server

This can not run at the same time, in the same terminal as the developmentserver.

Have two terminals - one for each server

```bash
npm run start
```

The JSON-server is now running on http://localhost:3000/

#### Endpoints:

```plaintext
/departureBookings
/bookedSeats
/bookings
/cardInfo
/users
/departures
/trains
```

### Testing

```bash
npm test
```

#### Test-coverage:

- Vitest

```bash
npx vitest --coverage
```

## Folder Structure and Technologies

The project uses **React + Vite** with **Tailwind CSS** and **React Router**

```plaintext
malmo1-react-boiler/
| - docs/            # All Documentation Files
|  | - Retro.md         # The project's retro-conclusions
| - public/          # (vite logo) - Static Files
| - src/
|  | - assets/          # Images
|  | - components/      # Reusable Components
|  | - context/         # Global States
|  | - hooks/           # JS-files for fetch and booking-array
|  | - styles/          # CSS - modules
|  | - tests/           # Testing-files
|  | - util/            # JS-files for validation and configuration
|  | - views/           # Page-components
| - db.json          # The project's database
| - package.json     # The project's dependencies
| - README.md        # The project's documentation
| - vite.config.js   # Configuration for Vite
```

### Technologies used

- **React 18**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **JSON-server**

## User Instructions

1. **Search Trip**

   Chooses:

   - Destination
   - Date
   - Eventual extra passengers

2. **Choose travel-option**
3. **See Summary**
   - Whole summary of the user's choices
   - Add payment-method
4. **User Pays**
5. **Confirmation**
   - User gets confirmation on the page and by mail
   - If the user has an account - booking is saved on the profile

## Linked Resources

- **Figma-prototype** - UX

  https://www.figma.com/design/gj2RBuKVVqnGLOgaOGpO9R/T%C3%A5g!?node-id=1-3&p=f&t=TWVi8f9x7K1wFimj-0

- **Jira Board** - Projectplanning

  https://alexraunert.atlassian.net/jira/software/projects/M1/summary

## Team

| Name         | Role                  | GitLab                            |
| ------------ | --------------------- | --------------------------------- |
| **Alex**     | Teamleader / Frontend | https://gitlab.com/alex.raunert   |
| **Sandra**   | Frontend              | https://gitlab.com/Wicked_colours |
| **Federica** | Frontend              | https://gitlab.com/atfedmis       |
| **Rebecka**  | Frontend              | https://gitlab.com/bexgren        |

## Maintanence and Contribution

Follow these steps to contribute smoothly:

1. Create **new** branch from the **dev** branch
2. Make your changes
3. **Commit, pull and push** them to the branch **you are working in**
4. Make **merge request** in the Gitlab-repo
   - A request to merge your branch with the **dev** branch

## TODO and Future plans

    [x] Book train-rides
    [x] Login/Signup-form
    [x] Profile-page
    [x] Responsive

### For fun (if time allows)

    [ ] Online-shop
    [ ] Restaurant
    [ ] Book Events

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# School_assignment_Trains-and-Dragons
