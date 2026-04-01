interface Props {
  title: string;
}

export default function ComingSoon({ title }: Props) {
  return (
    <div className="p-8 flex items-center justify-center h-full">
      <div className="text-center text-gray-500">
        <p className="text-4xl mb-4">🚧</p>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm">This section is under development.</p>
      </div>
    </div>
  );
}
