import HeaderItemsPage from "@/components/items-page/HeaderItemsPage";

export default function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-12 py-4 bg-[#f7f7f7]">
      <HeaderItemsPage />
      {children}
    </div>
  );
}
