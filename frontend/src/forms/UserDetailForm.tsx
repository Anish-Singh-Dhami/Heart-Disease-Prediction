import { LoadingButton } from "@/components/LoadingButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Role, type Doctor, type Patient } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, type UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UserDetailFormProps = {
  role: string;
  updateUser: UseMutateFunction<Patient | Doctor, Error, FormData, unknown>;
  isUpdateLoading: boolean;
  userDetail: Patient | Doctor;
};

const userProfileFormSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),
    age: z.coerce.number().nonnegative().optional(),
    gender: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    yearOfExperience: z.coerce.number().nonnegative().optional(),
    expertise: z.string().optional(),
    qualification: z.string().optional(),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required." }).optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "confirm password doesn't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided.",
    path: ["imageFile"],
  });

type FormType = z.infer<typeof userProfileFormSchema>;

const UserDetailForm = ({
  role,
  updateUser,
  isUpdateLoading,
  userDetail,
}: UserDetailFormProps) => {
  const form = useForm<FormType>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      username: userDetail.user.name,
      age: userDetail.user.age,
      gender: userDetail.user.gender,
      email: userDetail.user.email,
      country: userDetail.user.country,
      state: userDetail.user.state,
      yearOfExperience: (userDetail as Doctor).yearOfExperience,
      qualification: (userDetail as Doctor).qualification,
      expertise: (userDetail as Doctor).expertise,
      imageUrl: userDetail.user.profilePic,
    },
  });
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false);

  const handleEditMode = () => {
    setIsModeEdit((prev) => !prev);
  };

  const queryClient = useQueryClient();
  const handleSubmit = (data: FormType) => {
    console.log("Data : ", data);
    const formData = new FormData();
    formData.append("name", data.username);
    formData.append("email", data.email);
    if (data.age) formData.append("age", data.age.toString());
    if (data.gender) formData.append("gender", data.gender);
    if (data.country) formData.append("country", data.country);
    if (data.state) formData.append("state", data.state);
    if (data.newPassword) formData.append("password", data.newPassword);
    if (data.expertise) formData.append("expertise", data.expertise);
    if (data.yearOfExperience) {
      formData.append("yearOfExperience", data.yearOfExperience.toString());
    }
    if (data.qualification) {
      formData.append("qualification", data.qualification);
    }
    if (data.imageFile) {
      formData.append("profilePic", data.imageFile);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    updateUser(formData, {
      onSuccess: () => {
        console.log("Reset the form!");
        queryClient.invalidateQueries({
          queryKey: ["getDoctorApi"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getPatientApi"],
        });
      },
    });
  };
  return isModeEdit ? (
    <div className="flex flex-col lg:w-5xl w-xl bg-gray-900 text-white items-center rounded-3xl p-5 shadow-2xl mt-10 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            {form.getValues("imageUrl") && (
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage
                  src={userDetail.user.profilePic}
                  alt={userDetail.user.name}
                />
                <AvatarFallback className="bg-blue-600 text-white text-4xl font-semibold">
                  {userDetail.user.name[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <FormField
              name="imageFile"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input
                      type="file"
                      className="hover:cursor-pointer file:bg-white file:rounded-sm file:border-2 file:px-2 hover:file:bg-gray-900 hover:file:text-white"
                      accept=".jpg, .jpeg, .png"
                      onChange={(event) => {
                        field.onChange(
                          event.target.files ? event.target.files[0] : null
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="User-Name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {role === Role.DOCTOR && (
              <>
                <FormField
                  control={form.control}
                  name="yearOfExperience"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Year Of Experience</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expertise"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Expertise</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Qualification</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <Button
              onClick={handleEditMode}
              className="hover:cursor-pointer bg-transparent border-2 border-white text-lg hover:bg-gray-600 hover:text-gray-950 hover:border-gray-900"
            >
              Go Back
            </Button>
            {isUpdateLoading ? (
              <LoadingButton loadingText="Updating User..." />
            ) : (
              <Button
                type="submit"
                className="hover:cursor-pointer bg-transparent border-2 border-white text-lg hover:bg-gray-600 hover:text-gray-950 hover:border-gray-900"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  ) : (
    <div className="flex flex-col lg:w-5xl w-xl bg-gray-900 text-white items-center rounded-3xl p-5 shadow-2xl">
      <Avatar className="w-32 h-32 mb-4">
        <AvatarImage
          src={userDetail.user.profilePic}
          alt={userDetail.user.name}
        />
        <AvatarFallback className="bg-blue-600 text-white text-4xl font-semibold">
          {userDetail.user.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="grid grid-cols-2 min-w-lg gap-4 mb-5">
        <div className="bg-gray-800 border-none shadow-2xl text-white col-span-2 rounded-2xl p-3 grid grid-cols-3">
          <p className="col-span-1">Name</p>
          {userDetail.user.name}
        </div>
        <div className="bg-gray-800 border-none shadow-2xl text-white col-span-2 rounded-2xl p-3 grid grid-cols-3">
          <p className="col-span-1">Email</p>
          {userDetail.user.email}
        </div>
        <div className="bg-gray-800 border-none shadow-2xl text-white rounded-2xl p-3 flex flex-row justify-between">
          <p>Age</p>
          {userDetail.user.age}
        </div>
        <div className="bg-gray-800 border-none shadow-2xl text-white rounded-2xl p-3 flex flex-row justify-between">
          <p>Gender</p>
          {userDetail.user.gender}
        </div>
        <div className="bg-gray-800 border-none shadow-2xl text-white rounded-2xl p-3 flex flex-row justify-between">
          <p>Country</p>
          {userDetail.user.country}
        </div>
        <div className="bg-gray-800 border-none shadow-2xl text-white rounded-2xl p-3 flex flex-row justify-between">
          <p>State</p>
          {userDetail.user.state}
        </div>
        {role === Role.DOCTOR && (
          <>
            <div className="bg-gray-800 border-none shadow-2xl text-white rounded-2xl p-3 flex flex-row justify-between items-center">
              <p>Year Of Experience</p>
              {(userDetail as Doctor).yearOfExperience}
            </div>

            <div className="gap-2 items-center bg-gray-800 border-none shadow-2xl text-white rounded-2xl p-3 flex flex-row justify-between">
              <p>Expertise </p>
              <div>{(userDetail as Doctor).expertise}</div>
            </div>
            <div className="bg-gray-800 border-none shadow-2xl text-white rounded-2xl p-3 col-span-2 grid grid-cols-3 items-center">
              <p>Qualification</p>
              <div className="col-span-2 w-sm">
                {(userDetail as Doctor).qualification}{" "}
              </div>
            </div>
          </>
        )}
      </div>
      <Button
        onClick={handleEditMode}
        className="hover:cursor-pointer bg-transparent border-2 border-white text-lg hover:bg-gray-600 hover:text-gray-950 hover:border-gray-900"
      >
        Edit
      </Button>
    </div>
  );
};
export { UserDetailForm };
