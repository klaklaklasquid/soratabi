import { ErrorMessage as FormikErrorMessage } from "formik";

interface CoverImageUploadProps {
  imagePreview: string;
  setFieldValue: (field: string, value: File) => void;
  setImagePreview: (preview: string) => void;
  tags: TagsData[];
  selectedTagIds: number[];
}

function CoverImageUpload({
  imagePreview,
  setFieldValue,
  setImagePreview,
  tags,
  selectedTagIds,
}: CoverImageUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("coverImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative flex min-h-[220px] w-full items-end justify-end md:min-h-8 md:w-1/2"
      style={{
        backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
        backgroundColor: imagePreview ? "transparent" : "#ffffff20",
        backgroundSize: "cover",
        backgroundPosition: "center 15%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!imagePreview && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400">Upload Cover Image</span>
        </div>
      )}
      <input
        name="coverImage"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <FormikErrorMessage
        name="coverImage"
        component="div"
        className="absolute top-2 left-2 text-sm text-red-400"
      />

      {/* Tags Display */}
      <div className="absolute right-4 bottom-4 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
        {selectedTagIds.length > 0
          ? selectedTagIds
              .map((id) => tags.find((t) => t.id === id)?.tag)
              .join(", ")
          : "No tags selected"}
      </div>
    </div>
  );
}

export default CoverImageUpload;
