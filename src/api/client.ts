import { auth } from "@/infra/firebase";
import { UserNotLoggedInError } from "./auth/auth.error";
import { ApiError } from "./error";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  ignoreAutoContentType = false as boolean,
) {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) {
    throw new UserNotLoggedInError(
      "User has to be logged in to use fetchWithAuth!",
    );
  }

  const token = await user.getIdToken();

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    ...((options.headers as Record<string, string>) || {}),
  };

  // auto add content-type: json if not specified
  if (
    options.method &&
    options.method !== "GET" &&
    !headers["Content-Type"] &&
    !ignoreAutoContentType
  ) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiError(
      `${response.status}: ${response.statusText}`,
      null,
      true,
    );
  }

  return response;
}
