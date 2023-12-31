// ---- IMPORTACIONES ---- //
import Header from './Header';
// ----------------------- //

// ---- COMPONENTE (LAYOUT) ---- //
export default function Layout({ children }) {
	return (
		<>
			{/* Layout*/}
			<div className="bg-gray-100 min-h-screen">
				{/* Contendor del Header y el Contenido */}
				<div className="container mx-auto p-1 cel:p-0">
					{/* Header */}
					<Header />
					{/* Contenido de las paginas */}
					<main className="mt-10">{children}</main>
				</div>
			</div>
		</>
	);
}
// ----------------------------- //
