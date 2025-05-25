import { string } from "zod";

export const Role = {
  DOCTOR: "doctor",
  PATIENT: "patient",
};

export const Gender = {
  MALE: "male",
  FEMALE: "female",
};

export type User = {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  age?: number;
  gender?: (typeof Gender)[keyof typeof Gender];
  country?: string;
  state?: string;
  role: (typeof Role)[keyof typeof Role];
};

export type Patient = {
  _id: string;
  user: User;
};

export type Doctor = {
  _id: string;
  yearOfExperience: number;
  expertise: string;
  qualification: string;
  user: User;
};

export type Conversation = {
  _id: string;
  patient: Patient | string;
  doctor: Doctor | string;
};

export type Message = {
  _id: string;
  conversation: Conversation | string;
  isSendByDoctor: boolean;
  content: string;
  createdAt: string;
};
