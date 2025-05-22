import { usePredictionModel } from "@/api/PredictionModelApi";
import { UserDataForm } from "@/forms/UserDataForm";
import { Navigate } from "react-router-dom";

const PredictionPage = () => {
  const { predict, isLoading, result } = usePredictionModel();
  return (
    <>
      <UserDataForm predict={predict} isLoading={false} />
      {!isLoading && (
        <Navigate to={`/patient/prediction/result?value=${result}`} />
      )}
    </>
  );
};

export { PredictionPage };
