import { Favorite } from "@/model/FavoriteType";

interface FavoriteCardProps {
  favorite: Favorite;
}

export default function FavoriteCard({ favorite }: FavoriteCardProps) {
  return (
    <div className="flex justify-center items-center border rounded-xl w-[250px] h-[300px] text-gray-200 border-gray-500">
      {favorite.product.name}
    </div>
  );
}
