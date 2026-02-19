import { reviewServices } from "@/services/review.services";
import TestimonialSlider from "./TestimonialSlider";


export default async function TestimonialSection() {
  const {data} = await reviewServices.getAllReviews();

  const reviews = data?.data || [];
  console.log(data)

  return (
    <main>
      {/* other sections */}

      <TestimonialSlider reviews={reviews} />

      {/* other sections */}
    </main>
  );
}
