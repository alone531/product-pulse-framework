
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/SearchBar";
import FilterPopover from "@/components/ui/FilterPopover";
import UsersTable from "@/components/users/UsersTable";
import { users } from "@/lib/data";

// Filter configuration
const filterGroups = [
  {
    id: "role",
    label: "Role",
    options: [
      { id: "admin", label: "Admin" },
      { id: "manager", label: "Manager" },
      { id: "editor", label: "Editor" },
      { id: "viewer", label: "Viewer" },
    ],
  },
  {
    id: "status",
    label: "Status",
    options: [
      { id: "active", label: "Active" },
      { id: "inactive", label: "Inactive" },
      { id: "pending", label: "Pending" },
    ],
  },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    // Search filtering
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Role filtering
    if (
      selectedFilters.role?.length > 0 &&
      !selectedFilters.role.includes(user.role)
    ) {
      return false;
    }

    // Status filtering
    if (
      selectedFilters.status?.length > 0 &&
      !selectedFilters.status.includes(user.status)
    ) {
      return false;
    }

    return true;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage your user accounts</p>
        </div>
        <Button asChild>
          <Link to="/users/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <SearchBar 
          className="w-full sm:w-80"
          placeholder="Search users..." 
          value={searchQuery}
          onChange={handleSearch}
        />
        <FilterPopover 
          filters={filterGroups}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{filteredUsers.length}</span> of{" "}
        <span className="font-medium text-foreground">{users.length}</span> users
      </div>

      {/* Users table */}
      <UsersTable users={filteredUsers} />
    </div>
  );
}
