<h1 align="center">
    <a href="https://expose.sh/#gh-light-mode-only">
    <img src="./.github/assets/expose_logo_black.svg">
    </a>
    <a href="https://expose.sh/#gh-dark-mode-only">
    <img src="./.github/assets/expose_logo_white.svg">
    </a>
</h1>

## About

EXPOSE-functions is a collection of serverless functions that power the EXPOSE service.  
These functions are written in Node.js and deployed on Firebase.  
They handle various tasks such as:
- Processing GitHub stars and sponsors webhooks,
- Verifying GitHub users and fetching their SSH keys,
- Keeping the functions warm to ensure quick response times.

Find out more about EXPOSE by [clicking here](https://expose.sh).

## Deploy

### Creating a Firebase project

Create a Firebase project on the Firebase online console

### Installing the Firebase CLI

```
npm install -g firebase-tools
```

### Logging in to Firebase

```
firebase login
```

### Initializing Firebase

```
firebase init
```

### Define the environment variables

Copy the .env.example file to .env

```
cp functions/.env.example functions/.env
```

You need to define the following environment variables:

```
ACCESS_TOKEN
GITHUB_WEBHOOK_SECRET
VERIFY_GITHUB_USER_AND_FETCH_SSH_KEYS_URL
```

`ACCESS_TOKEN` is a string that you will define at random and that will be needed to communicate with EXPOSE-server, `GITHUB_WEBHOOK_SECRET` is the secret for GitHub WebHooks and `VERIFY_GITHUB_USER_AND_FETCH_SSH_KEYS_URL` will be the URL of the Cloud Function dedicated to user verification.  
For the last variable, you'll need to define it after the first deployment.

### Deploying the functions

```
firebase deploy --only functions
```

## Functions

The functions are located in the `functions` directory.  
Each function is in its own file in the `src` directory.  
The `index.js` file exports these functions so they can be deployed to Firebase.

Here is a brief overview of what each function does:

- `handleGitHubStarsWebhook`: This function processes the webhook events sent by GitHub when a user stars the repository.
- `handleGitHubSponsorsWebhook`: This function processes the webhook events sent by GitHub when a user sponsors the repository.
- `verifyGitHubUserAndFetchSSHKeys`: This function verifies a GitHub user and fetches their SSH keys.
- `warmer`: This function keeps the other functions warm by periodically invoking them.

## More details

### `handleGitHubStarsWebhook`

This function receives a request containing the webhook event data.    
It processes this data and performs the necessary actions based on the event type.

### `handleGitHubSponsorsWebhook`

This function works similarly to the `handleGitHubStarsWebhook` function.  
It processes the webhook events related to GitHub Sponsors.

### `verifyGitHubUserAndFetchSSHKeys`

This function verifies a GitHub user and fetches their SSH keys.  
It uses the `verifyToken` function to authenticate the request.

### `warmer`

This function is scheduled to run every minute.  
It invokes the other functions to keep them warm and ensure quick response times.

## License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see http://www.gnu.org/licenses/.