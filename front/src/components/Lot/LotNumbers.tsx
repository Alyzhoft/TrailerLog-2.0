type Props = {
	spot: number;
};

export default function LotNumbers({ spot }: Props) {
	return (
		<div>
			<div className="ml-3 font-bold">{spot}</div>
		</div>
	);
}
