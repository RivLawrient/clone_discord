"use client";
import { useAuth } from "@/context/authContext";

export default function UserBar() {
  const { user, loading } = useAuth();
  return (
    <div className=" h-[56px] w-[362px] absolute bottom-0 left-0 bg-green-300 flex items-center justify-center">
      <div className="flex items-center justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          user?.picture && (
            <img
              src={`${user?.picture}`}
              alt="user picture"
              className="h-10 w-10 object-contain rounded-full p-2"
              style={{
                backgroundColor: `#${Math.floor(
                  Math.random() * 16777215
                ).toString(16)}`,
              }}
            />
          )
        )}
        {user?.username}
      </div>
    </div>
  );
}
