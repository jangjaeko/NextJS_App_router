//[...id] catch all segment => book/1/2/3 ok
// [[...id]] optional catch all segment => book ok, book/1/2/3 ok

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Book page: {id}</h1>
    </div>
  );
}
