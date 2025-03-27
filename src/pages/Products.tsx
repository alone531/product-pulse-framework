import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/SearchBar";
import FilterPopover from "@/components/ui/FilterPopover";
import ProductsTable from "@/components/products/ProductsTable";
import { products } from "@/lib/data";

// Filter configuration
const filterGroups = [
  {
    id: "category",
    label: "Category",
    options: [
      { id: "electronics", label: "Electronics" },
      { id: "clothing", label: "Clothing" },
      { id: "home", label: "Home & Kitchen" },
      { id: "books", label: "Books" },
    ],
  },
  {
    id: "status",
    label: "Status",
    options: [
      { id: "inStock", label: "In Stock" },
      { id: "lowStock", label: "Low Stock" },
      { id: "outOfStock", label: "Out of Stock" },
    ],
  },
  {
    id: "price",
    label: "Price Range",
    options: [
      { id: "under50", label: "Under $50" },
      { id: "50to100", label: "$50 to $100" },
      { id: "100to200", label: "$100 to $200" },
      { id: "over200", label: "Over $200" },
    ],
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    // Search filtering
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Other filters
    // This is simplified - in a real app, you'd implement more robust filtering
    for (const [groupId, selectedOptions] of Object.entries(selectedFilters)) {
      if (selectedOptions.length === 0) continue;

      if (groupId === "category") {
        if (!selectedOptions.includes(product.category.toLowerCase())) {
          return false;
        }
      }

      if (groupId === "status") {
        const statusMap: Record<string, string> = {
          inStock: "In Stock",
          lowStock: "Low Stock",
          outOfStock: "Out of Stock",
        };
        
        if (!selectedOptions.some(option => statusMap[option] === product.status)) {
          return false;
        }
      }

      if (groupId === "price") {
        let matches = false;
        
        for (const option of selectedOptions) {
          if (option === "under50" && product.price < 50) matches = true;
          if (option === "50to100" && product.price >= 50 && product.price <= 100) matches = true;
          if (option === "100to200" && product.price > 100 && product.price <= 200) matches = true;
          if (option === "over200" && product.price > 200) matches = true;
        }
        
        if (!matches) return false;
      }
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
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product inventory</p>
        </div>
        <Button asChild>
          <Link to="/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <SearchBar 
          className="w-full sm:w-80"
          placeholder="Search products..." 
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
        Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> of{" "}
        <span className="font-medium text-foreground">{products.length}</span> products
      </div>

      {/* Products table */}
      <ProductsTable products={filteredProducts} />
    </div>
  );
}
