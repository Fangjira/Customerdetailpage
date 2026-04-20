import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

export interface JobCard {
  id: string;
  assignedSales: string;
  status: "pending" | "in-progress" | "won" | "lost";
  dealValue: number;
}

interface JobCardTableProps {
  jobCards: JobCard[];
  onJobCardClick?: (jobCardId: string) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  "in-progress": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  won: "bg-green-100 text-green-800 hover:bg-green-100",
  lost: "bg-red-100 text-red-800 hover:bg-red-100",
};

const statusLabels = {
  pending: "Pending",
  "in-progress": "In Progress",
  won: "Won",
  lost: "Lost",
};

export function JobCardTable({ jobCards, onJobCardClick }: JobCardTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Card ID</TableHead>
            <TableHead>Assigned Sales</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Deal Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobCards.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No job cards found
              </TableCell>
            </TableRow>
          ) : (
            jobCards.map((jobCard) => (
              <TableRow key={jobCard.id}>
                <TableCell>
                  <button
                    onClick={() => onJobCardClick?.(jobCard.id)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {jobCard.id}
                  </button>
                </TableCell>
                <TableCell>{jobCard.assignedSales}</TableCell>
                <TableCell>
                  <Badge className={statusColors[jobCard.status]}>
                    {statusLabels[jobCard.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(jobCard.dealValue)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
