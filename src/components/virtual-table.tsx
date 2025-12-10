"use client";

import { ReactNode, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Swords } from "lucide-react";

interface VirtualTableProps<T> {
  data: T[];
  rowHeight?: number;
  header: ReactNode;
  renderRow: (item: T, index: number) => ReactNode;
  height?: number;
  noDataComponent?: ReactNode;
}

export function VirtualTable<T>({
  data,
  rowHeight = 48,
  header,
  renderRow,
  height = 600,
  noDataComponent,
}: VirtualTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const HEADER_HEIGHT = 48;

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 8,
  });

  return (
    <div
      ref={parentRef}
      className="rounded-lg border bg-card overflow-auto w-full overflow-x-auto"
      style={{ height }}
    >
      <div
        className="min-w-[44rem]"
        style={{
          height: rowVirtualizer.getTotalSize() + HEADER_HEIGHT,
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
          className="bg-muted/50 border-b"
        >
          {header}
        </div>

        <div style={{ height: HEADER_HEIGHT }} />

        {data.length === 0 && noDataComponent && noDataComponent}

        {rowVirtualizer.getVirtualItems().map((v) => {
          const item = data[v.index];

          return (
            <div
              key={v.key}
              style={{
                position: "absolute",
                top: HEADER_HEIGHT,
                left: 0,
                width: "100%",
                height: v.size,
                transform: `translateY(${v.start}px)`,
                willChange: "transform",
              }}
            >
              {renderRow(item, v.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
