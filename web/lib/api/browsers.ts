import { BrowserData, GetBrowsersFilters, UserId } from "@/types/index";

export async function getBrowsers(userId: UserId, filters?: GetBrowsersFilters) {
  let url = `/api/browsers?userId=${userId}`;
  if (filters?.searchTerm) {
    url += '&searchTerm='+filters.searchTerm; 
  }
  const response = await fetch(url);
  console.log("response getbroswers-"+JSON.stringify(response));
  if (! response.ok) {
    throw new Error(`Failed to fetch browsers`);
  }
  const json = await response.json();
  return json;
}

export async function createBrowsers(data: BrowserData) {
  const response = await fetch('/api/browsers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (! response.ok) {
    throw new Error(`Failed to create browser: ${response.statusText}`);
  }

  const json = await response.json();
  return json;
}

export async function updateBrowsers(id: number, data: BrowserData) {
  const response = await fetch(`/api/browsers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (! response.ok) {
    throw new Error(`Failed to update browser: ${response.statusText}`);
  }

  const json = await response.json();
  return json;
}

export async function deleteBrowsers(id: number) {
  const response = await fetch(`/api/browsers/${id}`, {
    method: 'DELETE'
  });
  
  if (! response.ok) {
    throw new Error(`Failed to delete browser ID ${id} with status ${response.statusText}`);
  }

  return true;
}