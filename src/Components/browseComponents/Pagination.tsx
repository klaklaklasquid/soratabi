interface PaginationProps {
  pagination: Pagination;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  pagination,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="col-span-full mb-6 flex items-center justify-center gap-2 xl:col-start-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-24 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/5"
      >
        Previous
      </button>

      <div className="flex gap-2">
        {Array.from({ length: pagination.totalPages }, (_, i) => {
          const page = i + 1;
          // Show first, last, current, and adjacent pages
          if (
            page === 1 ||
            page === pagination.totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`h-10 w-10 rounded-lg border text-sm font-medium transition-all ${
                  page === currentPage
                    ? "border-tertiary-blue bg-tertiary-blue/20 text-tertiary-blue"
                    : "border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="flex items-center text-gray-400">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagination.totalPages}
        className="w-24 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/5"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
