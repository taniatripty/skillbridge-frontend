// types/tutor.ts
export type Tutor = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  hourlyRate: number;
  experience:Number;
  education: string | null;
  languages: string[];
  availability: any[];
};
