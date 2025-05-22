import { type Doctor } from "@/types";
import { DoctorCard } from "./DoctorCard";
import { DoctorCardSkeleton } from "./DoctorCardSkeleton";

interface DoctorsGridProps {
  doctors?: Doctor[];
  isLoading: boolean;
}

export const DoctorsGrid: React.FC<DoctorsGridProps> = ({
  doctors,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-10">
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => (
            <DoctorCardSkeleton key={i} />
          ))
        : doctors?.map((doc) => <DoctorCard key={doc._id} doctor={doc} />)}
    </div>
  );
};
