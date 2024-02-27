export async function GET() {
  const res = await fetch(`${process.env.API_URL}/pets`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
