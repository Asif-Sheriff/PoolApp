"use client"
// a data table of available tables.

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/app/_components/dataTable';

import { useEffect, useState } from 'react';
import { TableType } from '~/types/myTypes';
// import { deleteTable, getTables } from '~/utils/tauriFiles';
import Link from 'next/link';

export default function TablePage() {
  const [data, setData] = useState<TableType[]>([]);

  useEffect(() => {
    getTables().then((tables) => {
      setData(tables);
    });
  }, []);

  const columns: ColumnDef<TableType>[] = [
    {
      header: '#',
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      // accessorKey: "name",
      header: 'Table',
      cell: ({ row }) => {
        const table = row.original;
        return (
          <div>
            <div className="text-lg font-semibold">{table.name}</div>
            <div className="text-sm text-gray-500">{table.theme}</div>
          </div>
        );
      },
    },
    {
      // accessorKey: "rate",
      header: `Rate (₹)`,
      cell: ({ row }) => {
        const table = row.original;
        return (
          <div>
            <div className="text-md font-semibold">
              &#8377;{table.rate * 60}/hour
            </div>
            <div className="text-sm text-gray-500">
              &#8377;{table.rate}/min
            </div>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const table = row.original;

        return (
          <div>
            <Link
              href={`/admin/tables/${table.id}/edit`}
              className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:focus:ring-yellow-900">
              Edit
            </Link>
            <button
              type="button"
              onClick={async () => {
                if (
                  await confirm('Are you sure you want to delete?')
                ) {
                  deleteTable(table.id).then(() => {
                    getTables().then((tables) => {
                      setData(tables);
                    });
                  });
                }
              }}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="bg-slate-100 rounded-md">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
