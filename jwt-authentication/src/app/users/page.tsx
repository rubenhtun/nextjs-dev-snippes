// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Users() {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean | null>(null);
//   useEffect(() => {
//     async () => {
//       try {
//         const response = await fetch("/api/private");
//         if (!response.ok) {
//           setLoading(true);
//           return;
//         }
//         const data = await response.json();
//         console.log(data);
//         if (data.message === "valid") {
//           setLoading(false);
//         }
//         setLoading(true);
//         router.push("/api/login");
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   }, []);
//   if (loading) return <p>Loading...</p>;
//   return <h1>Welcome!</h1>;
// }

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/private");
        if (!response.ok) {
          router.push("/");
          return;
        }
        const data = await response.json();

        // Check if the message is valid.
        if (data.message === "valid") {
          // User is authenticated; stop loading.
          setLoading(false);
        } else {
          // If the message isn’t valid, redirect to login.
          router.push("/");
        }
      } catch (err) {
        console.log(err);
        // On error, redirect to login.
        router.push("/");
      }
    })();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <h1>Welcome!</h1>;
}
