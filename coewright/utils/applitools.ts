export function isApplitoolsRunEnabled(): boolean {
  return process.env.APPLITOOLS_RUN?.trim().toLowerCase() === 'true';
}

export function getApplitoolsServerUrl(): string {
  return (
    process.env.APPLITOOLS_SERVER_URL?.trim() ||
    'https://lbgeyes.applitools.com/'
  );
}

export function getApplitoolsApiKey(): string | undefined {
  return process.env.APPLITOOLS_API_KEY?.trim();
}
