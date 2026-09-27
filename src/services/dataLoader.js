import { readFile } from 'node:fs/promises';

export async function loadJson(filePath, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    // Timer para el Event Loop
    const timer = setTimeout(() => {
      reject(new Error(`Tiempo agotado leyendo ${filePath}`));
    }, timeoutMs);

    // Leemos el archivo en el disco
    readFile(filePath, 'utf-8')
      .then(content => {
        clearTimeout(timer);
        resolve(JSON.parse(content));
      })
      .catch(err => {
        clearTimeout(timer);
        reject(new Error(`No se pudo leer el archivo: ${err.message}`));
      });
  });
}