import { LobbyMessage, SpectateMessage } from "@/lib/types/lobby.types";

let socket: WebSocket | null = null;
let spectateListeners: Array<(msg: SpectateMessage) => void> = [];
let lobbyListeners: Array<(msg: LobbyMessage) => void> = [];

let pending: Array<SpectateMessage | LobbyMessage | object> = [];
let reconnectTimer: NodeJS.Timeout | null = null;
let isManuallyClosed = false;

const WS_URL = process.env.NEXT_PUBLIC_AOE_LOBBY_WS_URL!;

function connect() {
  if (socket) return;

  isManuallyClosed = false;
  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    pending.forEach((p) => socket!.send(JSON.stringify(p)));
    pending = [];
    console.log("Connected");
  };

  socket.onmessage = (evt: MessageEvent<string>) => {
    let msg;
    try {
      msg = JSON.parse(evt.data);
    } catch {
      return;
    }
    if (msg.spectate_match_all || msg.spectate_match_update) {
      spectateListeners.forEach((fn) => fn(msg));
      return;
    }

    if (msg.lobby_match_all || msg.lobby_match_update) {
      lobbyListeners.forEach((fn) => fn(msg));
      return;
    }
  };

  socket.onerror = () => {
    socket?.close();
    console.log("Socket Error");
  };

  socket.onclose = () => {
    socket = null;
    console.log("Connection closed");
    if (!isManuallyClosed) {
      reconnectTimer = setTimeout(connect, 2000);
    }
  };
}

export function getSocket() {
  connect();
  return socket!;
}

export function wsSend(msg: object) {
  const ws = getSocket();
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  } else {
    pending.push(msg);
  }
}

export function addSpectateListener(fn: (msg: SpectateMessage) => void) {
  spectateListeners.push(fn);
  return () => {
    spectateListeners = spectateListeners.filter((l) => l !== fn);
  };
}

export function addLobbyListener(fn: (msg: LobbyMessage) => void) {
  lobbyListeners.push(fn);
  return () => {
    lobbyListeners = lobbyListeners.filter((l) => l !== fn);
  };
}
