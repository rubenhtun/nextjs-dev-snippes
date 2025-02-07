import { prisma } from "@/libs/prisma";
import Link from "next/link";

export default async function Home() {
  const candidates = await prisma.candidates.findMany(); // Ensure model name matches your schema

  return (
    <div className="p-6">
      <Link href={"/add-new-candidate"}>
        <button className="text-white bg-blue-500 px-4 py-2 rounded">
          Create
        </button>
      </Link>
      <h2 className="text-2xl font-semibold mt-4">List of Candidates</h2>
      <div className="mt-4 space-y-2">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div key={candidate.id} className="p-4 border rounded shadow-md">
              <p>
                <strong>Name:</strong> {candidate.name}
              </p>
              <p>
                <strong>Gender:</strong> {candidate.gender}
              </p>
              <p>
                <strong>Email:</strong> {candidate.email}
              </p>
              <button
                type="submit"
                className="text-white px-3 py-1 bg-red-500 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No candidates found.</p>
        )}
      </div>
    </div>
  );
}
