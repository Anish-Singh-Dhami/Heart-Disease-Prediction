export const Role = {
  DOCTOR: "doctor",
  PATIENT: "patient",
};

export type User = {
  id: string;
  name: string;
  email?: string;
  profilePic?: string;
  role: (typeof Role)[keyof typeof Role];
};

export type Patient = Omit<User, "role"> & {};

export type Doctor = Omit<User, "role"> & {
  yearsOfExperience: number;
  expertise: string;
  qualification: string;
  location?: string;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
};
