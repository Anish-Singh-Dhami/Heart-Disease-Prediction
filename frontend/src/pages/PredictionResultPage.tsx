import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, CalendarCheck, Apple, BookOpen } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const PredictionResultPage = () => {
  const [searchParams] = useSearchParams();
  const result = parseInt(searchParams.get("value") as string);
  const navigate = useNavigate();
  const hasDisease = result === 1;
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl rounded-2xl p-6 bg-gray-800 text-center shadow-xl border border-blue-500">
        <h2 className="text-2xl font-bold mb-4  ` text-white">
          Prediction Results
        </h2>

        <div className="bg-black rounded-full text-white text-2xl font-bold px-8 py-4 inline-block mb-4">
          {hasDisease ? "At Risk" : "No Risk"}
        </div>

        <p className="text-sm text-gray-300 mb-8">
          Based on your input data, our model predicts that you are{" "}
          {hasDisease ? "likely to have" : "not likely to have"} a heart
          condition. Please consider the following recommendations for further
          action.
        </p>

        <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="bg-gray-700 rounded-xl p-4 flex items-start gap-3">
            <Stethoscope className="w-15 h-15" />
            <span>
              <strong>Consult with a healthcare professional</strong> for a
              detailed assessment and tailored advice.
            </span>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 flex items-start gap-3">
            <Apple className="w-15 h-15" />
            <span>
              <strong>Consider lifestyle changes</strong> such as a balanced
              diet and regular exercise to improve your health.
            </span>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 flex items-start gap-3">
            <CalendarCheck className="w-15 h-15" />
            <span>
              <strong>Schedule regular check-ups</strong> to monitor your
              condition and catch any changes early.
            </span>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 flex items-start gap-3">
            <BookOpen className="w-15 h-15" />
            <span>
              <strong>Read up on your condition</strong> to better understand
              and manage it effectively.
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            variant="secondary"
            className="bg-black text-white hover:bg-gray-700 flex-1"
            onClick={() => navigate("/patient/prediction/form")}
          >
            Go Back to Medical Data Form
          </Button>

          <Button
            className="bg-black text-white hover:bg-gray-700 flex-1"
            onClick={() => navigate("/patient/search/doctors")}
          >
            Chat With Doctor
          </Button>
        </div>
      </Card>
    </div>
  );
};
