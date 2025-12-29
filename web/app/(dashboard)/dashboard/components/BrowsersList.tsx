'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useBrowsersQuery } from "../hooks/useBrowsersQuery";
import { useBrowsersMutation } from "../hooks/useBrowsersMutation";
import { useBrowsersFilter } from "@/app/store/filterStore";

export const BrowsersList = ({ userId }: { userId: string }) => {
  console.log("BrowsersList userId:", userId);

  const { browsersFilters } = useBrowsersFilter();
  const { data: posts, isLoading, isError } = useBrowsersQuery({ userId, browsersFilters });
  const { create, update, remove } = useBrowsersMutation();

  return (
    <div className="w-full pt-3">
      {/* <BrowsersFilter /> */}
      {
        !isLoading && (posts?.length == 0 || !posts?.length)&& (
          <div>
            No Item Found.
          </div>
        )
      }
      {isLoading ? <div>Loading...</div> : posts?.map((p) => (
        <div key={p._id} className="mb-2">
          <Card>
            <CardHeader>
              <CardTitle>{ p.profile_label }</CardTitle>
              <CardAction>
                <Button variant="default" color="primary" size="sm"
                  onClick={() => {
                    update.mutate({
                      id: p._id,
                      data: {
                        userId: p.user_id,
                      }
                    })
                  }}
                  >{p.emergency_action ? "Disable Emergency" : "Enable Emergency"}</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="col-span-1 font-semibold text-gray-500 dark:text-gray-400 border-b-1 border-gray-200">Browser Name:</dt>
                <dd className="col-span-1 text-wrap border-b-1 border-gray-200">{ p.browser_name }</dd>

                <dt className="col-span-1 font-semibold text-gray-500 dark:text-gray-400 border-b-1 border-gray-200">Browser Id:</dt>
                <dd className="col-span-1 text-wrap border-b-1 border-gray-200">{ p.browser_id }</dd>

                <dt className="col-span-1 font-semibold text-gray-500 dark:text-gray-400 border-b-1 border-gray-200">Profile UUID:</dt>
                <dd className="col-span-1 text-wrap border-b-1 border-gray-200">{ p.profile_uuid }</dd>

                <dt className="col-span-1 font-semibold text-gray-500 dark:text-gray-400 border-b-1 border-gray-200">User Id:</dt>
                <dd className="col-span-1 text-wrap border-b-1 border-gray-200">{ p.user_id }</dd>

                <dt className="col-span-1 font-semibold text-gray-500 dark:text-gray-400">Emergency Action:</dt>
                <dd className={`col-span-1 text-wrap font-bold ${p.emergency_action ? 'text-red-600' : 'text-gray-400'}`}>{p.emergency_action ? "Yes" : "No"}</dd>
              </dl>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}