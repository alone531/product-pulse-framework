
import { categories } from "@/lib/data";
import CategoryList from "@/components/products/CategoryList";

export default function Categories() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1">Manage product categories</p>
      </div>

      {/* Categories list */}
      <CategoryList categories={categories} />
    </div>
  );
}
