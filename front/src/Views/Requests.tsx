import { useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { RequestContext } from '../utils/context';
import Table, { TableRow, TableHeader, TableDataCell } from '../components/ui/Table';
import Button from '../components/ui/Button';
import { Request, RequestType } from '../types';

const screenHeight = {
	height: 'calc(100vh - 10.25rem)',
};

type Props = RouteComponentProps;

export default function Requests({ path }: Props) {
	const requests = useContext(RequestContext);

	return (
		<div style={screenHeight} className="min-w-full my-12 rounded-md overflow-y-auto">
			<Table
				header={
					<>
						<TableHeader label="Time Submitted" />
						<TableHeader label="Out" />
						<TableHeader label="In" />
						<TableHeader label="Dock" />
						<TableHeader label="Urgent" />
						<TableHeader label="Done" />
						<TableHeader label="" />
					</>
				}
			>
				{requests.map((r: Request) => {
					return (
						<TableRow>
							<TableDataCell>{r.createdAt}</TableDataCell>
							<TableDataCell>{r.requestType === RequestType.OUT ? r.outTrailerNumber : ''}</TableDataCell>
							<TableDataCell>{r.requestType === RequestType.IN ? r.inTrailerNumber : ''}</TableDataCell>
							<TableDataCell>{r.requestType === RequestType.OUT ? `${r.outSpotNumber}-${r.outTrailerLocation}` : `${r.inSpotNumber}-${r.inTrailerLocation}`}</TableDataCell>
							<TableDataCell>{r.urgent}</TableDataCell>
							<TableDataCell>
								<Button className="text-white bg-green-500 font-bold text-lg rounded-md w-16 h-8">Done</Button>
							</TableDataCell>
							<TableDataCell>
								<button>
									<svg className="w-6 h-6 text-red-600 hover:cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
									</svg>
								</button>
							</TableDataCell>
						</TableRow>
					);
				})}
			</Table>
		</div>
	);
}
