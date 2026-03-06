import { requireUser } from "../actions/require-student";

export default async function BookingPage() {
    const session = await requireUser();

  
  return (
    <div>
      <h1>Booking Page</h1>
      <p>Welcome to the booking page. Here you can make your reservations.</p>
    </div>
  );
}