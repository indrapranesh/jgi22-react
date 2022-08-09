const REDIRECT_URI = 'http://localhost:3000/';
const USER_SCOPE = `signature%20user_read%20user_write%20group_read`;
const INTEGRATION_KEY = process.env.REACT_APP_DOCUSIGN_INTEGRATION_KEY;
const MEDIAVALET_CLIENT_ID = process.env.REACT_APP_MEDIAVALET_CLIENT_ID;

export const DOCUSIGN_LOGIN_URL = `https://account-d.docusign.com/oauth/auth?response_type=token&scope=${USER_SCOPE}&client_id=${INTEGRATION_KEY}&redirect_uri=${REDIRECT_URI}`;

export const MEDIAVALET_LOGIN_URL = `https://login.mediavalet.com/connect/authorize?client_id=${MEDIAVALET_CLIENT_ID}&response_type=code&scope=api%20offline_access&redirect_uri=http://localhost:3000&state=state-296bc9a0`