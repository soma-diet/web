import { ApiError } from "../error";

export class AuthError extends ApiError {}

export class UserNotLoggedInError extends AuthError {}
