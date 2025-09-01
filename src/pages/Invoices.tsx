import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Download, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  items: number;
}

const mockInvoices: Invoice[] = [
  { 
    id: "INV-001", 
    customerName: "John Doe", 
    date: "2024-01-15", 
    amount: 450.00, 
    status: "Paid",
    items: 3
  },
  { 
    id: "INV-002", 
    customerName: "Sarah Wilson", 
    date: "2024-01-14", 
    amount: 189.50, 
    status: "Pending",
    items: 2
  },
  { 
    id: "INV-003", 
    customerName: "Mike Johnson", 
    date: "2024-01-10", 
    amount: 320.00, 
    status: "Overdue",
    items: 4
  },
  { 
    id: "INV-004", 
    customerName: "Emma Davis", 
    date: "2024-01-12", 
    amount: 75.25, 
    status: "Paid",
    items: 1
  },
  { 
    id: "INV-005", 
    customerName: "Robert Brown", 
    date: "2024-01-16", 
    amount: 650.00, 
    status: "Pending",
    items: 5
  },
];

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  const filteredInvoices = invoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchValue.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCreateInvoice = () => {
    toast({
      title: "Create Invoice",
      description: "Invoice creation form will be implemented soon",
    });
  };

  const handleEditInvoice = (invoiceId: string) => {
    toast({
      title: "Edit Invoice",
      description: `Editing invoice ${invoiceId}`,
    });
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter(i => i.id !== invoiceId));
    toast({
      title: "Invoice Deleted",
      description: "Invoice has been successfully deleted",
    });
  };

  const handleDownloadPDF = (invoiceId: string) => {
    toast({
      title: "Download PDF",
      description: `Downloading PDF for invoice ${invoiceId}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success/10 text-success";
      case "Pending":
        return "bg-warning/10 text-warning";
      case "Overdue":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const columns = [
    {
      key: "id" as keyof Invoice,
      label: "Invoice ID",
      width: "w-32"
    },
    {
      key: "customerName" as keyof Invoice,
      label: "Customer",
      width: "w-48"
    },
    {
      key: "date" as keyof Invoice,
      label: "Date",
      render: (date: string) => new Date(date).toLocaleDateString(),
      width: "w-32"
    },
    {
      key: "items" as keyof Invoice,
      label: "Items",
      width: "w-20"
    },
    {
      key: "amount" as keyof Invoice,
      label: "Amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
      width: "w-32"
    },
    {
      key: "status" as keyof Invoice,
      label: "Status",
      render: (status: string) => (
        <Badge className={getStatusColor(status)}>
          {status}
        </Badge>
      ),
      width: "w-28"
    },
    {
      key: "id" as keyof Invoice,
      label: "Actions",
      render: (_: any, invoice: Invoice) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDownloadPDF(invoice.id)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditInvoice(invoice.id)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteInvoice(invoice.id)}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
      width: "w-36"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">
          Create, manage, and track all your invoices in one place.
        </p>
      </div>

      <DataTable
        title="Invoice Management"
        data={filteredInvoices}
        columns={columns}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAdd={handleCreateInvoice}
        addLabel="Create Invoice"
      />
    </div>
  );
}