export function decodeToken(token: string) {
    if (token && token.split('.').length === 3) {
      try {
        const payloadBase64 = token.split('.')[1];
        return JSON.parse(atob(payloadBase64));
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    console.error('Token inválido');
    return null;
  }
