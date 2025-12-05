import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectSeparator } from "@radix-ui/react-select"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useBrowsersFilter } from "@/app/store/filterStore"

export const BrowsersFilter = () => {
  const { browsersFilters, setBrowsersFilters, resetBrowsersFilter } = useBrowsersFilter();
  const [key, setKey] = useState(+new Date())
  const [localSearchTerm, setLocalSearchTerm] = useState(browsersFilters?.searchTerm ?? '');

  const clearFilters = (e) => {
    e.stopPropagation()
    resetBrowsersFilter()
    setKey(+new Date())
    setLocalSearchTerm('');
  }

  const submitFilter = () => {
    setBrowsersFilters({ 
      searchTerm: localSearchTerm
    });
  }

  return (
    <div className="w-full my-2 px-1 flex flex-column flex-wrap gap-2 text-center items-center">
      <h6 className="text-gray-500">Filter:</h6>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="searchTerm" placeholder="Enter title search"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
        <Button
          className="px-2"
          variant="outline"
          size="sm"
          onClick={submitFilter}
        >
          Filter
        </Button>
        <Button
          className="px-2"
          variant="secondary"
          size="sm"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}