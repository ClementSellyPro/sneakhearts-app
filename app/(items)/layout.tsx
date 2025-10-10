import HeaderItemsPage from "./_components/HeaderItemsPage";

export default function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-12 py-4">
      <HeaderItemsPage />
      {children}
    </div>
  );
}
