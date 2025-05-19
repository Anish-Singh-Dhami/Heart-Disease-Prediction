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
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "@/components/LoadingButton";

// Zod schema
const formSchema = z.object({
  age: z.coerce.number({ required_error: "Age is required." }),
  sex: z.enum(["M", "F"]),
  chestPainType: z.enum(["ATA", "NAP", "ASY"]),
  restingBP: z.coerce.number({ required_error: "Resting BP is required." }),
  cholestrol: z.coerce.number({ required_error: "Cholesterol is required." }),
  fastingBS: z.coerce.number({ required_error: "Fasting BS is required." }),
  restingECG: z.coerce.number({ required_error: "Resting ECG is required." }),
  maxHR: z.coerce.number({ required_error: "Max HR is required." }),
  exerciseAngina: z.enum(["Y", "N"]),
  oldPeak: z.coerce.number({ required_error: "Old Peak is required." }),
  stSlope: z.enum(["Flat", "Up"]),
});

type FormType = z.infer<typeof formSchema>;

type Props = {
  predict: (data: FormData) => void;
  isLoading: boolean;
};

export const UserDataForm = ({ predict, isLoading }: Props) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // sex: undefined,
      // chestPainType: "ATA",
      // exerciseAngina: "N",
      // stSlope: "Up",
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    predict(formData);
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
              ["age", "Age"],
              ["restingBP", "Resting BP"],
              ["cholestrol", "Cholesterol"],
              ["fastingBS", "Fasting BS"],
              ["restingECG", "Resting ECG"],
              ["maxHR", "Max Heart Rate"],
              ["oldPeak", "Old Peak"],
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
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-white">Sex</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-4 mt-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {["M", "F"].map((val) => (
                        <div className="flex items-center gap-2" key={val}>
                          <RadioGroupItem
                            className="data-[state=checked]:bg-white data-[state=checked]:border-gray-900"
                            id={val}
                            value={val}
                          />
                          <FormLabel htmlFor={val} className="text-white">
                            {val === "M" ? "Male" : "Female"}
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
              name="chestPainType"
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
              name="exerciseAngina"
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
              name="stSlope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-white">ST Slope</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-4 mt-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {["Up", "Flat"].map((val) => (
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
                <LoadingButton loadingText="Predicting..."/>
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
