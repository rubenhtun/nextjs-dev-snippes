import { prisma } from "@/libs/prisma";
import Link from "next/link";
import { UserPlus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { deleteCandidate } from "./add-new-candidate/action";

export default async function Home() {
  const candidates = await prisma.candidates.findMany();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Candidates List</h2>
        <Link href="/add-new-candidate">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            <UserPlus size={20} />
            <span>Add Candidate</span>
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  Name
                  <ChevronUp size={16} className="text-gray-400" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.length > 0 ? (
              candidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                      {candidate.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {candidate.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <form action={deleteCandidate}>
                      <input
                        type="hidden"
                        name="candidateId"
                        value={candidate.id}
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  <p className="text-lg">No candidates found</p>
                  <p className="text-sm mt-1">
                    Add your first candidate to get started
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
