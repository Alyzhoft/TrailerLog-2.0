/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState, useEffect, Component, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import Table, { TableRow, TableHeader, TableDataCell } from '../components/ui/Table';
import Tabs from '../components/ui/Tabs';
import { getCarriers, getCategories } from '../utils/api';
import { SocketContext } from '../utils/socket';
import AddCarriersModal from '../components/Modals/AddCarriersModal';
import AddCategoriesModal from '../components/Modals/AddCategoriesModal';
import EditCategoryModal from '../components/Modals/EditCategoryModal';
import ColorPicker from '../components/ui/ColorPicker';
//import EditModal from '../components/Modals/EditModal';
//import { prisma } from '../utils/prisma';
// import ButtonOne from '../ButtonOne.js';
import Button from '../components/ui/Button';
import { CarrierContext, CategoryContext } from '../utils/context';
type Props = RouteComponentProps;
const screenHeight = {
	height: 'calc(100vh - 10.25rem)',
};
// export async function getCarriers() {
// 	try {
// 		const carriers = await prisma.carrier.findMany();

// 		return carriers;
// 	} catch (error) {
// 		return { error };
// 	}
// }

//

interface Data {
	carriers: any[];
	categories: any[];
}

export default function Admin({ path }: Props) {
	const [selected, setSelected] = useState('Carriers');
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [categoryClick, setCategoryClick] = useState(undefined);
	const [carrierOptions, setCarrierOptions] = useState<string[]>([]);
	const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);
	const [data, setData] = useState<Data>({ carriers: [], categories: [] });

	const socket = useContext(SocketContext);
	const carriers = useContext(CarrierContext);
	const categories = useContext(CategoryContext);

	useEffect(() => {
		setSelected('Carriers');
	}, []);

	useEffect(() => {
		// setCarrierOptions(carriers);
		// setCategoriesOptions(categories);

		setData((oldState: any) => ({ ...oldState, carriers, categories }));
	}, [carriers, categories, selected]);

	console.log({ data: data.carriers, selected });

	return (
		<div style={screenHeight} className="min-w-full rounded-md overflow-hidden flex flex-col">
			{addOpen && selected === 'Carriers' ? (
				<AddCarriersModal open={addOpen} close={() => setAddOpen(false)} />
			) : (
				<div></div>
			)}
			{addOpen && selected === 'Categories' ? (
				<AddCategoriesModal open={addOpen} close={() => setAddOpen(false)} />
			) : (
				<div></div>
			)}
			{editOpen && selected === 'Categories' ? (
				<EditCategoryModal
					open={editOpen}
					close={() => setEditOpen(false)}
					categoryprop={categoryClick}
				/>
			) : (
				<div></div>
			)}
			<div className="flex justify-end mb-5">
				<button onClick={() => setAddOpen(true)} className=" shadow-lg mr-5 border-2 border-black">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
					</svg>
				</button>
			</div>
			<Tabs selected={(selected) => setSelected(selected)}></Tabs>
			<div className="overflow-y-auto flex-grow ">
				{selected === 'Carriers' ? (
					<div>
						<Table
							header={
								<>
									<TableHeader label="Carrier" />
									<TableHeader label="" />
								</>
							}
						>
							{data.carriers !== undefined ? (
								data.carriers.map((r: any) => {
									return (
										<TableRow>
											<TableDataCell>{r.carrierName}</TableDataCell>

											<TableDataCell>
												<button
													onClick={() => {
														socket.emit('deleteCarrier', r.id);
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</TableDataCell>
										</TableRow>
									);
								})
							) : (
								<div></div>
							)}
						</Table>
					</div>
				) : (
					<div></div>
				)}
				{selected === 'Categories' ? (
					<div>
						<Table
							header={
								<>
									<TableHeader label="Category" />
									<TableHeader label="Color" />
									<TableHeader label="Edit" />
									<TableHeader label="" />
								</>
							}
						>
							{categories !== undefined ? (
								categories.map((r: any) => {
									return (
										<TableRow>
											<TableDataCell>{r.categoryName}</TableDataCell>
											<TableDataCell>{r.color}</TableDataCell>
											<button
												className="mt-5"
												onClick={() => {
													setCategoryClick(r);
													setEditOpen(true);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
													<path
														fillRule="evenodd"
														d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
														clipRule="evenodd"
													/>
												</svg>
											</button>
											<TableDataCell>
												<button
													onClick={() => {
														socket.emit('deleteCategory', r.id);
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</TableDataCell>
										</TableRow>
									);
								})
							) : (
								<div></div>
							)}
						</Table>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}
