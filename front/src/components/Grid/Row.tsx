export default function Row({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-8 h-full border-2 border-black">
			<div className="w-8">{children}</div>
		</div>
	);
}
