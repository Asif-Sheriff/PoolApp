"use client"

// tables, checkedIn,
// table name, rate, checkedIn time, live time, live revenue, checkout button, pause play.

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkOutTable, getTables, patchBill } from '~/utils/fetches';
import type { BillType, TableType } from '../types/myTypes';
import NavBar from './_components/navbar';
import { TableSkeleton } from './_components/skeletons';
import Table from './table';
import useSWR from 'swr';


export default function Pos() {

  const {data, error, isLoading, mutate} = useSWR<{tables: TableType[]}>('/api/tables', getTables)
  console.log('data', data, isLoading);

  const numTables = parseInt(localStorage.getItem('tables') ?? '0');

  useEffect(()=>{
    const a = localStorage.getItem('tables');
    if (!a) {
      localStorage.setItem('tables', JSON.stringify(0));
    } else {
      console.log('no tables in localstorage')
    }
    const b = localStorage.getItem('bills');
    if (!b) {
      localStorage.setItem('bills', JSON.stringify(0));
    }
  }, [])


  return (
    <div>
      <NavBar />

      <div className="text-white m-2 grid gap-3 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">

        {!data ? Array(numTables).fill(<TableSkeleton />)
        : data.tables.map((table, index) => (
          <Table
            key={table.id}
            table={table}
          />
        ))}

        <div className="m-5 h-[268px] w-[350px] rounded-md bg-slate-400 flex items-center">
          <Link
            href={"/admin/tables/add"}
            className="mx-auto rounded-md bg-slate-500 p-3 hover:bg-slate-600">
            Add Table
          </Link>
        </div>
      </div>
    </div>
  );
}
