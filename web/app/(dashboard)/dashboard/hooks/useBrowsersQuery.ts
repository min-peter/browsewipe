'use client'
import { getBrowsers } from "@/lib/api/browsers";
import { UserId, GetBrowsersFilters } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useBrowsersQuery({ userId, browsersFilters, initialData }: { userId: UserId | undefined, browsersFilters: GetBrowsersFilters; initialData? : any;}) {
  return useQuery({
    queryKey: ['browsers', browsersFilters],
    enabled: !!userId,
    queryFn: () => {
      if (!userId) {
        throw new Error("QUery attempted to run without userId");
      }
      return getBrowsers(userId, browsersFilters);
    },
    initialData,
  });
}