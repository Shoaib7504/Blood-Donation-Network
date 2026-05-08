import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../Components/LoadingSpiner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  // get users
  const {
    data: managedUsers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  // update role
  const handleRoleChange = async (email, newRole) => {
    try {
      await axiosSecure.patch("/update-role", {
        email,
        role: newRole,
      });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingSpiner />;

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error loading users...
      </p>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <section className="bg-hero-medical border-b mx-auto rounded-xl mb-5 mt-5 border-border">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">
            Manage Users
          </h1>

          <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">
            View all registered users and manage their roles.
          </p>
        </div>
      </section>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {managedUsers.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-border"
                >
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-blush font-bold text-primary">
                        {u?.name
                          ?.split(" ")
                          ?.map((n) => n[0])
                          ?.join("")}
                      </span>

                      <div>
                        <div className="font-semibold">
                          {u.name}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-foreground capitalize">
                      {u.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          handleRoleChange(
                            u.email,
                            "admin"
                          )
                        }
                        className="rounded-xl bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                      >
                        Admin
                      </button>

                      <button
                        onClick={() =>
                          handleRoleChange(
                            u.email,
                            "volunteer"
                          )
                        }
                        className="rounded-xl bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                      >
                        Volunteer
                      </button>

                      <button
                        onClick={() =>
                          handleRoleChange(
                            u.email,
                            "donor"
                          )
                        }
                        className="rounded-xl bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                      >
                        Donor
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {managedUsers.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;