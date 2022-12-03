// Helpers
import axios from 'api/helpers/axios';

// Types
import { IGame } from 'types/game';

export default {
  async list(): Promise<{
    data: IGame[];
  }> {
    const response = await axios.get('/games');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  },
};
