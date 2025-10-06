import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>Account created successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              We&apos;ve sent you a confirmation email. Please check your inbox
              and click the link to verify your account.
            </p>
            <Link
              href="/auth/login"
              className="text-sm underline underline-offset-4"
            >
              Back to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
