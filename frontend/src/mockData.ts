import type { ChatPartner } from "./api/ChatApi";
import type { Conversation, Doctor, Message } from "./types";

export const mockSideBarList: ChatPartner[] = [
  {
    _id: "conv-1",
    name: "Doc-1",
    profilePic: "https://randomuser.me/api/portraits/men/37.jpg",
    unreadMessage: 1,
  },
  {
    _id: "conv-2",
    name: "Doc-2",
    profilePic: "https://randomuser.me/api/portraits/men/35.jpg",
    unreadMessage: 2,
  },
  {
    _id: "conv-3",
    name: "Doc-3",
    profilePic: "https://randomuser.me/api/portraits/men/30.jpg",
    unreadMessage: 3,
  },
];

export const mockSideBarListPatient: ChatPartner[] = [
  {
    _id: "conv-1",
    name: "Pat-1",
    profilePic: "https://randomuser.me/api/portraits/men/20.jpg",
    unreadMessage: 1,
  },
  {
    _id: "conv-2",
    name: "Pat-2",
    profilePic: "https://randomuser.me/api/portraits/men/19.jpg",
    unreadMessage: 2,
  },
  {
    _id: "conv-3",
    name: "Pat-3",
    profilePic: "https://randomuser.me/api/portraits/men/43.jpg",
    unreadMessage: 3,
  },
];

export const mockConversations: Conversation[] = [
  {
    _id: "conv-1",
    patientId: "pat-1",
    doctorId: "doc-1",
  },
  {
    _id: "conv-2",
    patientId: "pat-1",
    doctorId: "doc-2",
  },
  {
    _id: "conv-3",
    patientId: "pat-1",
    doctorId: "doc-3",
  },
  {
    _id: "conv-4",
    patientId: "pat-2",
    doctorId: "doc-2",
  },

  {
    _id: "conv-5",
    patientId: "pat-2",
    doctorId: "doc-3",
  },
];

export const mockMessages: Message[] = [
  {
    _id: "msg-1",
    conversationId: "conv-1",
    content: "Hello Doctor, I’ve been feeling dizzy lately.",
    createdAt: new Date("2024-12-01T10:05:00Z").toISOString(),
    senderId: "pat-1",
  },
  {
    _id: "msg-2",
    conversationId: "conv-1",
    content: "Hi Aman, can you describe the symptoms a bit more?",
    createdAt: new Date("2024-12-01T10:06:30Z").toISOString(),
    senderId: "doc-1",
  },
  {
    _id: "msg-3",
    conversationId: "conv-1",
    content:
      "Yes, I feel lightheaded when I stand up and sometimes my vision gets blurry.",
    createdAt: new Date("2024-12-01T10:07:10Z").toISOString(),
    senderId: "pat-1",
  },
  {
    _id: "msg-4",
    conversationId: "conv-1",
    content:
      "Got it. Have you experienced any chest pain or shortness of breath?",
    createdAt: new Date("2024-12-01T10:08:00Z").toISOString(),
    senderId: "doc-1",
  },
  {
    _id: "msg-5",
    conversationId: "conv-1",
    content: "No, not really. Just the dizziness and sometimes fatigue.",
    createdAt: new Date("2024-12-01T10:08:45Z").toISOString(),
    senderId: "pat-1",
  },
  {
    _id: "msg-6",
    conversationId: "conv-1",
    content:
      "Thanks for the info. I suggest we do a few basic tests to rule out anemia or low blood pressure.",
    createdAt: new Date("2024-12-01T10:09:30Z").toISOString(),
    senderId: "doc-1",
  },
  {
    _id: "msg-7",
    conversationId: "conv-2",
    content: "I have a recurring skin rash, what could be the reason?",
    createdAt: new Date("2024-12-05T14:10:00Z").toISOString(),
    senderId: "pat-2",
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Aditi Sharma",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    yearsOfExperience: 8,
    expertise: "Cardiologist",
    qualification: "MBBS, MD (Cardiology)",
    location: "Delhi, India",
  },
  {
    id: "2",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/40.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  {
    id: "3",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/30.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  {
    id: "4",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/20.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  {
    id: "5",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/37.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  {
    id: "6",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/38.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  // Add more
];
