export const environment = {
    production: true,
    signalingServerUrl: 'https://192.168.2.107:8888/hubs',
    iceServers: [
      {urls: 'stun:stun.1.google.com:19302'},
      {urls: 'stun:stun1.l.google.com:19302'}
    ]
  };
