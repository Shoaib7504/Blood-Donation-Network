import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import LoadingSpiner from "../../Components/LoadingSpiner";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const VolunteerRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: managedUsers = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["volunteer-request", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/volunteer-request` );
      return result.data;
    }
  });

  if (isLoading) return <LoadingSpiner />;
  if (isError) console.log(isError);

  const handleUpdate = async (email) => {
    try {
      await axiosSecure.patch("/update-role", {
        email,
        role: "volunteer"
      });

      toast.success("Role updated successfully");
      refetch(); // refresh table after update
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="px-10">

      {/* Header */}
      <section className="bg-hero-medical border-b mx-auto rounded-xl mb-5 mt-5 border-border">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">
            Volunteer Request
          </h1>
          <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">
            A donor is requesting permission to transition into a volunteer role.
          </p>
        </div>
      </section>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">

          <table className="w-full min-w-180 text-left text-sm">

            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="px-5 py-4">User Email</th>
                <th className="px-5 py-4">Request</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {managedUsers.map((u) => (
                <tr key={u.email} className="border-t border-border">

                  {/* Email */}
                  <td className="px-5 py-4 font-medium text-gray-700">
                    {u.email}
                  </td>

                  {/* Request */}
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-xs font-bold">
                      Donor → Volunteer Request
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleUpdate(u.email)}
                        className="rounded-lg bg-green-100 px-4 py-1 text-sm text-green-600 hover:bg-green-200"
                      >
                        Approve
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default VolunteerRequest;