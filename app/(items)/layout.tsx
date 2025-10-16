import HeaderItemsPage from "./_components/HeaderItemsPage";

export default function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-6 md:px-12 py-2 md:py-4">
      <HeaderItemsPage />
      {children}
    </div>
  );
}
