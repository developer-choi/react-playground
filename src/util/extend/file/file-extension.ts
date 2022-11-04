export function getFileExtension(filename: string): string | undefined {
  if (filename.includes('.')) {
    const lastIndex = filename.lastIndexOf('.') + 1;
    return cleanFileExtension(filename.slice(lastIndex));
  } else {
    return undefined;
  }
}

export function cleanFileExtension(extension: string) {
  let value = extension;

  if (extension.startsWith('.')) {
    value = value.slice(0);
  }

  return value.toLowerCase();
}
