/**
 * Clipboard writes are intended to be called from an explicit user action on
 * the HTTPS game page. The caller must show a manual-copy fallback on failure.
 */
export async function copyTextToClipboard(text: string): Promise<void> {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    throw new Error('Clipboard API is unavailable');
  }
  await navigator.clipboard.writeText(text);
}
