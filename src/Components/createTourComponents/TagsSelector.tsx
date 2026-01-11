import { ErrorMessage } from "formik";

interface TagsSelectorProps {
  values: ToursRequestData;
  tags: TagsData[];
  tagSearch: string;
  setTagSearch: (value: string) => void;
  setFieldValue: (field: string, value: number[]) => void;
  onCreateNew: () => void;
}

function TagsSelector({
  values,
  tags,
  tagSearch,
  setTagSearch,
  setFieldValue,
  onCreateNew,
}: TagsSelectorProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-xl backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-lg font-semibold text-white">Tags</label>
        <button
          type="button"
          onClick={onCreateNew}
          className="rounded-lg bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30"
        >
          + Create New
        </button>
      </div>
      <input
        type="text"
        value={tagSearch}
        onChange={(e) => setTagSearch(e.target.value)}
        placeholder="Search tags..."
        className="mb-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
      />
      {tagSearch && (
        <div className="mb-3 max-h-40 overflow-y-auto rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
          {tags
            .filter((tag) =>
              tag.tag.toLowerCase().includes(tagSearch.toLowerCase()),
            )
            .map((tag) => (
              <div
                key={tag.id}
                onClick={() => {
                  if (!values.tagIds.includes(tag.id)) {
                    setFieldValue("tagIds", [...values.tagIds, tag.id]);
                  }
                  setTagSearch("");
                }}
                className="cursor-pointer px-4 py-2 text-white hover:bg-white/10"
              >
                {tag.tag}
              </div>
            ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {values.tagIds.map((id) => {
          const tag = tags.find((t) => t.id === id);
          return (
            <span
              key={id}
              className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white backdrop-blur-sm"
            >
              {tag?.tag}
              <button
                type="button"
                onClick={() =>
                  setFieldValue(
                    "tagIds",
                    values.tagIds.filter((tid) => tid !== id),
                  )
                }
                className="text-lg text-white hover:text-red-300"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
      <ErrorMessage
        name="tagIds"
        component="div"
        className="mt-2 text-sm text-red-400"
      />
    </div>
  );
}

export default TagsSelector;
