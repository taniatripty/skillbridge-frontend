// // types/tutor.ts
// export type Tutor = {
//   id: string;
//   name: string | null;
//   email: string | null;
//   image: string | null;
//   hourlyRate: number;
//   experience:Number;
//   education: string | null;
//   languages: string[];
//   availability: any[];
// };

// types/tutor.ts

export type Tutor = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;

  hourlyRate: number;
  experience: number;
  education: string | null;

  languages: string[];

  availability: {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }[];

  //  Rating related (from API)
  averageRating: number;
  reviews: {
    rating: number;
  }[];

};
