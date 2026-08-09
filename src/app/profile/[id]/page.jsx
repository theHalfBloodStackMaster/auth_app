export default async function UserProfile(params) {
  console.log("id = ", params.id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="p-2 rounded bg-orange-400 text-black mt-6">
          {params.id}
        </span>
      </p>
    </div>
  );
}
