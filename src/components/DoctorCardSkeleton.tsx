import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const DoctorCardSkeleton: React.FC = () => {
  return (
    <Card className="bg-gray-800 text-white shadow-md rounded-2xl">
      <CardHeader className="flex items-center justify-center pt-4">
        <Skeleton className="w-24 h-24 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-3 text-center">
        <Skeleton className="h-6 w-32 mx-auto rounded-md" />
        <Skeleton className="h-4 w-40 mx-auto rounded-md" />
        <Skeleton className="h-4 w-36 mx-auto rounded-md" />
        <Skeleton className="h-4 w-28 mx-auto rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
};
