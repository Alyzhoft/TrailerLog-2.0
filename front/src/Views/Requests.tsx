import { RouteComponentProps } from '@reach/router';
import Table, { TableRow, TableHeader, TableDataCell } from '../components/ui/Table';

const requests = Array.from({ length: 30 }, (_, index) => index + 1);

const screenHeight = {
	height: 'calc(100vh - 10.25rem)',
};

type Props = RouteComponentProps;

export default function Requests({ path }: Props) {
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
				{requests.map((r) => {
					return (
						<TableRow>
							<TableDataCell>Test</TableDataCell>
							<TableDataCell>Test</TableDataCell>
							<TableDataCell>Test</TableDataCell>
							<TableDataCell>Test</TableDataCell>
							<TableDataCell>Test</TableDataCell>
							<TableDataCell>
								<button className="bg-green-500 rounded-md border-black border-2 w-16 h-8">Test</button>
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
