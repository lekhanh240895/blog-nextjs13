export function getImageUrl(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () =>
        resolve((event.target as FileReader).result as string);
      image.onerror = () => resolve(null);
      image.src = (event.target as FileReader).result as string;
    };
    reader.readAsDataURL(file);
  });
}
