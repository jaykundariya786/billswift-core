import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const mockProducts: Product[] = [
  { id: "P001", name: "Wireless Headphones", category: "Electronics", price: 299.99, stock: 45, status: "In Stock" },
  { id: "P002", name: "Premium T-Shirt", category: "Clothing", price: 29.99, stock: 8, status: "Low Stock" },
  { id: "P003", name: "Business Laptop", category: "Electronics", price: 1299.99, stock: 0, status: "Out of Stock" },
  { id: "P004", name: "Coffee Maker", category: "Appliances", price: 199.99, stock: 23, status: "In Stock" },
  { id: "P005", name: "Running Shoes", category: "Sports", price: 89.99, stock: 67, status: "In Stock" },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    product.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Product form will be implemented soon",
    });
  };

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Edit Product",
      description: `Editing product ${productId}`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Product Deleted",
      description: "product has been successfully deleted",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-success/10 text-success";
      case "Low Stock":
        return "bg-warning/10 text-warning";
      case "Out of Stock":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const columns = [
    {
      key: "id" as keyof Product,
      label: "Product ID",
      width: "w-24"
    },
    {
      key: "name" as keyof Product,
      label: "Product Name",
      width: "w-64"
    },
    {
      key: "category" as keyof Product,
      label: "Category",
      width: "w-32"
    },
    {
      key: "price" as keyof Product,
      label: "Price",
      render: (price: number) => `$${price.toFixed(2)}`,
      width: "w-24"
    },
    {
      key: "stock" as keyof Product,
      label: "Stock",
      width: "w-20"
    },
    {
      key: "status" as keyof Product,
      label: "Status",
      render: (status: string) => (
        <Badge className={getStatusColor(status)}>
          {status}
        </Badge>
      ),
      width: "w-28"
    },
    {
      key: "id" as keyof Product,
      label: "Actions",
      render: (_: any, product: Product) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditProduct(product.id)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteProduct(product.id)}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
      width: "w-24"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product inventory and track stock levels.
        </p>
      </div>

      <DataTable
        title="Product Inventory"
        data={filteredProducts}
        columns={columns}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAdd={handleAddProduct}
        addLabel="Add Product"
      />
    </div>
  );
}