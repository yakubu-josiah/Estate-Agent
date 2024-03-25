# Land Deals NG <sub><sup> [vercel deployment](https://estate-agent-tau.vercel.app)

A user-friendly web application built with React.js and Firebase Firestore that empowers real estate agents to efficiently list land properties and allows users to browse available offers.

## Getting Started

### Prerequisites:

- A Firebase project with Firestore database ([Firebase Setup Guide](https://firebase.google.com/docs/projects/api/workflow_set-up-and-manage-project))
- Node.js and npm (or yarn) installed on your system ([Install Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/yakubu-josiah/Estate-Agent.git
   cd Estate-Agent
   ```

2. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```

### Development

Start the development server:
   ```bash
   npm start  # or yarn start
   ```

This will typically launch the application at http://localhost:3000/ in your browser.

### Deployment

Build for production:
   ```bash
   npm run build  # or yarn build
   ```

Deployment options (Choose one or more based on your preference):

- [Vercel](https://vercel.com/): Follow Vercel's deployment instructions for React applications.
- [Netlify](https://www.netlify.com/): Follow Netlify's deployment instructions for React applications.
- [Heroku](https://www.heroku.com/): Follow Heroku's deployment instructions for Node.js applications (you'll need to configure a web server like Express.js).
- [Firebase Hosting](https://firebase.google.com/docs/hosting): If you're already using Firebase for your database, you can leverage Firebase Hosting for deployment.

## Features

- Agent dashboard for managing and listing land properties.
- User-friendly interface for browsing available land offers.
- Search and filter capabilities to streamline property discovery.
- User authentication for managing accounts and favorites.
- Interactive map integration using Leaflet for visualizing property locations.

## Technology Stack

- Frontend: React.js
- Database: Firebase Firestore
- Other libraries: React Router, React Icons, React Moment, Leaflet, Firebase SDK, etc.

## Testing

The project includes unit tests using Jest and React Testing Library.

You can run the tests using:
   ```bash
   npm test  # or yarn test
   ```

## Contributing

Contributions are welcome! Please follow our [Contribution Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the [MIT License](LICENSE).
