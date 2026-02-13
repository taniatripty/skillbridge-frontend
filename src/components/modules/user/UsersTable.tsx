"use client";

import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  image?: string | null;
  createdAt: string;
}

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-3 flex items-center gap-3">
                <Image
                  src={user.image || "/avatar.png"}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="font-medium">{user.name}</span>
              </td>

              <td className="px-4 py-3">{user.email}</td>

              <td className="px-4 py-3">
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold
                    ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-600"
                        : user.role === "TUTOR"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                    }
                  `}
                >
                  {user.role}
                </span>
              </td>

              <td className="px-4 py-3">{user.phone || "—"}</td>
             
              {/* <td className="px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString()|| ''}
              </td>  */}

              <td className="px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }) || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
