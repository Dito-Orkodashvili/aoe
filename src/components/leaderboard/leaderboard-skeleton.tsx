import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const LeaderboardSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow className="hover:bg-transparent border-border/50">
        <TableHead className="w-20 text-center">რენკი</TableHead>
        <TableHead>სახელი</TableHead>
        <TableHead className="text-right">რეიტინგი</TableHead>
        <TableHead className="text-right">მოგება</TableHead>
        <TableHead className="text-right">ბრძოლა</TableHead>
        <TableHead className="text-center">ქვეყანა</TableHead>
        <TableHead className="text-center">Streak</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index} className="border-border/30">
          <TableCell className="text-center">
            <Skeleton className="h-5 w-8 mx-auto" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-32" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-6 w-6 mx-auto rounded-full" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-5 w-12 ml-auto" />
          </TableCell>
          <TableCell className="text-center flex items-center justify-center">
            <Skeleton className="h-5 w-14 ml-auto" />
          </TableCell>
          <TableCell className="text-center">
            <Skeleton className="h-5 w-12 ml-auto" />
          </TableCell>
          <TableCell className="text-center">
            <Skeleton className="h-5 w-10 mx-auto" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
