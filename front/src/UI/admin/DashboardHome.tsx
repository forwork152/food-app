// Mock user data - replace with actual authentication
const mockUser = {
  firstName: "John",
  role: "admin",
};

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">
          Welcome back, {mockUser.firstName}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's your FoodPanda dashboard overview.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-semibold text-lg">Total Orders</h3>
          <p className="text-3xl font-bold text-foodpanda-pink mt-2">1,234</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-semibold text-lg">Active Restaurants</h3>
          <p className="text-3xl font-bold text-foodpanda-pink mt-2">56</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-semibold text-lg">Revenue</h3>
          <p className="text-3xl font-bold text-foodpanda-pink mt-2">$12,345</p>
        </div>
      </div>
    </div>
  );
}
