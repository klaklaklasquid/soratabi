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

interface UserCreateRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  photo: File;
}
