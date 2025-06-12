import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const modelApiEndpoint = import.meta.env.VITE_MODLE_API_END_POINT;
const usePredictionModel = () => {
  const modelApiRequest = async (userFormData: any): Promise<{prediction: boolean}> => {
    const response = await fetch(`${modelApiEndpoint}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
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
