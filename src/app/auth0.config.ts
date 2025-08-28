import { environment } from '../environments/environment';

export const auth0Config = {
  domain: environment.auth0.domain,
  clientId: environment.auth0.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin + '/',
  },
};
