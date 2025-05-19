import { usePredictionModel } from "@/api/PredictionModelApi";
import { PredictionResult } from "@/components/PredictionResult";
import { UserDataForm } from "@/forms/UserDataForm";

const PredictionPage = () => {
  const { predict, predictionData, isPending } = usePredictionModel();
  return (
    <>
      <UserDataForm predict={predict} isLoading={isPending} />
      {predictionData && <PredictionResult predictionData={predictionData} />}
    </>
  );
};

export { PredictionPage };
