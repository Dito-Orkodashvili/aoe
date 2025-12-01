import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DollarSign, Heart } from "lucide-react";

interface Donation {
  id: string;
  name: string;
  amount: number;
  date: string;
}

const Donations = () => {
  const donations: Donation[] = [];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Support Tournament Prize Pools</h1>
          <p className="text-muted-foreground text-lg">
            Your donations help make our tournaments more exciting with bigger
            prize pools
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Make a Donation
              </CardTitle>
              <CardDescription>
                Enter your details and proceed to payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  // value={donorName}
                  // onChange={(e) => setDonorName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  // value={amount}
                  // onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Button
                //onClick={handleDonate}
                className="w-full"
                size="lg"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Donate Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Raised</CardTitle>
              <CardDescription>
                Contributions from our amazing community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary">550$</div>
              <p className="text-sm text-muted-foreground mt-2">
                from 10 donations
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Donors</CardTitle>
            <CardDescription>
              Thank you to all our generous supporters
            </CardDescription>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No donations yet. Be the first to contribute!
              </p>
            ) : (
              <div className="space-y-3">
                {donations.slice(0, 10).map((donation) => (
                  <div
                    key={donation.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                  >
                    <span className="font-medium">{donation.name}</span>
                    <span className="text-lg font-bold text-primary">
                      ${donation.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Donations;
