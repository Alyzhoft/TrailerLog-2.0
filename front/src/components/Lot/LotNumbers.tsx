type Props = {
	spot: number;
};

export default function LotNumbers({ spot }: Props) {
	return (
		<div>
			<div className="font-bold">{spot}</div>
		</div>
	);
}
