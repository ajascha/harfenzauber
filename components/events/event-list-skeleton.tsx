import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className="relative w-full md:w-64 h-48 flex-shrink-0 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-9 w-32" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

