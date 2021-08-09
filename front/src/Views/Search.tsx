import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import axios from 'axios';
import { CarrierContext, CategoryContext } from '../utils/context';
import { trailer } from '../types';
import Table, { TableRow, TableHeader, TableDataCell } from '../components/ui/Table';
import Input from '../components/ui/Input';
import InputWithButton from '../components/ui/InputWithButton';
import ComboBox from '../components/ui/ComboBox';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import { alphabetically } from '../utils/sort';
import { SearchIcon } from '@heroicons/react/solid';

type Props = RouteComponentProps;

const screenHeight = {
	height: 'calc(100vh - 5.75rem)',
};

async function getAll() {
	try {
		const res = await axios.get(`http://localhost:4000/api/search?page=1&limit=25`);
		return res.data;
	} catch (e) {
		alert(e);
	}
}

const sortBy = ['Created At', 'Trailer Number', 'Trailer Location', 'Spot', 'Carrier', 'Category'];
const limitNumber = [5, 10, 15, 25];

async function search(
	page: number,
	limit: number,
	trailerNumber: string,
	carrier: string | undefined,
	category: string | undefined,
	departed: boolean,
) {
	try {
		let query = new URLSearchParams();

		query.append('page', page.toString());
		query.append('limit', limit.toString());
		query.append('departed', departed.toString());

		if (trailerNumber !== '') {
			query.append('trailerNumber', trailerNumber);
		}

		if (carrier !== undefined) {
			query.append('carrier', carrier);
		}

		if (category !== undefined) {
			query.append('category', category);
		}

		var url = 'http://localhost:4000/api/search?' + query.toString();

		const res = await axios.get(url);
		return res.data;
	} catch (error) {
		alert(error);
	}
}

export default function Search({ path }: Props) {
	const [data, setData] = useState<trailer[]>([]);
	const [page, setPage] = useState(1);
	const [carrierOptions, setCarrierOptions] = useState<string[]>([]);
	const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);
	const [trailerNumber, setTrailerNumber] = useState('');
	const [category, setCategory] = useState<string | undefined>();
	const [carrier, setCarrier] = useState<string | undefined>();
	const [departed, setDeparted] = useState(false);
	const [sort, setSort] = useState(sortBy[0]);
	const [limit, setLimit] = useState(limitNumber[0]);

	const carriers = useContext(CarrierContext);
	const categories = useContext(CategoryContext);

	useEffect(() => {
		const temp = carriers.map((carrier: any) => {
			return carrier.carrierName;
		});
		setCarrierOptions(temp.sort(alphabetically(true)));
	}, [carriers]);

	useEffect(() => {
		const temp = categories.map((category: any) => {
			return category.categoryName;
		});

		setCategoriesOptions(temp.sort());
	}, [categories]);

	useEffect(() => {
		const fetchData = async () => {
			const results = await getAll();
			setData(results);
		};

		fetchData();
	}, []);

	useEffect(() => {
		handleSubmit();
	}, [page, limit]);

	const handleSubmit = async () => {
		const res = await search(page, limit, trailerNumber, carrier, category, departed);

		console.log(res);

		setData(res);
	};

	const handleClear = async () => {
		const results = await getAll();
		setData(results);
	};

	return (
		<div style={screenHeight} className="h-screen">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
					console.log({ carrier, category, trailerNumber, departed });
				}}
			>
				<div className="flex">
					<div className="mt-1 w-1/5">
						<InputWithButton
							labelText="Search"
							value={trailerNumber}
							onChange={(e) => setTrailerNumber(e.target.value)}
						/>
					</div>
					<div className="mx-1 mt-2">
						<ComboBox
							labelName={'Category'}
							options={categoriesOptions}
							defaultValue={'Category'}
							value={category}
							valueChange={(value) => {
								setCategory(value);
							}}
						/>
					</div>
					<div className="mx-1 mt-2">
						<ComboBox
							labelName={'Carrier'}
							options={carrierOptions}
							defaultValue={'Carrier'}
							value={carrier}
							valueChange={(value) => {
								setCarrier(value);
							}}
						/>
					</div>
					<div className="ml-2 mt-10">
						<Toggle enabled={departed} setEnabled={() => setDeparted(!departed)} label="Departed" />
					</div>
					<div className="ml-2 mt-7">
						<Button
							variant="danger"
							onClick={() => {
								const carrierDropDown = document.getElementById('Carrier') as HTMLSelectElement;
								const categoryDropDown = document.getElementById('Category') as HTMLSelectElement;

								if (carrierDropDown) {
									carrierDropDown.selectedIndex = 0;
								}

								if (categoryDropDown) {
									categoryDropDown.selectedIndex = 0;
								}

								setCarrier(undefined);
								setCategory(undefined);
								setTrailerNumber('');
								setDeparted(false);

								handleClear();
							}}
						>
							Clear
						</Button>
					</div>
				</div>
			</form>
			<div className="flex justify-end">
				<span className="mt-1 text-lg">Limit:</span>
				<div className="w-1/8 mx-2">
					<ComboBox
						options={limitNumber}
						value={limit}
						valueChange={(value) => {
							setLimit(value);
						}}
					/>
				</div>
				{/* <span className="mt-1 text-lg">Sort By:</span>
				<div className="w-1/8 ml-2">
					<ComboBox
						options={sortBy}
						value={sort}
						valueChange={(value) => {
							setSort(value);
						}}
					/>
				</div> */}
			</div>
			<div className="overflow-y-auto h-4/5 mt-5 rounded-md">
				<Table
					header={
						<>
							<TableHeader label="Created At" />
							<TableHeader label="Trailer Number" />
							<TableHeader label="Trailer Location" />
							<TableHeader label="Spot" />
							<TableHeader label="Carrier" />
							<TableHeader label="Category" />
							<TableHeader label="Comments" />
						</>
					}
				>
					{data.map((trailer) => {
						return (
							<TableRow>
								<TableDataCell>{trailer.createdAt}</TableDataCell>
								<TableDataCell>{trailer.trailerNumber}</TableDataCell>
								<TableDataCell>{trailer.trailerLocation}</TableDataCell>
								<TableDataCell>{trailer.spotNumber}</TableDataCell>
								<TableDataCell>{trailer.carrier}</TableDataCell>
								<TableDataCell>{trailer.category}</TableDataCell>
								<TableDataCell>{trailer.comments}</TableDataCell>
							</TableRow>
						);
					})}
				</Table>
			</div>
			<div className="flex justify-center w-full">
				<div className="w-1/6 flex justify-between">
					{page > 1 ? (
						<Button
							onClick={() => {
								setPage(page - 1);
							}}
						>
							Prev Page
						</Button>
					) : null}
					<Button
						onClick={() => {
							setPage(page + 1);
						}}
					>
						Next Page
					</Button>
				</div>
			</div>
		</div>
	);
}
