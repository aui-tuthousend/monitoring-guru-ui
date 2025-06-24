import { create } from 'zustand';


interface WebsocketState {
  loading: boolean;
  serverUrl: string;
  isConnected: boolean;
  messageListeners: ((data: string) => void)[];
  connectWebSocket: () => void;
  closeConnection: () => void;
  sendMessage: (data: string) => void;
  addMessageListener: (cb: (data: string) => void) => void;
  removeMessageListener: (cb: (data: string) => void) => void;
}

export const useWebsocket = create<WebsocketState>((set, get) => {
  let ws: WebSocket | null = null;
  let reconnectOnClose = true;
  let isConnected = false;
  let randomId = Math.floor(Math.random() * 1000);

  const start = () => {
    const { serverUrl } = get();
    ws = new WebSocket(serverUrl);

    const realClose = ws.close.bind(ws);
    ws.close = () => {
      reconnectOnClose = false;
      realClose();
    };

    ws.onopen = () => {
      isConnected = true;
      set({ isConnected: true, loading: false });
    };

    ws.onclose = () => {
      isConnected = false;
      set({ isConnected: false, loading: true });
      
      if (!reconnectOnClose) {
        console.log('WebSocket closed, attempting reconnect...');
        setTimeout(start, 1000);
      } else {
        console.log('WebSocket closed manually');
      }
    };

    ws.onmessage = (event) => {
      get().messageListeners.forEach(fn => fn(event.data));
    };

    ws.onerror = (e) => {
      console.error('WebSocket error:', e);
    };
  };

  return {
    loading: false,
    serverUrl: `ws://localhost:8080/ws/user-${randomId}`,
    isConnected: false,
    messageListeners: [],
    connectWebSocket: start,
    closeConnection: () => {
      reconnectOnClose = false;
      ws?.close();
    },
    sendMessage: (data) => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    },
    addMessageListener: (cb) => {
      set((state) => ({
        messageListeners: [...state.messageListeners, cb],
      }));
    },
    removeMessageListener: (cb) => {
      set((state) => ({
        messageListeners: state.messageListeners.filter((fn) => fn !== cb),
      }));
    },
  };
});
