export async function payloadFetch<T>(
  endpoint: string,
  options?: RequestInit & { draft?: boolean },
): Promise<T> {
  const { draft, ...fetchOptions } = options || {};

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(import.meta.env.PAYLOAD_API_KEY && {
      Authorization: `Bearer ${import.meta.env.PAYLOAD_API_KEY}`,
    }),
    ...fetchOptions?.headers,
  };

  const cacheOptions = draft
    ? {
        cache: "no-store" as RequestCache,
      }
    : {
        cache: "force-cache" as RequestCache,
      };

  const fullUrl = `${import.meta.env.PAYLOAD_URL}/api${endpoint}`;

  console.log(fullUrl);
  try {
    const response = await fetch(fullUrl, {
      ...fetchOptions,
      ...cacheOptions,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Payload API error: ${response.status} ${response.statusText}`,
      );
    }

    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    throw error;
  }
}
