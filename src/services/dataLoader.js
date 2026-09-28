import { readFile } from 'node:fs/promises';

export function loadJson(filePath, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    // Timer para el Event Loop
    const timer = setTimeout(() => {
      reject(new Error(`Tiempo agotado leyendo ${filePath}`));
    }, timeoutMs);

    // Leemos el archivo en el disco
    readFile(filePath, 'utf-8')
      .then(content => {
        clearTimeout(timer);
        try {
          resolve(JSON.parse(content));
        } catch (parseErr) {
          reject(new Error(`JSON invalido en ${filePath}: ${parseErr.message}`));
        }
      })
      .catch(err => {
        clearTimeout(timer);
        reject(new Error(`No se pudo leer el archivo: ${err.message}`));
      });
  });
}   