/* This example requires Tailwind CSS v2.0+ */

export default function Container({ children }: { children: React.ReactNode }) {
	return <div className="max-w-full sm:px-6 lg:px-8">{children}</div>;
}
