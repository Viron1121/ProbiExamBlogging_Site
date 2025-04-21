import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import '../../css/table.css';
import CreateModal from './Actions/CreateModal';
import EditModal from './Actions/EditModal';
import ShowModal from './Actions/ShowModal';

export default function Dashboard() {

    const [blogsData, setBlogsData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [editModalShow, setEditModalShow] = React.useState(false);
    const [viewModalShow, setViewModalShow] = React.useState(false); //Modal Show/Hide of View Customer
    const [rowValue, setRowValue] = useState({}); //Row Value of Edit Customer 


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/blogs").then((res) => {
            console.log(res.data);
            setBlogsData(res.data);
        });
      }, []);

      const ReFetch = () => {
        axios.get("http://127.0.0.1:8000/blogs").then((res) => {
            setBlogsData(res.data);
        });
      };


    const columns = React.useMemo(() => [
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'content',
            header: 'Content',
        },
        {
            accessorKey: 'id',
            header: 'ACTION',
            enableSorting: false,
            cell: (info) => (
                <div className='d-flex gap-2 justify-content-center'>
                  <button className='btn btn-sm bg-primary d-flex justify-content-center align-items-center'  
                    onClick={() => {
                      setViewModalShow(true);
                      setRowValue(info.row.original); //selected row value
                    }}
                  >
                  <span class="material-symbols-rounded text-white">
                    visibility
                  </span>
                  </button>

                  <button   
                    className='btn btn-sm bg-primary d-flex justify-content-center align-items-center'  
                    onClick={() => {
                        setEditModalShow(true);
                        setRowValue(info.row.original);
                    }}>
                    <span className="material-symbols-rounded text-white">edit_square</span>
                </button>
                                
                <button 
                    className='btn btn-sm bg-danger d-flex justify-content-center align-items-center'
                    onClick={() => handleDelete(info.row.original.id)}>
                    <span className="material-symbols-rounded text-white">delete</span>
                </button>
                </div>
            )
        }
    ], []);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data: blogsData || [],
        columns: columns || [],
        sortDescFirst: true,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            pagination,
            sorting,
        },
        sortingFns: {
            myCustomSortingFn: (rowA, rowB, columnId) => {

                return rowA.original[columnId] > rowB.original[columnId] ? 1 : rowA.original[columnId] < rowB.original[columnId] ? -1 : 0
            },
        },
    });

    //Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'No, Cancel',
            reverseButtons: true, //Reverse the buttons position
            customClass: {
                confirmButton: "btn fw-bold btn-danger border border-2 border-danger",
                cancelButton: "btn fw-bold border border-2 border-primary text-primary bg-transparent",
            },
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/blogs/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: 'Success!',
                            confirmButtonText: 'Okay, got it!',
                            icon: 'success',
                            iconColor: '#0066C8',
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                            allowOutsideClick: false
                        });
                        ReFetch(); // To refetch the data
                    })
                    .catch((error) => {
                        console.error("Error deleting blog:", error);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the brand.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!

                            <div className="table-container">
                                <h1 className="table-title">Blog List</h1>
                                    <button className='btn btn-primary float-end mt-2 mb-5' onClick={() => setModalShow(true)}>Add Blog</button>

                                    {/* Modal of Add Blogs */}
                                    <CreateModal
                                        blogsData={blogsData}
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        ReFetch={ReFetch} //Passing the Added function to CreateModal props
                                    />

                                    {/* Modal of Edit Customer */}
                                    <EditModal
                                        show={editModalShow}
                                        onHide={() => setEditModalShow(false)}
                                        ReFetch={ReFetch} //Passing the Added function to EditModal props
                                        rowValue={rowValue} //Passing the Row Value to EditModal props
                                    />

                                    {/* Modal of View Customer */}
                                    <ShowModal
                                        show={viewModalShow}
                                        onHide={() => setViewModalShow(false)}
                                        rowValue={rowValue} //Passing the Row Value to EditModal props
                                    />
                                <table className="styled-table">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="fw-bold fs-6 text-gray-800" style={{ backgroundColor: "#F5F8FA" }}>
                                    {headerGroup.headers.map(header => (
                                    <th className="text-center" key={header.id}>
                                        <div>
                                        {header.column.columnDef.header}
                                        {header.column.getCanSort() && (
                                            <span
                                            style={{ cursor: 'pointer' }}
                                            className="material-symbols-rounded cursor-pointer Sort-arrow"
                                            onClick={header.column.getToggleSortingHandler()}
                                            >
                                            {header.column.getIsSorted() === 'asc' ? 'expand_less' : 'expand_more'}
                                            </span>
                                        )}
                                        </div>
                                    </th>
                                    ))}
                                </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td colSpan={table.getVisibleFlatColumns().length} className="text-center ">
                                    No available data
                                    </td>
                                </tr>
                                ) : (
                                table.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="p-3 align-content-center fs-6 fw-semibold text-center">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    </tr>
                                ))
                                )}
                            </tbody>
                            </table>
                                <div className='m-10 mt-0'>
                                    <div className='separator my-2'></div>
                                    {/* <Pagination pagination={pagination} table={table} /> */}
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
