const BASE_URL = process.env.API_BASE_URL ?? '';
const TOKEN = process.env.BEARER_TOKEN ?? '';
const BRAND = process.env.API_BRAND ?? 'LYDS';
const ORG = process.env.API_ORG ?? 'LBG';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      'x-lbg-txn-correlation-id': crypto.randomUUID(),
      'x-lbg-brand': BRAND,
      'x-lbg-org': ORG,
      ...init.headers,
    },
  });

  if (!res.ok)
    throw new ApiError(res.status, `${res.status} ${res.statusText}`);
  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}
