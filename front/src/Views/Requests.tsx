import Table, { TableRow, TableHeader, TableDataCell } from '../components/ui/Table';

const requests = Array.from({ length: 30 }, (_, index) => index + 1);

const screenHeight = {
	height: 'calc(100vh - 10.25rem)',
};

export default function Requests() {
	return (
		<div style={screenHeight} className="m-12 rounded-md overflow-y-auto">
			<Table
				header={
					<>
						<TableHeader label="Name" />
						<TableHeader label="Username" />
						<TableHeader label="Permission" />
						<TableHeader label="Added" />
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
						</TableRow>
					);
				})}
			</Table>
		</div>
	);
}
