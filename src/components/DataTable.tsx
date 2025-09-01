import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAdd?: () => void;
  addLabel?: string;
}

export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  searchValue,
  onSearchChange,
  onAdd,
  addLabel = "Add New"
}: DataTableProps<T>) {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          {onAdd && (
            <Button onClick={onAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              {addLabel}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`text-left py-3 px-4 font-medium text-muted-foreground ${column.width || ""}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="py-3 px-4">
                      {column.render 
                        ? column.render(item[column.key], item)
                        : item[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No data found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}