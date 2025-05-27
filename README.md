# Music Bands Data Query Website

This project is a data query website for music bands developed as part of a React development challenge. It demonstrates fundamental React skills by implementing a simple yet functional application with authentication, data filtering, sorting, and detailed views.

## Project Overview

The website includes the following features:

- **Authentication:**  
  A login page that protects the rest of the application behind an authorization wall.
- **Band Listing & Navigation:**  
  Users can view a list of bands and navigate between them.
- **Filtering and Sorting:**  
  Enable users to filter and sort bands based on various criteria.
- **Detailed Band Information:**  
  View details for a specific band, including albums and members.
- **Logout Functionality:**  
  Allows the user to securely log out.

## API and Data Models

**API URL:**  
`https://my-json-server.typicode.com/gustavofmacia/react-challenge`

For more details on interacting with the API (filters, pagination, etc.), please refer to the [JSON Server Documentation](https://github.com/typicode/json-server/tree/v0).

### Data Models Overview

- **Band:**  
  Contains information about the band, including its members and albums.
- **Genre:**  
  Represents various music genres.
- **Album:**  
  Represents an album that belongs to a band.

## Technical Requirements

- **React Version:**  
  Use React 18 or higher.
- **Language:**  
  The project can be written in JavaScript or TypeScript.
- **Code Standards:**
  - All code and comments must be written in English.
  - Use proper naming conventions and standards for variables, functions, and file organization.
  - Maintain a clear and logical project structure, especially for URL paths.
- **Optional:**
  - Using ESLint (or another linter) is optional but recommended.
  - State management libraries (such as Redux or Flux) are optional.

## Key Technologies Used

- **Next.js:**  
  A React framework for server-side rendering and static site generation. Next.js is used to handle routing, SSR, and API routes.
- **React:**  
  The core library for building the user interface.
- **TypeScript:**  
   Provides static typing to catch errors early and improve code quality.
- **NextAuth.js:**  
  A library for handling authentication in Next.js applications. It is used in this project to manage login, authentication, and session handling, ensuring secure access to pages behind the "authorization wall."
- **Shadcn UI:**  
  A component library that provides pre-built, customizable UI components.
- **Tailwind CSS:**  
  A utility-first CSS framework for rapid UI development with a consistent design system.
- **ESLint:**  
  A tool for identifying and fixing problems in JavaScript/TypeScript code. It ensures code quality and consistency by enforcing coding standards and conventions.
- **Prettier:**  
  An opinionated code formatter that automatically formats code according to a consistent style, ensuring readability and reducing debates on code style during collaboration.

## UI Design

The user interface of this project is designed with responsiveness in mind, ensuring a seamless experience across different screen sizes and devices. Tailwind CSS was used to implement a mobile-first, responsive layout.

### Table vs. Cards

For displaying the list of bands, a **table** was chosen to provide a clear and structured view of the data. This choice allows for easy comparison of information such as band names, genres, and other attributes in a tabular format. The table also includes sorting and filtering capabilities, making it convenient to navigate through the bands.

However, an alternative approach could have been to use **cards** instead of a table. With this design, each band could be displayed in its own card, providing a more visual and compact representation. In such a case, the sorting and filtering controls could have been placed outside the table (or card view) as separate components, allowing users to first select their desired filter or sort options before the results are displayed in the cards.

Both designs are valid choices, and while the table offers a more traditional, grid-like view of the data, using cards could provide a more flexible, modern design depending on the context and user preferences.

## Project Structure

The project follows a well-organized folder hierarchy to promote clarity and maintainability. Below is an overview of the structure:

- /app
  - /(pages)
  - /api
  - /login
- /components
  - /shadcn
  - /ui
- /lib
- /public
- /server-actions
- /types

### Explanation of Key Folders and Files

- **/app:** Contains the main application components, pages, and API routes when using the Next.js app directory.
  - **/(pages)**
    - **/bands:** Contains pages related to bands, including the main listing page and individual band details.
    - **/@modal:** To intercepts the /bands/[id] route, masks the URL, and overlays it over /bandsfeed. For more information: [intercepting-routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
  - **/api:** Contains API route handlers. In this case, is use for the authentication.
- **/components:** Contains reusable UI components used throughout the project.
  - **/shadcn:** Constains Shadcn UI components.
  - **/ui:** Contains specific UI components like buttons, modals, and table headers.
- **server-actions**: This folder contains functions for fetching data that are always executed on the server side.
- **/public:** Contains static assets like images and icons.
- **/utils:** Contains utility functions and helper modules.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- pnpm

### Installation

1. Clone the repository (as a private repository shared with you).
2. Install dependencies:

```bash
pnpm install
```

### Configuration

Before running the project, make sure to create a `.env.local` file at the root of the project with the following environment variable:

```shell
NEXTAUTH_SECRET=
```

The environment variable need a random string that used to hash tokens, sign/encrypt cookies and generate cryptographic keys.
You can quickly create a good value on the command line via this openssl command:

```bash
openssl rand -base64 32
```

[More information](https://next-auth.js.org/errors#no_secret)
[More information](https://next-auth.js.org/configuration/options#secret)


### Running the Development Server

Start the development server with:

```bash
pnpm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The login credentials are:
**Username:** admin
**Password:** admin
The home route (/) is configured to redirect to /bands, which is currently the only available page.

### Building and Running in Production

To build the project, run:

```bash
pnpm run build
```

After the build process is complete, start the project with:

```bash
pnpm run start
```

## Additional Information

### Authentication

The project includes a dedicated login page for authentication. Once authenticated, users can access the rest of the application. Unauthorized users are blocked via middleware.

### Routing

The project uses Next.js routing conventions. The folder structure is designed to make it easy to add and manage additional pages and routes.

### API Integration

The project interacts with a JSON Server API that supports filtering, pagination, and other query operations. Refer to the [JSON Server Documentation](https://github.com/typicode/json-server/tree/v0) for details on how to work with the API.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Conclusion

This project demonstrates fundamental React and Next.js development skills by combining modern technologies and best practices into a user-friendly data query website for music bands. It showcases effective use of authentication, data querying, filtering, and dynamic routing.
