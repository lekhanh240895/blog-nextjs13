import Avatar from "@/app/components/Avatar";
import EditProfileButton from "@/app/components/EditProfileButton";
import { getUsers } from "@/app/lib/api";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

async function Account({ params }: Props) {
  const { username } = params;

  const user: User = await getUsers({ username });

  if (!user) return notFound();

  return (
    <div>
      <div className=" pb-3 mb-5 border-b flex flex-col md:flex-row justify-between gap-3">
        <h1 className="text-2xl">Thông tin tài khoản</h1>

        <EditProfileButton />
      </div>

      <div className="p-6 divide-y divide-gray-200">
        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32">Ảnh hồ sơ</h2>

          <div className="flex-1 flex justify-center">
            <Avatar src={user.image} />
          </div>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32">Username</h2>
          <p>{user.username}</p>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32">Name</h2>
          <p>{user.name}</p>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32">Mô tả bản thân</h2>
          <p>{user.description}</p>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32">Ngày tham gia</h2>
          {user.createdAt && (
            <p>{format(new Date(user.createdAt), "dd/mm/yyyy")} </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
