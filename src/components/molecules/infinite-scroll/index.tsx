import React, { ReactNode } from "react";
import ReactInfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollProps {
  children: ReactNode;
  fetchMoreData: () => void;
  hasMore: boolean;
  loader?: ReactNode;
  endMessage?: ReactNode;
  className?: string;
  skeleton?: React.ComponentType;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  fetchMoreData,
  hasMore,
  loader,
  endMessage,
  className,
  skeleton: SkeletonComponent,
}) => {
  return (
    <ReactInfiniteScroll
      dataLength={React.Children.count(children)}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        loader || (SkeletonComponent ? <SkeletonComponent /> : "Loading...")
      }
      className={className}
    >
      {children}
      {!hasMore &&
        (endMessage || (
          <p className="text-center mt-4">Semua data telah ditampilkan</p>
        ))}
    </ReactInfiniteScroll>
  );
};
