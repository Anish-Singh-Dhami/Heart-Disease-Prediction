import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type LoadingButtonProp = {
  loadingText: string;
};
const LoadingButton: React.FC<LoadingButtonProp> = ({ loadingText }) => {
  return (
    <Button disabled>
      <Loader2 className="mr-2 animate-spin" />
      {loadingText}
    </Button>
  );
};

export { LoadingButton };
