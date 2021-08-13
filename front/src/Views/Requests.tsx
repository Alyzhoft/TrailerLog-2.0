import { useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { RequestContext } from '../utils/context';
import Table, { TableRow, TableHeader, TableDataCell } from '../components/ui/Table';
import Button from '../components/ui/Button';
import { Request, RequestType, trailer } from '../types';
import { SocketContext } from '../utils/socket';
import OutLocationModal from '../components/Modals/OutLocationModal';
import CompleteInModal from '../components/Modals/CompleteInModal';

const screenHeight = {
	height: 'calc(100vh - 14.25rem)',
};

type Props = RouteComponentProps & {
	trailers: trailer[];
};

export default function Requests({ path, trailers }: Props) {
	const [selectedRequest, setSelectedRequest] = useState<any>();
	const [outModal, setOutModal] = useState(false);
	const [completeIn, setCompleteIn] = useState(false);
	const requests = useContext(RequestContext);
	const socket = useContext(SocketContext);

	function handleDone(request: Request) {
		if (request.requestType === 'OUT') {
			setSelectedRequest(request);
			setOutModal(true);
		} else {
			if (request.trailerId === null) {
				setSelectedRequest(request);
				setCompleteIn(true);
			} else {
				socket.emit('complete', request);
			}
		}
	}

	console.log(requests);

	return (
		<>
			{outModal ? (
				<OutLocationModal
					open={outModal}
					close={() => setOutModal(false)}
					request={selectedRequest}
				/>
			) : null}
			{completeIn ? (
				<CompleteInModal
					open={completeIn}
					close={() => setCompleteIn(false)}
					request={selectedRequest}
					trailers={trailers}
				/>
			) : null}
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
							<TableRow key={r.id}>
								<TableDataCell>{r.createdAt}</TableDataCell>
								<TableDataCell>
									{r.requestType === RequestType.OUT ? `${r.outCarrier}-${r.outTrailerNumber}` : ''}
								</TableDataCell>
								<TableDataCell>
									{r.requestType === RequestType.IN
										? r.trailerId !== null
											? `${r.inCarrier}-${r.inTrailerNumber}-${r.trailer.trailerLocation}-${r.trailer.spotNumber}`
											: `${r.inCarrier}`
										: ''}
								</TableDataCell>
								<TableDataCell>
									{r.requestType === RequestType.OUT
										? `${r.outSpotNumber}-${r.outTrailerLocation}`
										: `${r.inSpotNumber}-${r.inTrailerLocation}`}
								</TableDataCell>
								<TableDataCell>{r.urgent ? '✔' : null}</TableDataCell>
								<TableDataCell>
									<Button
										onClick={() => handleDone(r)}
										className="text-white bg-green-500 font-bold text-lg rounded-md w-16 h-8"
									>
										Done
									</Button>
								</TableDataCell>
								<TableDataCell>
									<button
										onClick={() => {
											socket.emit('deleteRequest', r.id);
										}}
									>
										<svg
											className="w-6 h-6 text-red-600 hover:cursor-pointer"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											></path>
										</svg>
									</button>
								</TableDataCell>
							</TableRow>
						);
					})}
				</Table>
			</div>
		</>
	);
}
