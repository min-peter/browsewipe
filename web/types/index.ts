import UserBrowser from "@/models/UserBrowser";
import { InferSchemaType } from "mongoose";

export type UserId = string;

export type BrowserData = {
  userId: number;
}

export type GetBrowsersFilters = {
  userId?: string | '';
  searchTerm?: string | '';
}

export type IUserBrowser = InferSchemaType<typeof UserBrowser>;
