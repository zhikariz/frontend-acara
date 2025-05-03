import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {
  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    totalPages,
  } = props;

  const {
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,

    currentLimit,
    currentPage,
  } = useChangeUrl();

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          placeholder="Search by name"
          startContent={<CiSearch />}
          onClear={handleClearSearch}
          onChange={handleSearch}
        />
        {buttonTopContentLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
  ]);
  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2 lg:justify-between">
        <Select
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[`${currentLimit}`]}
          selectionMode="single"
          onChange={handleChangeLimit}
          startContent={<p className="text-small">Show:</p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);
  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
