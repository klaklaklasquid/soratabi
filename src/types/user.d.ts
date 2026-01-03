interface UserInterface {
  id: number;
  role: "admin" | "user";
  firstname: string;
  lastname: string;
  userPhoto: string;
}

interface UserPatchRequest {
  image: File;
}
