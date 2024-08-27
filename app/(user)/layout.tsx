export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      {children}
    </div>
  );
}
