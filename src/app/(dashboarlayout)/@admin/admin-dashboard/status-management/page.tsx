
// "use client";

// import { useEffect, useState } from "react";

// type User = {
//   id: string;
//   email: string;
//   role: string;
//   status: "ACTIVE" | "BANNED";
// };

// export default function ManageUserStatus() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [actionLoading, setActionLoading] = useState(false);

//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [banDays, setBanDays] = useState<number>(7);
//   const [banReason, setBanReason] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
//         {
//           credentials: "include",
//         }
//       );

//       const data = await res.json();
//       setUsers(data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   console.log(users)


//   // Open Modal
//   const openBanModal = (user: User) => {
//     setSelectedUser(user);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedUser(null);
//     setBanReason("");
//     setBanDays(7);
//   };

//   // Ban User
//   const handleBan = async () => {
//     if (!selectedUser || !banReason.trim()) return;

//     try {
//       setActionLoading(true);

//       await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/ban/${selectedUser.id}`,
//         {
//           method: "PATCH",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             reason: banReason,
//             days: banDays,
//           }),
//         }
//       );

//       closeModal();
//       fetchUsers();
//     } catch (error) {
//       console.error("Ban failed:", error);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Unban User
//   const handleUnban = async (userId: string) => {
//     try {
//       setActionLoading(true);

//       await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/unban/${userId}`,
//         {
//           method: "PATCH",
//           credentials: "include",
//         }
//       );

//       fetchUsers();
//     } catch (error) {
//       console.error("Unban failed:", error);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
//         Manage Users
//       </h2>

//       {loading ? (
//         <p className="text-gray-600 dark:text-gray-400">Loading...</p>
//       ) : (
//         <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
//           <table className="w-full">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 <th className="p-4 text-left">Email</th>
//                 <th className="p-4 text-left">Role</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="border-t border-gray-200 dark:border-gray-800"
//                 >
//                   <td className="p-4">{user.email}</td>
//                   <td className="p-4">{user.role}</td>

//                   <td className="p-4">
//                     {user.status === "BANNED" ? (
//                       <span className="text-red-600 dark:text-red-400 font-medium">
//                         Banned
//                       </span>
//                     ) : (
//                       <span className="text-green-600 dark:text-green-400 font-medium">
//                         {user.status}
//                       </span>
//                     )}
//                   </td>

//                   <td className="p-4">
//                     {user.status === "BANNED" ? (
//                       <button
//                         onClick={() => handleUnban(user.id)}
//                         disabled={actionLoading}
//                         className="px-3 py-1 rounded-md text-sm font-medium bg-green-600  hover:bg-green-700 disabled:opacity-50"
//                       >
//                         Unban
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => openBanModal(user)}
//                         className="px-3 py-1 rounded-md text-sm font-medium bg-red-600  hover:bg-red-700"
//                       >
//                         Ban
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="w-full  max-w-md rounded-2xl shadow-xl p-6 bg-black dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
//             <h3 className="text-xl font-semibold mb-5 text-gray-400 dark:text-white">
//               Ban User
//             </h3>

//             <label className="block mb-2 text-gray-400 text-sm font-medium">
//               Ban Duration (days)
//             </label>

//             <input
//               type="number"
//               min={1}
//               value={banDays}
//               onChange={(e) => setBanDays(Number(e.target.value))}
//               className="w-full text-gray-400 rounded-md px-3 py-2 mb-4 border"
//             />

//             <label className="block text-gray-400 mb-2 text-sm font-medium">
//               Ban Reason
//             </label>

//             <textarea
//               value={banReason}
//               onChange={(e) => setBanReason(e.target.value)}
//               className="w-full  text-gray-400 rounded-md px-3 py-2 mb-6 border"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2  text-gray-400 rounded-md border"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleBan}
//                 disabled={!banReason.trim() || actionLoading}
//                 className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
//               >
//                 {actionLoading ? "Processing..." : "Confirm Ban"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BANNED";
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: User[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ManageUserStatus() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banDays, setBanDays] = useState(7);
  const [banReason, setBanReason] = useState("");
  const [showModal, setShowModal] = useState(false);

  // =====================================
  // FETCH USERS
  // =====================================

  const fetchUsers = async () => {
    if (!API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not configured.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/v1/users`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        },
      );

      const data: ApiResponse = await res.json();

      console.log("Users API:", {
        status: res.status,
        data,
      });

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to fetch users",
        );
      }

      setUsers(data.data ?? []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =====================================
  // OPEN BAN MODAL
  // =====================================

  const openBanModal = (user: User) => {
    setSelectedUser(user);
    setBanDays(7);
    setBanReason("");
    setShowModal(true);
  };

  // =====================================
  // CLOSE BAN MODAL
  // =====================================

  const closeModal = () => {
    if (actionLoading) return;

    setShowModal(false);
    setSelectedUser(null);
    setBanReason("");
    setBanDays(7);
  };

  // =====================================
  // BAN USER
  // =====================================

  const handleBan = async () => {
    if (
      !API_URL ||
      !selectedUser ||
      !banReason.trim() ||
      banDays < 1
    ) {
      return;
    }

    try {
      setActionLoading(true);

      const res = await fetch(
        `/api/v1/users/ban/${selectedUser.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: banReason.trim(),
            days: banDays,
          }),
        },
      );

      const data: ApiResponse = await res.json();

      console.log("Ban User API:", {
        status: res.status,
        data,
      });

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to ban user",
        );
      }

      closeModal();

      await fetchUsers();
    } catch (error) {
      console.error("Ban failed:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================
  // UNBAN USER
  // =====================================

  const handleUnban = async (userId: string) => {
    if (!API_URL) return;

    try {
      setActionLoading(true);

      const res = await fetch(
        `/api/v1/users/unban/${userId}`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data: ApiResponse = await res.json();

      console.log("Unban User API:", {
        status: res.status,
        data,
      });

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to unban user",
        );
      }

      await fetchUsers();
    } catch (error) {
      console.error("Unban failed:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 transition-colors dark:bg-gray-950">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Manage Users
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">
          Loading users...
        </p>
      ) : users.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">
            No users found.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-4 text-left">
                    Email
                  </th>
                  <th className="p-4 text-left">
                    Role
                  </th>
                  <th className="p-4 text-left">
                    Status
                  </th>
                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-200 dark:border-gray-800"
                  >
                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">
                      {user.role}
                    </td>

                    <td className="p-4">
                      {user.status === "BANNED" ? (
                        <span className="font-medium text-red-600 dark:text-red-400">
                          Banned
                        </span>
                      ) : (
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {user.status}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      {user.status === "BANNED" ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleUnban(user.id)
                          }
                          disabled={actionLoading}
                          className="rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          Unban
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            openBanModal(user)
                          }
                          disabled={actionLoading}
                          className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          Ban
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================
          BAN MODAL
      ===================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">
              Ban User
            </h3>

            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              Ban Duration (days)
            </label>

            <input
              type="number"
              min={1}
              value={banDays}
              onChange={(e) =>
                setBanDays(Number(e.target.value))
              }
              className="mb-4 w-full rounded-md border px-3 py-2 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />

            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              Ban Reason
            </label>

            <textarea
              value={banReason}
              onChange={(e) =>
                setBanReason(e.target.value)
              }
              placeholder="Enter ban reason..."
              rows={4}
              className="mb-6 w-full rounded-md border px-3 py-2 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={actionLoading}
                className="rounded-md border px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleBan}
                disabled={
                  !banReason.trim() ||
                  actionLoading ||
                  banDays < 1
                }
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading
                  ? "Processing..."
                  : "Confirm Ban"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


