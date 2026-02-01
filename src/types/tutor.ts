// types/tutor.ts
export type Tutor = {
  id: string;
  name: string | null;
  image: string | null;
  hourlyRate: number;
  languages: string[];
  availability: any[];
};
