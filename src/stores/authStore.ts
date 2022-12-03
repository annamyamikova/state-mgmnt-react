import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// API
import { refresh } from 'api/auth';

// Helpers
import instance from 'api/helpers/axios';

class AuthStore { }

const authStore = new AuthStore();

instance.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }

  config.headers.Authorization = `Bearer ${authStore.accessToken || ''}`;

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error: {
    message?: string;
    config: AxiosRequestConfig;
    response?: AxiosResponse;
    statusCode: number;
  }) => {
    console.log('RESPONSE ERROR', error.message, Object.entries(error));

    const isInIgnoredUrlList = [
      '/auth/login',
      '/auth/refresh-token',
      '/auth/logout',
    ].includes(error.config?.url || '');

    if (!error.response && !isInIgnoredUrlList) {
      // eslint-disable-next-line no-alert
      alert(
        'No internet connection.\nPlease, check your internet and try again'
      );

      return Promise.reject(error);
    }

    if (
      authStore.refreshToken &&
      authStore.uuid &&
      !isInIgnoredUrlList &&
      (error.response?.status === 401 ||
        error.message === 'Error: Request failed with status code 401' ||
        ((error.response?.status === 403 ||
          error.message === 'Error: Request failed with status code 403') &&
          error.response?.data === 'User is not authenticated'))
    ) {
      if (!authStore.refreshPromise) {
        authStore.refreshPromise = refresh(
          authStore.refreshToken,
          authStore.uuid
        );
      }

      const result = await authStore.refreshPromise;

      authStore.refreshPromise = null;

      if (!result) {
        return Promise.reject();
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      error.config.headers!.Authorization = `Bearer ${
        authStore.accessToken || ''
      }`;
      error.config.baseURL = undefined;

      return axios.request(error.config);
    }

    // if (error.response.status === 400 || error.message === 'Error: Request failed with status code 400') {
    //   Toast.show('Fields are filled in incorrectly.\nPlease, set correctly values', {
    //     duration: 1500,
    //   });
    // }

    console.warn('HTTP Error', error);

    if (
      !isInIgnoredUrlList &&
      error.response?.status &&
      error.response?.status >= 400 &&
      error.response?.status !== 401 &&
      error.response?.data !== 'User is not authenticated'
    ) {
      // eslint-disable-next-line no-alert
      alert(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.response?.data?.error?.message ||
          'Server error.\nPlease, try again later'
      );
    }

    if (error.response?.status) {
      error.statusCode = error.response.status;
    }

    return Promise.reject(error);
  }
);

export default authStore;
