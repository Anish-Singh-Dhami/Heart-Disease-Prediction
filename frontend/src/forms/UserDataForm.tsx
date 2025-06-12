import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "@/components/LoadingButton";

// Zod schema
const formSchema = z.object({
  Age: z.coerce.number({ required_error: "Age is required." }),
  Sex: z.enum(["Male", "Female"]),
  ChestPainType: z.enum(["ATA", "NAP", "ASY"]),
  RestingBP: z.coerce.number({ required_error: "Resting BP is required." }),
  Cholestrol: z.coerce.number({ required_error: "Cholesterol is required." }),
  FastingBS: z.coerce.number({ required_error: "Fasting BS is required." }),
  MaxHR: z.coerce.number({ required_error: "Max HR is required." }),
  ExerciseAngina: z.enum(["Y", "N"]),
  OldPeak: z.coerce.number({ required_error: "Old Peak is required." }),
  RestingECG: z.enum(["Normal", "ST", "LVH"]),
  ST_Slope: z.enum(["Flat", "Up", "Down"]),
});

type FormType = z.infer<typeof formSchema>;

type Props = {
  predict: (data: FormType) => void;
  isLoading: boolean;
};

export const UserDataForm = ({ predict, isLoading }: Props) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormType) => {
    predict(data);
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex flex-col justify-center items-center bg-gray-900 w-3xl  rounded-2xl py-5 ">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Enter your details:
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 md:w-sm"
          >
            {/* Input fields */}
            {[
              ["Age", "Age"],
              ["RestingBP", "Resting BP"],
              ["Cholestrol", "Cholesterol"],
              ["FastingBS", "Fasting BS"],
              ["MaxHR", "Max Heart Rate"],
              ["OldPeak", "Old Peak"],
            ].map(([name, label]) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof FormType}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-white">
                      {label}
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="text-white " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Enum fields */}
            <FormField
              control={form.control}
              name="Sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-white">Sex</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-4 mt-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {["Male", "Female"].map((val) => (
                        <div className="flex items-center gap-2" key={val}>
                          <RadioGroupItem
                            className="data-[state=checked]:bg-white data-[state=checked]:border-gray-900"
                            id={val}
                            value={val}
                          />
                          <FormLabel htmlFor={val} className="text-white">
                            {val}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ChestPainType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-white">
                    Chest Pain Type
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-4 mt-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {["ATA", "NAP", "ASY"].map((val) => (
                        <div className="flex items-center gap-2" key={val}>
                          <RadioGroupItem
                            className="data-[state=checked]:bg-white data-[state=checked]:border-gray-900"
                            id={val}
                            value={val}
                          />
                          <FormLabel htmlFor={val} className="text-white">
                            {val}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="RestingECG"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-white">
                    Resting ECG
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-4 mt-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {["Normal", "ST", "LVH"].map((val) => (
                        <div className="flex items-center gap-2" key={val}>
                          <RadioGroupItem
                            className="data-[state=checked]:bg-white data-[state=checked]:border-gray-900"
                            id={val}
                            value={val}
                          />
                          <FormLabel htmlFor={val} className="text-white">
                            {val}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ExerciseAngina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-white">
                    Exercise Angina
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-4 mt-2 text-white "
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {["Y", "N"].map((val) => (
                        <div className="flex items-center gap-2" key={val}>
                          <RadioGroupItem
                            className="data-[state=checked]:bg-white data-[state=checked]:border-gray-900"
                            id={val}
                            value={val}
                          />
                          <FormLabel htmlFor={val} className="text-white">
                            {val === "Y" ? "Yes" : "No"}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ST_Slope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-white">ST Slope</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-4 mt-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {["Up", "Down", "Flat"].map((val) => (
                        <div className="flex items-center gap-2" key={val}>
                          <RadioGroupItem
                            className="data-[state=checked]:bg-white data-[state=checked]:border-gray-900"
                            id={val}
                            value={val}
                          />
                          <FormLabel htmlFor={val} className="text-white">
                            {val}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              {isLoading ? (
                <LoadingButton loadingText="Predicting..." />
              ) : (
                <Button
                  type="submit"
                  className="bg-gray-700 rounded-xl text-lg hover:bg-gray-900 focus:outline-white"
                >
                  Predict
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
