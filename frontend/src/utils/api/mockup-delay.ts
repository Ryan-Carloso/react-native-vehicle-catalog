// High simulated delay for demonstration; displays loading indicator and renders UI skeleton
export const FAKE_PAGE_DELAY_MS: number = 300;

export async function delay(): Promise<void> {
  await new Promise<void>((resolve: () => void) => {
    setTimeout(resolve, FAKE_PAGE_DELAY_MS);
  });
}
