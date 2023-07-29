'use client';
// ---- IMPORTACIONES ---- //
import { useContext, useEffect } from 'react';
import AuthContext from '@/context/auth/AuthContext';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Dropzone from '@/components/Dropzone';
// ----------------------- //

// ---- PAGINA (INICIO) ---- //
export default function Home() {
	// ---- CONTEXTs ---- //
	const { usuarioAutenticado } = useContext(AuthContext);
	// ------------------ //

	// ---- EFECTOS ---- //
	useEffect(() => {
		usuarioAutenticado();
	}, []);

	// ----------------- //

	return (
		<Layout>
			{/* Inicio */}
			<div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
				{/* Contenedor del inicio */}
				<div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
					{/* Subir Archivos (DROPZONE) */}
					<Dropzone />
					{/* Contenido */}
					<div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
						{/* Titulo */}
						<h2 className="text-4xl font-bold text-gray-800 my-4">
							Compartir archivos de forma sencilla y privada
						</h2>
						{/* Parrafo de ayuda */}
						<p className="text-lg leading-loose">
							<span className="text-rose-500 font-bold">
								NodeSend
							</span>{' '}
							te permite compartir archivos con cifrado de extremo
							a extremo y un archivo que es eliminado despues de
							ser descargado. Asi que puedes mantener lo que
							compartes en privado y asegurate de que tus cosas no
							permanezcan en linea para siempre
						</p>
						{/* Crear cuenta */}
						<Link
							href="/crear-cuenta"
							className="text-rose-500 font-bold text-lg hover:text-rose-600 transition-colors duration-300"
						>
							Crea una cuenta para mayores beneficios
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
// ------------------------- //
