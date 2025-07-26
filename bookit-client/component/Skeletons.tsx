import React from "react";

const BaseSkeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md w-full ${className}`} />
);

export const RoomsLoadingSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((num, i) => (
        <div
          key={i}
          className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div className="flex flex-col sm:flex-row sm:gap-4 h-full w-full">
            {/* Image */}
            <BaseSkeleton className="w-full h-50 sm:w-37 sm:h-32 mb-3 sm:mb-0" />
            <div className="sm:h-32 w-[70%] flex flex-col justify-center items-center gap-y-1">
              <BaseSkeleton className="h-8 mb-3" />
              <BaseSkeleton className="h-3 mb-3" />
              <BaseSkeleton className="h-3" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-50 h-12 mt-2 sm:ml-2 sm:mt-0">
            <BaseSkeleton className="h-full sm:mb-0 mb-2" />
          </div>
        </div>
      ))}
    </>
  );
};

export const BookingsLoadingSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((num, i) => (
        <div
          key={i}
          className="mt-4 flex flex-col mb-8 sm:flex-row justify-between items-start sm:items-center"
        >
          <div className="w-[30%] flex flex-col gap-y-1">
            <BaseSkeleton className="h-8 mb-3" />
            <BaseSkeleton className="h-3 mb-3" />
            <BaseSkeleton className="h-3" />
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
            <BaseSkeleton className="px-5 py-5   mb-2 sm:mb-0 w-full sm:w-50" />
            <BaseSkeleton className="px-5 py-5  mb-2 sm:mb-0 w-full sm:w-50" />
          </div>
        </div>
      ))}
    </>
  );
};

export const MyRoomsLoadingSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((num, i) => (
        <div
          key={i}
          className="mt-4 flex flex-col mb-8 sm:flex-row justify-between items-start sm:items-center"
        >
          <div className="w-[30%]">
            <BaseSkeleton className="h-5 mb-3" />
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
            <BaseSkeleton className="px-5 py-5   mb-2 sm:mb-0 w-full sm:w-50" />
            <BaseSkeleton className="px-5 py-5  mb-2 sm:mb-0 w-full sm:w-50" />
          </div>
        </div>
      ))}
    </>
  );
};
