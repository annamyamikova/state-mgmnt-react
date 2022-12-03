import { useEffect } from 'react';

// // Stores
// import sessionStore from 'stores/sessionStore';

import { updateData } from "actions/SessionAction";

// Types
import { SocketCtx, SocketHandlerEvent } from 'types/socket';
import { SessionData } from 'types/game';
import {connect} from "react-redux";

interface PatchedData {
  data: Partial<SessionData>;
}

export const useRealtime = (socket?: SocketCtx): void => {
  useEffect(() => {
    if (socket?.isInit) {
      socket?.subscribe(
        SocketHandlerEvent.game_updatedData,
        ({ data }: PatchedData) => {
          console.log('subscription: game_updatedData', data);

          sessionStore.updateData(data);
        }
      );
    }

    return () => {
      socket?.unsubscribe(SocketHandlerEvent.game_updatedData);
    };
  }, [socket?.isInit]);
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateData: ({...session}: Partial<SessionData>) => dispatch(updateData(session)),
  }
};

export default connect(mapDispatchToProps)(useRealtime);
