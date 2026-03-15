import React from 'react';

function SkeletonRecipeCard() {
  return (
    <div className="card overflow-hidden text-left bg-white border border-slate-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-4/3 w-full bg-slate-200">
        <div className="absolute right-3 top-3 h-8 w-24 rounded-full bg-slate-300"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title */}
        <div className="mb-3 h-6 w-3/4 rounded-md bg-slate-200"></div>
        
        {/* Ingredients lines */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-slate-100"></div>
          <div className="h-4 w-5/6 rounded-md bg-slate-100"></div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SkeletonRecipeCard);
