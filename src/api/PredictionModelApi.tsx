import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const usePredictionModel = () => {
  const modelApiEndpoint = import.meta.env.MODLE_API_END_POINT;
  const modelApiRequest = async (userFormData: FormData): Promise<boolean> => {
    const response = await fetch(modelApiEndpoint, {
      method: "POST",
      body: userFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Prediction result!!");
    }

    return response.json();
  };

  const {
    data: predictionData,
    mutateAsync: predict,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: modelApiRequest });

  if (isError) {
    toast.error("Error while Prediction, please retry again...");
  }

  if (isSuccess) {
    toast.success("Prediction Completed!");
  }

  return { predict, predictionData, isPending };
};

export { usePredictionModel };