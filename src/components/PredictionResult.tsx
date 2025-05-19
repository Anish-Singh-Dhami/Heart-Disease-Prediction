type Prop = {
  predictionData: boolean;
};

const PredictionResult = ({ predictionData }: Prop) => {
  return (
    <div className="bg-cyan-50 p-3 rounded-2xl m-4">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-blue-500">
          Result:
        </h1>
        <p className=" text-blue-500">
          Our Model predicts you {!predictionData && "don't"} have a heart
          disease;
        </p>
      </div>
    </div>
  );
};

export { PredictionResult };
