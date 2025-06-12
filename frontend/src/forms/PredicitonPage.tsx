import { usePredictionModel } from "@/api/PredictionModelApi";
import { UserDataForm } from "@/forms/UserDataForm";
import { Navigate } from "react-router-dom";

const PredictionPage = () => {
  const { predict, isPending, predictionData } = usePredictionModel();
  console.log("Prediction Data: ", predictionData);
  return (
    <>
      <UserDataForm predict={predict} isLoading={isPending} />
      {predictionData && (
        <Navigate
          to={`/patient/prediction/result?value=${predictionData.prediction}`}
        />
      )}
    </>
  );
};

export { PredictionPage };
