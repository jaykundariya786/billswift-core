import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastPurchase: string;
  status: "Active" | "Inactive";
}

const mockCustomers: Customer[] = [
  { 
    id: "C001", 
    name: "John Doe", 
    email: "john@email.com", 
    phone: "+1-234-567-8900", 
    totalPurchases: 2450.00, 
    lastPurchase: "2024-01-15",
    status: "Active"
  },
  { 
    id: "C002", 
    name: "Sarah Wilson", 
    email: "sarah@email.com", 
    phone: "+1-234-567-8901", 
    totalPurchases: 1890.50, 
    lastPurchase: "2024-01-12",
    status: "Active"
  },
  { 
    id: "C003", 
    name: "Mike Johnson", 
    email: "mike@email.com", 
    phone: "+1-234-567-8902", 
    totalPurchases: 750.25, 
    lastPurchase: "2023-12-20",
    status: "Inactive"
  },
  { 
    id: "C004", 
    name: "Emma Davis", 
    email: "emma@email.com", 
    phone: "+1-234-567-8903", 
    totalPurchases: 3200.00, 
    lastPurchase: "2024-01-18",
    status: "Active"
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    customer.phone.includes(searchValue)
  );

  const handleAddCustomer = () => {
    toast({
      title: "Add Customer",
      description: "Customer form will be implemented soon",
    });
  };

  const handleEditCustomer = (customerId: string) => {
    toast({
      title: "Edit Customer", 
      description: `Editing customer ${customerId}`,
    });
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter(c => c.id !== customerId));
    toast({
      title: "Customer Deleted",
      description: "Customer has been successfully deleted",
    });
  };

  const handleViewHistory = (customerId: string) => {
    toast({
      title: "Customer History",
      description: `Viewing history for customer ${customerId}`,
    });
  };

  const columns = [
    {
      key: "id" as keyof Customer,
      label: "Customer ID",
      width: "w-28"
    },
    {
      key: "name" as keyof Customer,
      label: "Name",
      width: "w-48"
    },
    {
      key: "email" as keyof Customer,
      label: "Email",
      width: "w-64"
    },
    {
      key: "phone" as keyof Customer,
      label: "Phone",
      width: "w-40"
    },
    {
      key: "totalPurchases" as keyof Customer,
      label: "Total Purchases",
      render: (total: number) => `$${total.toFixed(2)}`,
      width: "w-36"
    },
    {
      key: "lastPurchase" as keyof Customer,
      label: "Last Purchase",
      render: (date: string) => new Date(date).toLocaleDateString(),
      width: "w-32"
    },
    {
      key: "status" as keyof Customer,
      label: "Status",
      render: (status: string) => (
        <Badge className={status === "Active" ? "bg-success/10 text-success" : "bg-muted/10 text-muted-foreground"}>
          {status}
        </Badge>
      ),
      width: "w-24"
    },
    {
      key: "id" as keyof Customer,
      label: "Actions",
      render: (_: any, customer: Customer) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewHistory(customer.id)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditCustomer(customer.id)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteCustomer(customer.id)}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
      width: "w-32"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customer database and track purchase history.
        </p>
      </div>

      <DataTable
        title="Customer Database"
        data={filteredCustomers}
        columns={columns}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAdd={handleAddCustomer}
        addLabel="Add Customer"
      />
    </div>
  );
}