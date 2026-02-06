import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { reviewServices } from "@/services/review.services";

type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  studentId: string;
};



export default async function TutorReviewsPage() {
  const {data} = await reviewServices.getTutorReviews()
  console.log(data)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">My Reviews</CardTitle>
        </CardHeader>

        <CardContent>
          {data.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No reviews found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Student ID</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.data?.map((review:any) => (
                  <TableRow key={review.id}>
                    {/* ⭐ Rating */}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>

                    {/* 💬 Comment */}
                    <TableCell className="max-w-sm">
                      {review.comment ? (
                        review.comment
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No comment
                        </span>
                      )}
                    </TableCell>

                    {/* 👤 Student ID */}
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {review.studentId.slice(0, 10)}...
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
