import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const usePredictionModel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState("");
  const predict = () => {
    setTimeout(() => {
      setIsLoading(false);
      setResult("0");
    }, 2000);
  };
  // const modelApiEndpoint = import.meta.env.MODLE_API_END_POINT;
  // const modelApiRequest = async (userFormData: FormData): Promise<boolean> => {
  //   const response = await fetch(modelApiEndpoint, {
  //     method: "POST",
  //     body: userFormData,
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to fetch Prediction result!!");
  //   }

  //   return response.json();
  // };

  // const {
  //   data: predictionData,
  //   mutateAsync: predict,
  //   isPending,
  //   isError,
  //   isSuccess,
  // } = useMutation({ mutationFn: modelApiRequest });

  // if (isError) {
  //   toast.error("Error while Prediction, please retry again...");
  // }

  // if (isSuccess) {
  //   toast.success("Prediction Completed!");
  // }

  // return { predict, predictionData, isPending };
  return { predict, isLoading, result };
};

export { usePredictionModel };
