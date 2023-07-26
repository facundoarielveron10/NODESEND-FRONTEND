// ---- IMPORTACIONES ---- //
import Header from './Header';
// ----------------------- //

// ---- METADATA ---- //
export const metadata = {
	title: '',
};
// ------------------ //

// ---- COMPONENTE (LAYOUT) ---- //
export default function Layout({ children, title }) {
	metadata.title = `${title} | NodeSend`;

	return (
		<>
			{/* Contenedor */}
			<div className="bg-gray-100 min-h-screen">
				{/* Header */}
				<Header />
				{/* Contenido de las paginas */}
				<div className="container mx-auto">{children}</div>
			</div>
		</>
	);
}
// ----------------------------- //
