import { useState, useEffect } from 'react';
import Row from './Row';
import Col from './Col';

const screenHeight = {
	height: 'calc(100vh - 7rem)',
};

const rows = Array.from({ length: 52 }, (_, index) => index + 1);
const cols = Array.from({ length: 9 }, (_, index) => index + 1);

export default function Grid() {
	return (
		<div style={screenHeight} className="overflow-y-auto">
			<div className="hidden lg:flex lg:w-full">
				{rows.map(() => {
					return (
						<Row>
							{cols.map(() => {
								return <Col />;
							})}
						</Row>
					);
				})}
			</div>
		</div>
	);
}
