export default async function ChannelNamePage({
  params,
}: {
  params: { name: string };
}) {
  const channel = await params;
  return <div>{channel.name}</div>;
}
