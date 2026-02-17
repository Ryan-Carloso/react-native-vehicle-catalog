export async function delay(ms: number): Promise<void> {
  await new Promise<void>((resolve: () => void) => {
    setTimeout(resolve, ms);
  });
}
