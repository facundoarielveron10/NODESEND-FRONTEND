// ---- IMPORTACIONES ---- //
import Link from 'next/link';
import Image from 'next/image';
// ----------------------- //

// ---- COMPONENTE (HEADER) ---- //
export default function Header() {
	return (
		<header className="py-8 px-4 flex flex-col md:flex-row items-center justify-between">
			{/* Logotipo */}
			<Link href="/">
				<Image
					className="w-64 mb-8 md:mb-0"
					src="/img/logo.svg"
					alt="NodeSend Logotipo"
					width={200}
					height={200}
					priority={true}
				/>
			</Link>
			{/* Enlaces */}
			<div className="flex flex-col cel:flex-row gap-4">
				<Link
					className="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 px-4 py-2 text-white rounded-lg uppercase font-black"
					href="/login"
				>
					Iniciar Sesion
				</Link>
				<Link
					className="bg-black hover:bg-gray-800 transition-colors duration-300 px-4 py-2 text-white rounded-lg uppercase font-black"
					href="/crear-cuenta"
				>
					Crear Cuenta
				</Link>
			</div>
		</header>
	);
}
// ----------------------------- //
